import { NextResponse } from "next/server"

export const GET = async () => {
    const response = NextResponse.json({
        message: "Logged out",
    });

    response.cookies.set("jwt_token", "", {
        httpOnly: true,
        expires: new Date(0), // January 1, 1970 — expired
        path: "/",
    });

    return response;
}