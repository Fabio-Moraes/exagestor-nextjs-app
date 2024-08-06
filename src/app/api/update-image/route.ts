import { NextRequest, NextResponse } from 'next/server';

import { supabase } from 'lib/supabase';
import sharp from 'sharp';

interface CustomError extends Error {
  response?: {
    status: number;
  };
}

async function getBufferFromFile(file: Blob): Promise<Buffer> {
  return Buffer.from(await file.arrayBuffer());
}

async function processImage(
  buffer: Buffer,
  text: string,
  latitude: string | null,
  longitude: string | null
): Promise<Buffer> {
  const width = 500;
  const height = 500;

  const svgBuffer = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="${height - 70}" width="${
        width - 20
      }" height="50" fill="rgba(0, 0, 0, 0.6)" rx="15" ry="15" />
      <g transform="rotate(45, ${width / 2}, ${
        height / 2
      })" font-family="Arial, Helvetica, sans-serif" font-size="60" fill="rgba(255, 255, 255, 0.4)" text-anchor="middle">
        <text x="${width / 2}" y="${height / 2}">${text}</text>
        <text x="${width / 2}" y="${height / 2 - 150}">${text}</text>
        <text x="${width / 2}" y="${height / 2 + 150}">${text}</text>
      </g>
      <g transform="translate(20, ${
        height - 100
      })" font-family="Arial, Helvetica, sans-serif" font-size="15" fill="white">
        <text x="0" y="50">Latitude: ${latitude} Longitude: ${longitude}</text>
        <text x="0" y="70">Teodoro Sampaio SP</text>
      </g>
    </svg>
  `);

  return sharp(buffer)
    .resize(width, height)
    .composite([{ input: svgBuffer, top: 0, left: 0 }])
    .toBuffer();
}

async function uploadToSupabase(file: Blob, buffer: Buffer) {
  const { error } = await supabase.storage
    .from('exagestor')
    .upload(`uploads/${file.name}`, buffer, {
      cacheControl: '3600',
      upsert: true,
      contentType: file.type
    });

  if (error) throw new Error(error.message);
}

async function generateSignedUrl(fileName: string) {
  const { data, error } = await supabase.storage
    .from('exagestor')
    .createSignedUrl(`uploads/${fileName}`, 60);

  if (error) throw new Error(error.message);

  return data?.signedUrl;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as Blob;
    const text = formData.get('text') as string;
    const latitude = formData.get('latitude') as string | null;
    const longitude = formData.get('longitude') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = await getBufferFromFile(file);
    const processedImageBuffer = await processImage(buffer, text, latitude, longitude);

    const metadata = await sharp(processedImageBuffer).metadata();
    if (!['png', 'jpg', 'jpeg'].includes(metadata.format || '')) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, JPG and PNG images are allowed.' },
        { status: 400 }
      );
    }

    await uploadToSupabase(file, processedImageBuffer);

    const signedUrl = await generateSignedUrl(file.name);

    return NextResponse.json({ signedUrl }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      const customError = error as CustomError;
      const statusCode = customError.response?.status || 500;
      return NextResponse.json({ error: error.message }, { status: statusCode });
    }

    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
