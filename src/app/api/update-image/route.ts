import { NextRequest, NextResponse } from 'next/server';

import { supabase } from 'lib/supabase';
import sharp from 'sharp';

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

    // Lê o conteúdo do arquivo
    const buffer = Buffer.from(await file.arrayBuffer());

    const width = 500;
    const height = 500;

    // Cria um buffer para a imagem de fundo
    const backgroundBuffer = await sharp({
      create: {
        width,
        height,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      }
    })
      .png()
      .toBuffer();

    // Cria a camada de texto e gráficos
    const textBuffer = await sharp({
      create: {
        width,
        height,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      }
    })
      .composite([
        {
          input: Buffer.from(`
            <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
              <!-- Fundo com cor escura e bordas arredondadas -->
              <rect
                x="10"
                y="${height - 70}"
                width="${width - 20}"
                height="50"
                fill="rgba(0, 0, 0, 0.6)"
                rx="15"
                ry="15" />
            </svg>
          `),
          top: 0,
          left: 0
        },
        {
          input: Buffer.from(`
            <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
              <!-- Texto rotacionado -->
              <text x="${width / 2}" y="${
                height / 2
              }" font-family="Arial, Helvetica, sans-serif" font-size="60" fill="rgba(255, 255, 255, 0.4)" text-anchor="middle" alignment-baseline="middle" transform="rotate(45, ${
                width / 2
              }, ${height / 2})">${text}</text>
              <text x="${width / 2}" y="${
                height / 2 - 150
              }" font-family="Arial, Helvetica, sans-serif" font-size="60" fill="rgba(255, 255, 255, 0.4)" text-anchor="middle" alignment-baseline="middle" transform="rotate(45, ${
                width / 2
              }, ${height / 2})">${text}</text>
              <text x="${width / 2}" y="${
                height / 2 + 150
              }" font-family="Arial, Helvetica, sans-serif" font-size="60" fill="rgba(255, 255, 255, 0.4)" text-anchor="middle" alignment-baseline="middle" transform="rotate(45, ${
                width / 2
              }, ${height / 2})">${text}</text>

              <!-- Informações de localização -->
              <text x="20" y="${
                height - 50
              }" font-family="Arial, Helvetica, sans-serif" font-size="15" fill="white">Latitude: ${latitude} Longitude: ${longitude}</text>
              <text x="20" y="${
                height - 30
              }" font-family="Arial, Helvetica, sans-serif" font-size="15" fill="white">Teodoro Sampaio SP</text>
            </svg>
          `),
          top: 0,
          left: 0
        }
      ])
      .png()
      .toBuffer();

    // Combina a imagem original com a camada de texto e gráficos
    const combinedImageBuffer = await sharp(buffer)
      .resize(width, height)
      .composite([
        { input: backgroundBuffer, blend: 'over' },
        { input: textBuffer, blend: 'over' }
      ])
      .toBuffer();

    // Verifica o formato da imagem combinada
    const metadata = await sharp(combinedImageBuffer).metadata();

    // Verifica se a imagem tem um formato válido
    if (!['png', 'jpg', 'jpeg'].includes(metadata.format || '')) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, JPG and PNG images are allowed.' },
        { status: 400 }
      );
    }

    // Faz o upload do arquivo
    const { error: uploadError } = await supabase.storage
      .from('exagestor')
      .upload(`uploads/${file.name}`, combinedImageBuffer, {
        cacheControl: '3600',
        upsert: true,
        contentType: file.type
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    // Gera a URL assinada para o arquivo
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from('exagestor')
      .createSignedUrl(`uploads/${file.name}`, 60); // URL válida por 60 segundos

    if (signedUrlError) {
      throw new Error(signedUrlError.message);
    }

    return NextResponse.json({ signedUrl: signedUrlData?.signedUrl }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      const customError = error as CustomError;

      if (customError.response) {
        const statusCode = customError.response.status;
        return NextResponse.json({ error: error.message }, { status: statusCode });
      }

      return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
    }
  }
}
