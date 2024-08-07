'use client';

import { useState } from 'react';

import { PreviewImage } from './_components/PreviewImage';
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

  const uploadImage = async (i: File) => {
    if (!i) {
      setErrorUploadImage('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', i);
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
                style={{
                  width: '100%',
                  height: '15rem',
                  borderRadius: '2.5rem',
                  objectFit: 'cover', // Mantém a proporção da imagem e preenche o contêiner
                  objectPosition: 'center' // Centraliza a imagem dentro do contêiner
                }}
                width={100}
                height={100}
              />
              <p
                style={{
                  position: 'absolute',
                  marginTop: '6.3rem',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  padding: '0.6rem'
                }}
              >
                Selecionar arquivo
              </p>
            </>
          )}
          {!preview && <p>Selecionar arquivo</p>}
        </label>
        {file && (
          <PreviewImage
            value={preview ?? ''}
            onPreview={(i) => {
              uploadImage(i);
            }}
          />
        )}
        {/* {file && <button onClick={uploadImage}>Enviar arquivo</button>} */}
      </div>
      {url && !preview && (
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
