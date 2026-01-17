import { tokenStorage } from "@/shared/lib/tokenStorage";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type ApiFetchOptions = RequestInit & {
  skipAuth?: boolean;
};

let refreshPromise: Promise<void> | null = null;


async function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const res = await fetch(
        `${API_URL}/api/v1/auth/login/refresh/token/`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Refresh failed");
      }

      const data = await res.json();
      tokenStorage.set(data.access);
    })()
      .catch((err) => {
        tokenStorage.clear();
        throw err;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}


export async function logout() {
  try {
    await fetch(`${API_URL}/api/v1/auth/logout/`, {
      method: "POST",
      credentials: "include",
    });
  } finally {
    tokenStorage.clear();
  }
}


export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const { skipAuth, ...fetchOptions } = options;
  const token = tokenStorage.get();

  const res = await fetch(`${API_URL}${path}`, {
    ...fetchOptions,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(!skipAuth && token
        ? { Authorization: `Bearer ${token}` }
        : {}),
      ...fetchOptions.headers,
    },
  });

  if (res.ok) {
    return res.json();
  }

  if (res.status === 401 && !skipAuth) {
    try {
      await refreshAccessToken();
    } catch {
      await logout();
      throw new Error("Не авторизован");
    }

    const newToken = tokenStorage.get();
    if (!newToken) {
      throw new Error("Не авторизован");
    }

    const retryRes = await fetch(`${API_URL}${path}`, {
      ...fetchOptions,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${newToken}`,
        ...fetchOptions.headers,
      },
    });

    if (!retryRes.ok) {
      throw await retryRes.json();
    }

    return retryRes.json();
  }

  throw await res.json();
}
