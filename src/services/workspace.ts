// services/workspace.ts
// This file contains workspace-related API calls

export interface Workspace {
  id: number
  name: string
  title: string
  purpose: string
  description: string
  collaborator?: string
  workspace_picture?: string | null
  workspace_banner?: string | null
}

interface CreateWorkspaceData {
  title: string
  purpose: string | null
  description: string
  collaborator?: string
  workspace_picture?: File | null
  workspace_banner?: File | null
}

/**
 * Create a new workspace
 */
export async function createWorkspace(data: CreateWorkspaceData): Promise<Workspace> {
  // Check if we have a token in localStorage
  const token = localStorage.getItem("token")

  if (!token) {
    throw new Error("Authentication required")
  }

  try {
    // Create FormData to handle file uploads if needed
    const formData = new FormData()
    formData.append("title", data.title)
    formData.append("purpose", data.purpose || "")
    formData.append("description", data.description)

    if (data.collaborator && data.collaborator.trim()) {
      formData.append("collaborator", data.collaborator)
    }

    if (data.workspace_picture) {
      formData.append("workspace_picture", data.workspace_picture)
    }

    if (data.workspace_banner) {
      formData.append("workspace_banner", data.workspace_banner)
    }

    console.log("Sending workspace data to API:", {
      title: data.title,
      purpose: data.purpose,
      description: data.description,
      collaborator: data.collaborator,
    })

    // First, try to make the request with FormData
    const response = await fetch("https://kelarin.bccdev.id/api/workspace", {
      method: "POST",
      headers: {
        // Don't set Content-Type when using FormData, the browser will set it with the boundary
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    // Check if the response is JSON
    const contentType = response.headers.get("content-type")
    console.log("API response content type:", contentType)

    if (contentType && contentType.includes("application/json")) {
      const responseData = await response.json()
      console.log("Raw API response data:", responseData)

      if (!response.ok) {
        throw new Error(responseData.message || `Error: ${response.status} ${response.statusText}`)
      }

      // Ensure the workspace has a name property
      if (!responseData.name && responseData.title) {
        responseData.name = responseData.title
      }

      console.log("Created workspace:", responseData)
      return responseData
    } else {
      // If not JSON, get the text response for better error information
      const textResponse = await response.text()
      console.error("Non-JSON response:", textResponse)

      throw new Error(`Server returned non-JSON response: ${response.status} ${response.statusText}`)
    }
  } catch (error) {
    console.error("Error creating workspace:", error)

    // If we're in development mode, return a mock response for testing
    if (process.env.NODE_ENV === "development") {
      console.warn("Returning mock workspace data for development")
      return createMockWorkspace(data)
    }

    throw error
  }
}

/**
 * Create a mock workspace for development/testing
 */
function createMockWorkspace(data: CreateWorkspaceData): Workspace {
  return {
    id: Math.floor(Math.random() * 10000),
    name: data.title, // Ensure name is set to title
    title: data.title,
    purpose: data.purpose || "",
    description: data.description,
    collaborator: data.collaborator,
    workspace_picture: null,
    workspace_banner: null,
  }
}

/**
 * Get all workspaces
 */
export async function getWorkspaces(): Promise<Workspace[]> {
  const token = localStorage.getItem("token")

  if (!token) {
    throw new Error("Authentication required")
  }

  try {
    console.log("Fetching workspaces from API...")

    // Updated to use the correct API endpoint
    const response = await fetch("https://kelarin.bccdev.id/api/workspace/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    // Check if the response is JSON
    const contentType = response.headers.get("content-type")
    console.log("API response content type:", contentType)

    if (contentType && contentType.includes("application/json")) {
      const rawData = await response.json()
      console.log("Raw API response data:", rawData)

      if (!response.ok) {
        throw new Error(rawData.message || `Error: ${response.status} ${response.statusText}`)
      }

      // Extract the actual array of workspaces from the response
      // API returns { workspaces: [...] } format
      let workspacesArray = []

      if (rawData && typeof rawData === "object") {
        // Check if response has a workspaces property that is an array
        if (rawData.workspaces && Array.isArray(rawData.workspaces)) {
          workspacesArray = rawData.workspaces
        }
        // Check if response itself is an array
        else if (Array.isArray(rawData)) {
          workspacesArray = rawData
        }
        // Check if response has a data property that is an array
        else if (rawData.data && Array.isArray(rawData.data)) {
          workspacesArray = rawData.data
        }
      }

      console.log("Extracted workspaces array:", workspacesArray)

      // Process each workspace to ensure it has all required fields
      const processedData = workspacesArray.map((workspace :any ) => {
        // Create a properly formatted workspace object
        const formattedWorkspace: Workspace = {
          id: workspace.id || Math.floor(Math.random() * 10000),
          name: workspace.title || workspace.name || "Unnamed Workspace",
          title: workspace.title || workspace.name || "Unnamed Workspace",
          purpose: workspace.purpose || "",
          description: workspace.description || "",
          collaborator: workspace.collaborator || undefined,
          workspace_picture: workspace.workspace_picture || null,
          workspace_banner: workspace.workspace_banner || null,
        }
        return formattedWorkspace
      })

      console.log("Processed workspaces:", processedData)
      return processedData
    } else {
      // If not JSON, get the text response for better error information
      const textResponse = await response.text()
      console.error("Non-JSON response:", textResponse)
      throw new Error(`Server returned non-JSON response: ${response.status} ${response.statusText}`)
    }
  } catch (error) {
    console.error("Error fetching workspaces:", error)

    // If we're in development mode, return mock data for testing
    if (process.env.NODE_ENV === "development") {
      console.warn("Returning mock workspace data for development")
      return []
    }

    throw error
  }
}

/**
 * Invite a user to a workspace
 * @param workspaceId The ID of the workspace to invite to
 * @param email The email of the user to invite
 * @param role The role to assign to the invited user (default: "editor")
 */
export async function inviteToWorkspace(workspaceId: number, email: string, role = "editor"): Promise<any> {
  const token = localStorage.getItem("token")

  if (!token) {
    throw new Error("Authentication required")
  }

  try {
    console.log(`Inviting ${email} to workspace ${workspaceId} with role ${role}`)

    // Create FormData for the request
    const formData = new FormData()
    formData.append("email", email)
    formData.append("role", role)

    const response = await fetch(`https://kelarin.bccdev.id/api/workspace/${workspaceId}/share`, {
      method: "POST",
      headers: {
        // Don't set Content-Type when using FormData, the browser will set it with the boundary
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    // Check if the response is JSON
    const contentType = response.headers.get("content-type")
    console.log("API response content type:", contentType)

    if (contentType && contentType.includes("application/json")) {
      const responseData = await response.json()
      console.log("Invite response:", responseData)

      if (!response.ok) {
        throw new Error(responseData.message || `Error: ${response.status} ${response.statusText}`)
      }

      return responseData
    } else {
      // If not JSON, get the text response for better error information
      const textResponse = await response.text()
      console.error("Non-JSON response:", textResponse)

      throw new Error(`Server returned non-JSON response: ${response.status} ${response.statusText}`)
    }
  } catch (error) {
    console.error("Error inviting to workspace:", error)
    throw error
  }
}

/**
 * Delete a workspace
 * @param workspaceId The ID of the workspace to delete
 */
export async function deleteWorkspace(workspaceId: number): Promise<any> {
  const token = localStorage.getItem("token")

  if (!token) {
    throw new Error("Authentication required")
  }

  try {
    console.log(`Deleting workspace ${workspaceId}`)

    const response = await fetch(`https://kelarin.bccdev.id/api/workspace/${workspaceId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    // Check if the response is JSON
    const contentType = response.headers.get("content-type")
    console.log("API response content type:", contentType)

    if (contentType && contentType.includes("application/json")) {
      const responseData = await response.json()
      console.log("Delete response:", responseData)

      if (!response.ok) {
        throw new Error(responseData.message || `Error: ${response.status} ${response.statusText}`)
      }

      return responseData
    } else {
      // If not JSON, get the text response for better error information
      const textResponse = await response.text()
      console.error("Non-JSON response:", textResponse)

      throw new Error(`Server returned non-JSON response: ${response.status} ${response.statusText}`)
    }
  } catch (error) {
    console.error("Error deleting workspace:", error)
    throw error
  }
}
