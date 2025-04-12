"use client";
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
  