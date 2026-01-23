import React from 'react'
const url = process.env.NEXT_PUBLIC_API_URL;

type Props = {
    token: string
}

export async function fetchSettings(props : Props) {
    const {token} = props;

    const data = await fetch(`${url}/api/v1/auth/messenger/profile/`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body:JSON.stringify({})
    })
    if (!data.ok) {
        throw new Error("Ошибка получения профиля");
    }
    const res = await data.json()
    return res;
}
