'use client';

import { useState } from 'react';

import Image from 'components/Vercel/Image';
import useGeoLocation from 'hooks/useGeoLocation';

import { useBusiness } from 'store/business';

import * as S from './styles';

const Settings = () => {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [errorUploadImage, setErrorUploadImage] = useState<string | null>(null);

  const { location, error: errorGeoLocation, loading } = useGeoLocation();

  const business = useBusiness((state) => state.business);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      // Cria uma URL de pré-visualização do arquivo
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
    }
  };

  const uploadImage = async () => {
    if (!file) {
      setErrorUploadImage('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('text', business.toUpperCase());
    formData.append('latitude', String(location.latitude ?? '00-000000'));
    formData.append('longitude', String(location.longitude ?? '00-000000'));

    try {
      const response = await fetch('/api/update-image', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (response.ok && data.signedUrl) {
        setUrl(data.signedUrl);
      } else {
        throw new Error(data.error || 'Failed to upload image');
      }
    } catch (err) {
      if (err instanceof Error) {
        setErrorUploadImage(err.message);
      } else {
        setErrorUploadImage('An unknown error occurred');
      }
    } finally {
      setFile(null);
      setPreview(null);
    }
  };

  return (
    <S.Container>
      <S.Title>Upload Teste</S.Title>
      {loading && <p>Loading...</p>}
      <div>
        <label style={{ backgroundColor: file ? '#008F7A' : '#1A1A1A' }}>
          <input type="file" onChange={handleFileChange} />
          {preview && (
            <>
              <Image
                src={preview}
                priority
                loading="eager"
                alt="Uploaded Image"
                style={{ width: '10rem', height: '10rem', borderRadius: '5rem' }}
                width={100}
                height={100}
              />
            </>
          )}
          Selecionar arquivo
        </label>
        {file && <button onClick={uploadImage}>Enviar arquivo</button>}
      </div>
      {url && (
        <>
          <p>Concluído</p>
          <Image
            src={url}
            priority
            loading="eager"
            alt="Uploaded Image"
            style={{ width: '35rem', height: '35rem' }}
            width={500}
            height={500}
          />
        </>
      )}
      {errorGeoLocation && <p>Error: {errorGeoLocation}</p>}
      {errorUploadImage && <p>{errorUploadImage}</p>}
    </S.Container>
  );
};

export default Settings;
