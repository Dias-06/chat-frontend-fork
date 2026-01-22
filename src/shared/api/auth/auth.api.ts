import { apiFetch } from "../base";
import {
  SendCodeRequest,
  GetTokenRequest,
  GetTokenResponse,
} from "./auth.types";

export function sendLoginCode(data: SendCodeRequest) {
  return apiFetch(
    "/api/v1/auth/messenger/login/get/code/",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}

export function getToken(data: GetTokenRequest) {
  return apiFetch<GetTokenResponse>(
    "/api/v1/auth/messenger/login/get/token/",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}
