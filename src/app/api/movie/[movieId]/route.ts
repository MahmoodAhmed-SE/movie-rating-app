import { NextRequest, NextResponse } from "next/server";
import { EXTERNAL_API_ADDR } from "../../config";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ movieId: string }> }
) => {
  const { movieId } =  await params;
  
  

  const movieIdInt = parseInt(movieId);
  if (isNaN(movieIdInt)) {
    return NextResponse.json(
      { message: "Movie id is invalid" },
      { status: 400 }
    );
  }

  if (!movieId) {
    return NextResponse.json({ message: "Bad Request" }, { status: 400 });
  }

  try {
    const cookieHeader = req.headers.get("cookie");

    const externalResponse = await fetch(
      `${EXTERNAL_API_ADDR}/api/v1/movies/${movieIdInt}`,
      {
        method: "GET",
        headers: {
          ...(cookieHeader ? { cookie: cookieHeader } : {}),
        },
      }
    );

    const apiStatus = externalResponse.status;
    const responseJson = await externalResponse.json();

    switch (apiStatus) {
      case 200:
        return NextResponse.json(
          { message: "Movie found", data: responseJson },
          { status: apiStatus }
        );
      case 401:
        console.error(
          "module=movie method=get error=unauthorized_request_err err=" +
          JSON.stringify(responseJson)
        );
        return NextResponse.json(
          { message: "Unauthorized Request" },
          { status: apiStatus }
        );
      case 400:
        console.error(
          "module=movie method=get error=bad_request_err err=" +
          JSON.stringify(responseJson)
        );
        return NextResponse.json(
          { message: "Client error on external API" },
          { status: apiStatus }
        );
      case 404:
        console.error(
          "module=movie method=get error=movie_not_found_err err=" +
          JSON.stringify(responseJson)
        );
        return NextResponse.json(
          { message: "Not found" },
          { status: apiStatus }
        );
      case 500:
        console.error(
          "module=movie method=get error=internal_server_err err=" +
          JSON.stringify(responseJson)
        );
        return NextResponse.json(
          { message: "Internal server error" },
          { status: apiStatus }
        );
      default:
        console.error(
          "module=movie method=get error=unexpected_status_code_err err=" +
          JSON.stringify(responseJson)
        );
        return NextResponse.json(
          { message: "Unexpected response from external API" },
          { status: apiStatus }
        );
    }
  } catch (error) {
    console.error("module=movie method=get error=processing_movie_err err=" + error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
