interface LoginResponse {
  token: string;
  name: string;
  user?: {
    name: string;
  };
  message?: string;
}

interface RegisterResponse {
  message: string;
  // Add other properties based on your API response
}

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch("https://kelarin.bccdev.id/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data: LoginResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}

export async function registerUser(fullName: string, email: string, password: string): Promise<RegisterResponse> {
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
  });

  const data: RegisterResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
}

export function storeUserSession(data: LoginResponse) {
  localStorage.setItem("IsLoggedIn", "true");
  localStorage.setItem("name", data.name || data.user?.name || "User");

  if (data.token) {
    localStorage.setItem("token", data.token);
  }
}

export function clearUserSession() {
  localStorage.removeItem("IsLoggedIn");
  localStorage.removeItem("name");
  localStorage.removeItem("token");
}

export const getAuthToken = async (): Promise<string | null> => {
  return localStorage.getItem("token");
};

export const authenticatedFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const token = await getAuthToken();

  const headers: HeadersInit = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };

  const updatedOptions: RequestInit = {
    ...options,
    headers,
  };

  return fetch(url, updatedOptions);
};