export async function loginUser(email: string, password: string) {
    const response = await fetch("https://kelarin.bccdev.id/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
  
    const data = await response.json()
  
    if (!response.ok) {
      throw new Error(data.message || "Login failed")
    }
  
    return data
  }
  

  export async function registerUser(fullName: string, email: string, password: string) {
    const response = await fetch("https://kelarin.bccdev.id/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        email,
        password,
      }),
    })
  
    const data = await response.json()
  
    if (!response.ok) {
      throw new Error(data.message || "Registration failed")
    }
  
    return data
  }
  
  export function storeUserSession(data: any) {
    localStorage.setItem("IsLoggedIn", "true")
    localStorage.setItem("name", data.name || data.user?.name || "User")
  
    if (data.token) {
      localStorage.setItem("token", data.token)
    }
  }
  
  export function clearUserSession() {
    localStorage.removeItem("IsLoggedIn")
    localStorage.removeItem("name")
    localStorage.removeItem("token")
  }
  
  export const getAuthToken = async () => {
    return  localStorage.getItem("token")
  }
  
  export const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
    const token = await getAuthToken()
  
    const headers = {
      ...options.headers,
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json", // Assuming JSON content type
    }
  
    const updatedOptions: RequestInit = {
      ...options,
      headers,
    }
  
    return fetch(url, updatedOptions)
  }
  