import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { EXTERNAL_API_ADDR, MOVIE_POSTER_IMAGES_PATH } from '../../config';



export const GET = async (
    req: NextRequest,
    { params }: { params: Promise<{ movieId: string }> }
) => {
    const { movieId } = await params;

    const resp = await fetch(`${EXTERNAL_API_ADDR}/api/v1/image-name/${movieId}`);
    if (resp.status != 200) {
        return NextResponse.json({
            "message": "error occured",
        })
    }

    const data = await resp.json();


    const filePath = path.join(MOVIE_POSTER_IMAGES_PATH, data.directory)

    if (!fs.existsSync(filePath)) {
        return NextResponse.json('Not found', {
            status: 404,
        });
    }

    const imageBuffer = fs.readFileSync(filePath);

    return new NextResponse(imageBuffer, {
        headers: {
            'Content-Type': 'image/png',
            'Content-Length': imageBuffer.length.toString(),
        },
    });
}