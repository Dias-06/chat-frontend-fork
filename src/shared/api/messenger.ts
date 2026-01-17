import { apiFetch } from "./client";

export interface MessengerProfileProps {
  name: string;
  username: string;
}

export const updateMessengerProfile = async (data: MessengerProfileProps) => {
  return apiFetch("/api/v1/auth/messenger/profile/", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const checkNicknameUnique = async (nickname: string) => {
  return apiFetch(
    `/api/v1/auth/messenger/profile/unique_nickname_check/${encodeURIComponent(
      nickname
    )}/`
  );
};
