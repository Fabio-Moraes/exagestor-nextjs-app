import { type NextRequest, NextResponse } from 'next/server';

//import { backendApi } from 'services/apiAxios';

import CryptoJS from 'crypto-js';
import { jwtVerify } from 'jose';
import { supabase } from 'lib/supabase';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  const auth = request.cookies.get('_session_auth')?.value;
  const ssid = request.cookies.get('_session_ssid')?.value;
  const salt = process.env.SECRET_SALT!;

  const authentication = CryptoJS.SHA256(ssid + salt).toString(CryptoJS.enc.Hex);

  try {
    await jwtVerify(auth ?? '', new TextEncoder().encode(authentication));

    const formData = await request.formData();
    const file = formData.get('file') as Blob;
    const name = formData.get('name') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Lê o conteúdo do arquivo
    const buffer = Buffer.from(await file.arrayBuffer());

    // Usa sharp para verificar o tipo de imagem
    const resizedImageBuffer = await sharp(buffer)
      .resize(800, 800) // Define a largura e altura desejadas
      .jpeg()
      .toBuffer();

    // Faz o upload do arquivo
    const { error: uploadError } = await supabase.storage
      .from('exagestor')
      .upload(`uploads/service-tec/${name}`, resizedImageBuffer, {
        cacheControl: '3600',
        upsert: true,
        contentType: file.type
      });

    if (uploadError) {
      console.error('Signed Upload Error:', uploadError.message);
      throw new Error(uploadError.message);
    }

    // Gera a URL assinada para o arquivo
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from('exagestor')
      .createSignedUrl(`uploads/dgoandbox/${name}`, 60); // URL válida por 60 segundos

    if (signedUrlError) {
      console.error('Signed URL Error:', signedUrlError.message);
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
