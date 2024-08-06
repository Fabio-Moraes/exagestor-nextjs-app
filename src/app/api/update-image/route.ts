import { NextRequest, NextResponse } from 'next/server';

import { supabase } from 'lib/supabase';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as Blob;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Lê o conteúdo do arquivo
    const buffer = Buffer.from(await file.arrayBuffer());

    // Usa sharp para verificar o tipo de imagem
    const resizedImageBuffer = await sharp(buffer)
      .resize(500, 500) // Define a largura e altura desejadas
      .jpeg()
      .toBuffer();

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
