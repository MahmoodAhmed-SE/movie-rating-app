import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { EXTERNAL_API_ADDR, MOVIE_POSTER_IMAGES_PATH } from "../../config";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ movieId: string }> }
) => {
  const { movieId } = await params;

  const cookieHeader = req.headers.get("cookie");
  const resp = await fetch(
    `${EXTERNAL_API_ADDR}/api/v1/image-path/${movieId}`,
    {
      method: "GET",
      headers: {
        ...(cookieHeader ? { cookie: cookieHeader } : {}),
      },
    }
  );
  if (resp.status != 200) {
    return NextResponse.json({
      message: "error occured",
    });
  }

  const data = await resp.json();

  const filePath = path.join(MOVIE_POSTER_IMAGES_PATH, data.image_path);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json("Not found", {
      status: 404,
    });
  }

  const imageBuffer = fs.readFileSync(filePath);

  return new NextResponse(imageBuffer, {
    headers: {
      "Content-Type": "image/jpg",
      "Content-Length": imageBuffer.length.toString(),
    },
  });
};
