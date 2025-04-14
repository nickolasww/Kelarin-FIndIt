"use client";

interface UserData {
  name?: string;
  user?: {
    name?: string;
  };
  token?: string;
}

export function storeUserSession(data: UserData) {
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

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("IsLoggedIn") === "true" && !!getAuthToken();
}

export function getAuthHeaders(): HeadersInit {
  const token = getAuthToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

export async function authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const headers = getAuthHeaders();

  const mergedHeaders = {
    ...headers,
    ...options.headers,
  };

  return fetch(url, {
    ...options,
    headers: mergedHeaders,
  });
}

interface Workspace {
  id: number;
  [key: string]: any; // Allow other properties
}

export function updateLocalWorkspace(workspace: Workspace) {
  if (typeof window === "undefined") return;

  const savedWorkspaces = localStorage.getItem("workspaces");
  let workspaces: Workspace[] = [];

  if (savedWorkspaces) {
    try {
      workspaces = JSON.parse(savedWorkspaces);
      const existingIndex = workspaces.findIndex((w: Workspace) => w.id === workspace.id);
      if (existingIndex >= 0) {
        workspaces[existingIndex] = workspace;
      } else {
        workspaces.push(workspace);
      }
    } catch (error) {
      console.error("Error parsing workspaces from localStorage:", error);
      workspaces = [workspace];
    }
  } else {
    workspaces = [workspace];
  }

  localStorage.setItem("workspaces", JSON.stringify(workspaces));
}