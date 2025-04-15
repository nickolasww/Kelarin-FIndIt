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
}

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  try {
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

    if (!response.ok) {
      const data: LoginResponse = await response.json();
      throw new Error(data.message || "Login failed");
    }

    const data: LoginResponse = await response.json();
    return data;
  } catch (err) {
    // Log the error for debugging purposes
    console.error("Login failed:", err);
    throw new Error("An error occurred during login. Please try again.");
  }
}

export async function registerUser(fullName: string, email: string, password: string): Promise<RegisterResponse> {
  try {
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

    if (!response.ok) {
      const data: RegisterResponse = await response.json();
      throw new Error(data.message || "Registration failed");
    }

    const data: RegisterResponse = await response.json();
    return data;
  } catch (err) {
    // Log the error for debugging purposes
    console.error("Registration failed:", err);
    throw new Error("An error occurred during registration. Please try again.");
  }
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
