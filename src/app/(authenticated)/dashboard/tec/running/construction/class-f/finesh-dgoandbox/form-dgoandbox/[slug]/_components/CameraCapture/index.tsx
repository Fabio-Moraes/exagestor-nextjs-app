import React, { useRef, useCallback, useEffect, useState } from 'react';

import { formatDate } from 'functions';

import * as S from './styles';

interface CameraComponentProps {
  onCapture: (file: File) => void;
  latitude: string;
  longitude: string;
  address: string;
}

export const CameraCapture: React.FC<CameraComponentProps> = ({
  onCapture,
  latitude,
  longitude,
  address
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const now = new Date();
  const formattedDate = formatDate(now);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment'
          }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
        }
      } catch (err) {
        console.error('Error accessing the camera', err);
      }
    };

    getMedia();

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const capture = useCallback(() => {
    if (canvasRef.current && videoRef.current) {
      setIsCapturing(true);
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const video = videoRef.current;

      if (context) {
        // Obter as dimensões reais do vídeo
        // Obter as dimensões reais do vídeo
        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;

        // Calcular a proporção (aspect ratio)
        const aspectRatio = videoWidth / videoHeight;

        // Definir o tamanho final do canvas quadrado (800x800)
        const canvasSize = 800;

        // Calcular as dimensões do corte (proporção)
        let newWidth = canvasSize;
        let newHeight = canvasSize;

        if (aspectRatio > 1) {
          // Vídeo mais largo que alto
          newHeight = canvasSize / aspectRatio;
        } else {
          // Vídeo mais alto que largo ou igual
          newWidth = canvasSize * aspectRatio;
        }

        // Ajustar o canvas para o corte centralizado
        const offsetX = (canvasSize - newWidth) / 2;
        const offsetY = (canvasSize - newHeight) / 2;

        // Definir o tamanho do canvas para o corte sem distorção
        canvas.width = canvasSize;
        canvas.height = canvasSize;

        // Limpar o canvas e desenhar o vídeo centralizado
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(
          video,
          0, // Posição inicial no eixo X
          0, // Posição inicial no eixo Y
          videoWidth, // Largura do vídeo
          videoHeight, // Altura do vídeo
          offsetX, // Posição X no canvas
          offsetY, // Posição Y no canvas
          newWidth, // Largura ajustada no canvas
          newHeight // Altura ajustada no canvas
        );
        ///////////////////////////////////////////////////////////////////////
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        const latitudeText = `Latitude: ${latitude}`;
        const longitudeText = `Longitude: ${longitude}`;
        const dateText = formattedDate;
        const addressText = address;

        context.font = '20px Arial';
        context.fillStyle = '#ffffff';
        context.textAlign = 'left';
        context.textBaseline = 'top';

        const margin = 20;
        let yPosition = canvas.height - 70;

        // Verifica se o endereço é muito longo e quebra a linha
        const maxWidth = canvas.width - 2 * margin;
        const addressLines = wrapText(context, addressText, maxWidth);

        // Calculando a altura necessária para o texto
        const latitudeHeight = 40; // altura do latitude
        const longitudeHeight = 40; // altura do longitude
        const dateHeight = 40; // altura da data
        const addressHeight = addressLines.length * 30; // altura do endereço com quebras de linha

        const totalHeight = latitudeHeight + longitudeHeight + dateHeight + addressHeight;
        const spaceLeft = canvas.height - yPosition - totalHeight;

        // Se houver espaço disponível, move o texto para cima
        if (spaceLeft < 0) {
          const shiftAmount = Math.abs(spaceLeft); // Quanto precisa subir
          yPosition -= shiftAmount; // Move o texto para cima
        }

        // Fundo preto transparente para o texto
        const textBoxHeight = latitudeHeight + longitudeHeight + dateHeight + addressHeight;
        context.fillStyle = 'rgba(0, 0, 0, 0.5)'; // Fundo preto com 50% de transparência
        context.fillRect(margin - 5, yPosition - 5, maxWidth + 10, textBoxHeight + 10); // Ajusta o retângulo para o fundo

        // Desenhando o latitude e longitude
        context.fillStyle = '#ffffff'; // Cor do texto
        context.fillText(latitudeText, margin, yPosition);
        yPosition += latitudeHeight;
        context.fillText(longitudeText, margin, yPosition);
        yPosition += longitudeHeight;
        context.fillText(dateText, margin, yPosition);
        yPosition += dateHeight;

        // Desenhando o endereço, linha por linha
        addressLines.forEach((line) => {
          context.fillText(line, margin, yPosition);
          yPosition += 25; // Espaço entre as linhas do endereço
        });

        // Captura a imagem do canvas e chama o callback
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `photo_${Date.now()}.jpg`, { type: 'image/jpeg' });
            onCapture(file);
          }
          setIsCapturing(false); // Finaliza o estado de captura
        }, 'image/png');
      }
    }
  }, [onCapture, latitude, longitude, address]);

  // Função para quebrar o texto em várias linhas, se necessário
  const wrapText = (context: CanvasRenderingContext2D, text: string, maxWidth: number) => {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    words.forEach((word) => {
      const testLine = currentLine ? currentLine + ' ' + word : word;
      const testWidth = context.measureText(testLine).width;

      if (testWidth <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) {
          lines.push(currentLine);
        }
        currentLine = word;
      }
    });

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines;
  };

  return (
    <S.CameraContainer>
      <S.Header>
        <S.VideoWrapper>
          <S.VideoElement
            ref={videoRef}
            autoPlay
            style={{ width: '100%', height: '100%', display: 'block' }}
          />
        </S.VideoWrapper>
        <canvas ref={canvasRef} width={800} height={800} style={{ display: 'none' }} />
      </S.Header>
      <S.ButtonWrapper>
        <S.ButtonCapture
          style={{ opacity: isCapturing ? 0.3 : 1 }}
          onClick={!isCapturing ? capture : undefined}
        />
      </S.ButtonWrapper>
    </S.CameraContainer>
  );
};
