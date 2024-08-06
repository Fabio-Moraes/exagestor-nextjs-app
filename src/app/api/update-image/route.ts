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

    // Usa sharp para verificar o tipo de imagem
    const resizedImageBuffer = await sharp(buffer)
      .resize(500, 500) // Define a largura e altura desejadas
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
                
          <!-- Texto rotacionado -->
          <foreignObject x="${width / 2 - 150}" y="${
            height / 2 - 50
          }" width="300" height="100">
            <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: Arial, Helvetica, sans-serif; font-size: 60px; color: rgba(255, 255, 255, 0.4); transform: rotate(45deg); text-align: center; line-height: 100px;">
              ${text}
            </div>
          </foreignObject>
          <foreignObject x="${width / 2 - 150}" y="${
            height / 2 - 200
          }" width="300" height="100">
            <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: Arial, Helvetica, sans-serif; font-size: 60px; color: rgba(255, 255, 255, 0.4); transform: rotate(45deg); text-align: center; line-height: 100px;">
              ${text}
            </div>
          </foreignObject>
          <foreignObject x="${width / 2 - 150}" y="${
            height / 2 + 100
          }" width="300" height="100">
            <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: Arial, Helvetica, sans-serif; font-size: 60px; color: rgba(255, 255, 255, 0.4); transform: rotate(45deg); text-align: center; line-height: 100px;">
              ${text}
            </div>
          </foreignObject>
                
          <!-- Informações de localização -->
          <g transform="translate(20, ${height - 100})">
            <text
              x="0"
              y="50"
              font-family="Arial, Helvetica, sans-serif"
              font-size="15"
              fill="white">
              Latitude: ${latitude} Longitude: ${longitude}
            </text>
            <text
              x="0"
              y="70"
              font-family="Arial, Helvetica, sans-serif"
              font-size="15"
              fill="white">
              Teodoro Sampaio SP
            </text>
          </g>
        </svg>
        `),
          gravity: 'northwest', // Posição do texto
          top: 0,
          left: 0
        }
      ]) // Adiciona o texto como uma imagem SVG
      .toBuffer();

    // Verifica o formato da imagem redimensionada
    const metadata = await sharp(resizedImageBuffer).metadata();

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
      .upload(`uploads/${file.name}`, resizedImageBuffer, {
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
