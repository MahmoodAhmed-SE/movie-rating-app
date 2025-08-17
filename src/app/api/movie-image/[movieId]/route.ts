import fs from 'fs';
import { NextRequest } from 'next/server';
import path from 'path';



export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ movieId: string }> }
) => {
    const { movieId } = await params;
    

    
}