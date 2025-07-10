import { NextRequest, NextResponse } from "next/server";
import { EXTERNAL_API_ADDR } from "../config";

type RegisterRequestBody = {
  username: string | null;
  password: string | null;
};

export const POST = async (req: NextRequest) => {
  const reqBody: RegisterRequestBody = await req.json();

  const username = reqBody.username;
  const password = reqBody.password;
  if (!username || !password || username.length == 0 || password.length == 0) {
    return new NextResponse(
      JSON.stringify({
        message: "Bad Request",
      }),
      {
        status: 400,
      }
    );
  }

  try {
    const externalResponse: Response = await fetch(
      EXTERNAL_API_ADDR + "/api/v1/register-user",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );

    const apiStatus = externalResponse.status;

    let res;
    if (apiStatus >= 200 && apiStatus < 300) {
      res = new NextResponse(
        JSON.stringify({ message: "Registeration is successful" }),
        {
          status: apiStatus,
        }
      );
    } else if (apiStatus >= 400 && apiStatus < 500) {
      return new NextResponse(
        JSON.stringify({ message: "Registeration attempt failed" }),
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
    console.error(
      `Error: Registeration didn't complete for user ${username}: ${err}`
    );

    return new NextResponse(
      JSON.stringify({
        message: "Unable to Register!",
      }),
      {
        status: 500,
      }
    );
  }
};
