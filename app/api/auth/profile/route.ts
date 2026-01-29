import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get('access-token')?.value;

        if(!token) {
            return NextResponse.json({details: 'Unauthorized'}, {status: 401});
        }

        const body = await request.json();

        const response = await fetch('https://api.test.chat.ktsf.ru/api/v1/auth/messenger/profile/',
            {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(body || {}),
            }
        )
        const result = await response.json();
        return NextResponse.json(result, {status: response.status});
    } catch (error) {
        console.log('Profile Proxy Error:', error);
        return NextResponse.json({error: 'Internal server error'}, {status: 500});
    }
}