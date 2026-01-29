import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ nickname : string }> }
) {
    const { nickname } = await params;
    const url = `https://api.test.chat.ktsf.ru/api/v1/auth/messenger/profile/unique_nickname_check/${encodeURIComponent(nickname)}/`

    const token = request.cookies.get('access-token')?.value;
    if(!token) {
        return NextResponse.json({error: 'Необходима авторизация'}, {status: 401})
    }

    try{
        const response = await fetch(url, 
            {
                method: 'GET',
                headers: { 'accept': 'application/json', 'Authorization': `Bearer ${token}`},
                next: { revalidate: 60 }
            }
        );
        const data = await response.json();

        if (response.status == 409) {
            return NextResponse.json({error: data.messages}, {status: 409})
        }
        return NextResponse.json(data, {status: response.status});
    }catch(err) {
        console.log("Nickname check error", err);
        return NextResponse.json(
            { error: 'Ошибка сервера' },
            { status: 500 },
        )
    }
}