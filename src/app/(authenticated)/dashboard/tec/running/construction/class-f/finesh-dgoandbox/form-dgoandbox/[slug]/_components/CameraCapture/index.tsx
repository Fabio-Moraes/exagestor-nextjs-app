import React, { useRef, useCallback, useEffect } from 'react';

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

  const now = new Date();
  const formattedDate = formatDate(now);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
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
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
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
    <div className="App">
      <S.Header className="App-header">
        <video ref={videoRef} width={300} height={300} autoPlay style={{ display: 'block' }} />
        <canvas ref={canvasRef} width={800} height={800} style={{ display: 'none' }} />
        <S.ButtonCapture
          onClick={capture}
          style={{
            cursor: 'pointer'
          }}
        ></S.ButtonCapture>
      </S.Header>
    </div>
  );
};
