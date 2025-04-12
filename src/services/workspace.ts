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
  const token = localStorage.getItem("token")

  if (!token) {
    throw new Error("Authentication required")
  }

  try {
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

    const response = await fetch("https://kelarin.bccdev.id/api/workspace", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    const contentType = response.headers.get("content-type")
    console.log("API response content type:", contentType)

    if (contentType && contentType.includes("application/json")) {
      const responseData = await response.json()
      console.log("Raw API response data:", responseData)

      if (!response.ok) {
        throw new Error(responseData.message || `Error: ${response.status} ${response.statusText}`)
      }
      if (!responseData.name && responseData.title) {
        responseData.name = responseData.title
      }

      console.log("Created workspace:", responseData)
      return responseData
    } else {
      const textResponse = await response.text()
      console.error("Non-JSON response:", textResponse)

      throw new Error(`Server returned non-JSON response: ${response.status} ${response.statusText}`)
    }
  } catch (error) {
    console.error("Error creating workspace:", error)


    throw error
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

    const response = await fetch("https://kelarin.bccdev.id/api/workspace/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const contentType = response.headers.get("content-type")
    console.log("API response content type:", contentType)

    if (contentType && contentType.includes("application/json")) {
      const rawData = await response.json()
      console.log("Raw API response data:", rawData)

      if (!response.ok) {
        throw new Error(rawData.message || `Error: ${response.status} ${response.statusText}`)
      }
      let workspacesArray = []

      if (rawData && typeof rawData === "object") {
        if (rawData.workspaces && Array.isArray(rawData.workspaces)) {
          workspacesArray = rawData.workspaces
        }else if (Array.isArray(rawData)) {
          workspacesArray = rawData
        }else if (rawData.data && Array.isArray(rawData.data)) {
          workspacesArray = rawData.data
        }
      }

      console.log("Extracted workspaces array:", workspacesArray)

      const processedData = workspacesArray.map((workspace : any) => {
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
      const textResponse = await response.text()
      console.error("Non-JSON response:", textResponse)
      throw new Error(`Server returned non-JSON response: ${response.status} ${response.statusText}`)
    }
  } catch (error) {
    console.error("Error fetching workspaces:", error)

    if (process.env.NODE_ENV === "development") {
      console.warn("Returning mock workspace data for development")
      return []
    }

    throw error
  }
}
