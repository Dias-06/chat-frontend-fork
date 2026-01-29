export const getToken = async (data: { phone_number: string; code: string }) =>{
  const response = await fetch("/api/auth/code-verification", {
    method: "POST",
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if(!response.ok) throw {status: response.status, data: result}
  return result;
}

export const sendLoginCode = async (data: { phone_number: string; code_len: number }) => {
  const response = await fetch("/api/auth/send-code/", {
    method: "POST",
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  });
  const result = await response.json()
  if(!response.ok) throw {status: response.status, data: result}
  return result;
}