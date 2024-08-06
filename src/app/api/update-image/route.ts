import { NextRequest, NextResponse } from 'next/server';

import { createCanvas } from 'canvas';
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

    // Redimensiona a imagem original
    //const image = sharp(buffer).resize(width, height);

    // Cria um canvas para o texto
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Desenha o fundo escuro com bordas arredondadas
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(10, height - 70, width - 20, 50);
    ctx.lineJoin = 'round';
    ctx.lineWidth = 15;

    // Desenha o texto rotacionado
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '60px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.translate(width / 2, height / 2);
    ctx.rotate((45 * Math.PI) / 180);
    ctx.fillText(text, 0, 0);
    ctx.fillText(text, 0, -150);
    ctx.fillText(text, 0, 150);
    ctx.rotate((-45 * Math.PI) / 180);
    ctx.translate(-width / 2, -height / 2);

    // Desenha o texto de localização
    ctx.fillStyle = 'white';
    ctx.font = '15px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`Latitude: ${latitude} Longitude: ${longitude}`, 20, height - 50);
    ctx.fillText('Teodoro Sampaio SP', 20, height - 30);

    // Converte o canvas para buffer
    const textBuffer = canvas.toBuffer('image/png');

    // Combina a imagem original com a camada de texto
    const combinedImageBuffer = await sharp(buffer)
      .resize(width, height)
      .composite([{ input: textBuffer, blend: 'over' }])
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
