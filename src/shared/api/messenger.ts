interface MessengerProfileProps {
  name: string;
  username: string;
}

export const updateMessengerProfile = async (data: MessengerProfileProps) => {
  const response = await fetch("/api/auth/profile", {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(
      {
        first_name: data.name,
        username: data.username,
      }
    ),
  });

  const result = await response.json();
  if(!response.ok) throw {status: response.status, data: result}
  return result;
}

export const checkNicknameUnique = async (nickname: string) => {
  const response = await fetch(`/api/auth/check-nickname/${encodeURIComponent(
      nickname
  )}/`);
  const result = await response.json();
  if(!response.ok) throw { status: response.status, data: result }
  return result;
}
  
