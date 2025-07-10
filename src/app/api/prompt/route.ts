import { NextRequest, NextResponse } from "next/server";
import { EXTERNAL_API_ADDR } from "../config";


class ExternalApiRequest {
  constructor(public movie_name: string, public page_number: number) {}
}

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = (await req.json()) as ExternalApiRequest;
    const { movie_name, page_number } = reqBody;

    if (!movie_name || movie_name.trim() === "" || !page_number) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    const cookieHeader = req.headers.get("cookie");

    const externalResponse = await fetch(EXTERNAL_API_ADDR + "/api/v1/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(cookieHeader ? { cookie: cookieHeader } : {}),
      },
      body: JSON.stringify({ movie_name, page_number }),
    });

    const apiStatus = externalResponse.status;
    if (apiStatus == 401) {
      console.error("module=prompt method=post error=unauthorized_request_err err=" + await externalResponse.text());
      
      return NextResponse.json(
        { message: "Unauthorized Request"},
        { status: apiStatus }
      );
    }

    const responseJson = await externalResponse.json();

    let response;

    if (apiStatus == 200) {
      response = NextResponse.json(
        { message: "Prompt processed successfully", data: responseJson },
        { status: apiStatus }
      );
    } else if (apiStatus == 400) {
      console.error("module=prompt method=post error=bad_request_err err=" + responseJson);
      
      return NextResponse.json(
        { message: "Client error on external API"},
        { status: apiStatus }
      );
    } else if (apiStatus == 500) {
      console.error("module=prompt method=post error=internal_server_err err=" + responseJson);
      return NextResponse.json(
        { message: "Internal server error" },
        { status: apiStatus }
      );
    } else if (apiStatus == 422) {
      return NextResponse.json(
        { message: "Invalid page number" },
        { status: apiStatus }
      );
    } else {
      console.error("module=prompt method=post error=unexpected_status_code_err err=" + responseJson);
      return NextResponse.json(
        { message: "Unexpected response from external API" },
        { status: apiStatus }
      );
    }
    
    return response;
  } catch (error) {
    console.error("module=prompt method=post error=processing_prompt_err err=" + error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
