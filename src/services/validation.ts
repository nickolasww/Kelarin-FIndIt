"use client"

/**
 * Store user session data in localStorage
 * @param data User data from login/register response
 */
export function storeUserSession(data: any) {
  localStorage.setItem("IsLoggedIn", "true")
  localStorage.setItem("name", data.name || data.user?.name || "User")

  if (data.token) {
    localStorage.setItem("token", data.token)
  }
}

/**
 * Clear user session data from localStorage
 */
export function clearUserSession() {
  localStorage.removeItem("IsLoggedIn")
  localStorage.removeItem("name")
  localStorage.removeItem("token")
}

/**
 * Get the authentication token from storage
 * @returns The authentication token or null if not found
 */
export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("token")
}

/**
 * Check if the user is authenticated
 * @returns Boolean indicating if the user is authenticated
 */
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("IsLoggedIn") === "true" && !!getAuthToken()
}

/**
 * Get authentication headers for API requests
 * @returns Headers object with Authorization header if authenticated
 */
export function getAuthHeaders(): HeadersInit {
  const token = getAuthToken()

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  return headers
}

/**
 * Make an authenticated API request
 * @param url The API endpoint URL
 * @param options Request options
 * @returns The fetch response
 */
export async function authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
  // Use the existing getAuthHeaders function to get headers with authentication
  const headers = getAuthHeaders()

  // Merge the provided options.headers with our authentication headers
  const mergedHeaders = {
    ...headers,
    ...options.headers,
  }

  // Return the fetch with merged headers
  return fetch(url, {
    ...options,
    headers: mergedHeaders,
  })
}

/**
 * Helper function to update workspace data in localStorage
 * @param workspace The workspace to update or add
 */
export function updateLocalWorkspace(workspace: any) {
  if (typeof window === "undefined") return

  const savedWorkspaces = localStorage.getItem("workspaces")
  let workspaces = []

  if (savedWorkspaces) {
    try {
      workspaces = JSON.parse(savedWorkspaces)
      // Check if workspace already exists in the array
      const existingIndex = workspaces.findIndex((w: any) => w.id === workspace.id)
      if (existingIndex >= 0) {
        workspaces[existingIndex] = workspace
      } else {
        workspaces.push(workspace)
      }
    } catch (error) {
      console.error("Error parsing workspaces from localStorage:", error)
      workspaces = [workspace]
    }
  } else {
    workspaces = [workspace]
  }

  localStorage.setItem("workspaces", JSON.stringify(workspaces))
}