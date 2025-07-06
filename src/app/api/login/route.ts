import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

type LoginRequestBody = {
  username: string | null;
  password: string | null;
};


export const POST = async (
  req: NextRequest
) => {
  const reqBody: LoginRequestBody = await req.json()

  const username = reqBody.username;
  const password = reqBody.password;
  if (!username || !password || username.length == 0 || password.length == 0) {
    return new NextResponse(
      JSON.stringify({
        message: "Bad Request"
      }),
      {
        status: 400,
      });
  }



  try {
    const externalResponse: Response = await fetch("https://127.0.0.1:4040/api/v1/login-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const apiStatus = externalResponse.status;

    let res;
    if (apiStatus >= 200 && apiStatus < 300) {
      res = new NextResponse(
        JSON.stringify({ message: "Login successful" }),
        { status: apiStatus }
      );
    } else if (apiStatus >= 400 && apiStatus < 500) {
      return new NextResponse(
        JSON.stringify({ message: "Login attempt failed" }),
        { status: apiStatus }
      );
    } else if (apiStatus >= 500) {
      return new NextResponse(
        JSON.stringify({ message: "Internal server error" }),
        { status: apiStatus }
      );
    } else {
      return new NextResponse(
        JSON.stringify({ message: "Something unexpected happened" }),
        { status: apiStatus }
      );
    }

    const rawSetCookies = externalResponse.headers.get("set-cookie");

    if (rawSetCookies) {
      res.headers.set("set-cookie", rawSetCookies);
    }

    return res;
  } catch (err) {
    console.error(`Error: login didn't complete for user ${username}: ${error}`);

    return new NextResponse(
      JSON.stringify({
        message: "Unable to login!"
      }),
      {
        status: 500,
      });
  }
}