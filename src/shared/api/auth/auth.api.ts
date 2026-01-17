
import { apiFetch } from "@/shared/api/client";

export const getToken = (data: { phone_number: string; code: string }) =>
  apiFetch("/api/v1/auth/messenger/login/get/token/", {
    method: "POST",
    skipAuth: true,
    body: JSON.stringify(data),
  });

export const sendLoginCode = (data: { phone_number: string; code_len: number }) =>
  apiFetch("/api/v1/auth/messenger/login/get/code/", {
    method: "POST",
    skipAuth: true,
    body: JSON.stringify(data),
  });
