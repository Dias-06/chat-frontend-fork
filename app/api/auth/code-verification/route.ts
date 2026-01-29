import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const response = await fetch('https://api.test.chat.ktsf.ru/api/v1/auth/messenger/login/get/token/',
            {
                method: "POST",
                headers: {
                    'accept': "application/json",
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(body)
            }
        )

        const data = await response.json();

        if(!response.ok) {
            return NextResponse.json(data, {status: response.status});
        }

        const { access, refresh, ...userData } = data;
        const nextResponse = NextResponse.json(userData, {status: response.status});

        nextResponse.cookies.set("access-token", access,{
            "httpOnly": true,
            secure: true,
            sameSite: "strict",
            path: '/',
            maxAge: 60 * 15,
        });

        nextResponse.cookies.set("refresh-token", refresh, {
            "httpOnly": true,
            secure: true,
            "sameSite": "strict",
            path: '/',
            maxAge: 60 * 60 * 24 * 7
        });

        return nextResponse;
    } catch(err) {
        console.error('Proxy login error:', err);
        return NextResponse.json(
            {error: "interval server error"},
            {status: 500},
        )
    }
}