export interface MessengerProfileProps {
  name: string;
  username: string;
}

export const updateMessengerProfile = async (data: MessengerProfileProps, token: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/messenger/profile/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errData = await res.json();
    throw new Error(errData.message || "Ошибка при обновлении профиля");
  }

  return res.json();
};

export async function checkNicknameUnique(
  nickname: string,
  token: string
) {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(
    `${BASE_URL}/api/v1/auth/messenger/profile/unique_nickname_check/${encodeURIComponent(
      nickname
    )}/`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  let data: any = null;
  try {
    data = await res.json();
  } catch {
  }

  if (!res.ok) {
    if (res.status === 400) {
      throw new Error(
        data?.message || "Никнейм уже занят или недопустим"
      );
    }

    if (res.status === 401 || res.status === 403) {
      throw new Error("Необходима авторизация");
    }

    throw new Error("Ошибка при проверке никнейма");
  }

  return true;
}
