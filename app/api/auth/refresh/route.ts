import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const refreshToken = request.cookies.get("refresh-token")?.value;
        if (!refreshToken) {
            return NextResponse.json(
                {error: 'Сессия истекла, войдите снова'},
                {status: 401}
            )
        }

        const response = await fetch('https://api.test.chat.ktsf.ru/api/v1/auth/messenger/login/refresh/', 
            {
                method: "POST",
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({refresh: refreshToken}),
            }
        )
        const data = await response.json();

        if(!response.ok) {
            const errorResponse = NextResponse.json(data, {status: response.status});
            errorResponse.cookies.delete('access-token');
            errorResponse.cookies.delete('refresh-token');
            return errorResponse
        }

        const nextResponse = NextResponse.json(
            {success: true},
            {status: 200},
        )

        nextResponse.cookies.set('access-token', data.access, 
            {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                path: '/'
            }
        )
        if(data.refresh) {
            nextResponse.cookies.set('refresh-token', data.refresh, 
                {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    path: '/'
                }
            )
        }
        return nextResponse;
    } catch (error) {
        console.log("Refresh error", error);
        return NextResponse.json(
            {error: 'server internal error'},
            {status: 500}
        )
    }
}