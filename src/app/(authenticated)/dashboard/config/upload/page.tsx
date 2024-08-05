'use client';

import { useState } from 'react';

import Image from 'components/Vercel/Image';

import { supabase } from 'lib/supabase';

import * as S from './styles';

const Settings = () => {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const uploadImage = async () => {
    if (!file) {
      setError('No file selected');
      return;
    }

    try {
      // Upload the file
      const { error: uploadError } = await supabase.storage
        .from('exagestor')
        .upload(`${file.name}`, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: file.type
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      // Generate signed URL for the file
      const { data: signedUrlData, error: signedUrlError } = await supabase.storage
        .from('exagestor')
        .createSignedUrl(`${file.name}`, 60); // URL valid for 60 seconds

      if (signedUrlError) {
        throw new Error(signedUrlError.message);
      }

      const signedURL = signedUrlData?.signedUrl;
      if (signedURL) {
        setUrl(signedURL);
      } else {
        throw new Error('Failed to generate signed URL');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <S.Container>
      <S.Title>Upload Teste</S.Title>
      <div>
        <label style={{ backgroundColor: file ? '#008F7A' : '#1A1A1A' }}>
          <input type="file" onChange={handleFileChange} />
          Selecionar arquivo
        </label>
        <button onClick={uploadImage}>Enviar arquivo</button>
      </div>
      {url && (
        <Image
          src={url}
          priority
          loading="eager"
          alt="Uploaded Image"
          style={{ width: '30rem', height: 'auto' }}
          width={400}
          height={300}
        />
      )}
      {error && <p>{error}</p>}
    </S.Container>
  );
};

export default Settings;
