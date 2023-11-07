'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button, ListContainer, InputContainer, Input } from './styles';

import { useContexState } from 'hooks/useGlobalContext';
import Cookie from 'js-cookie';
import api from 'lib/api';

interface Service {
  id: number;
  client_name: string;
  city: string;
  address: string;
  nomenclature: string;
  classification: string;
  status: string;
  update_count: number;
  created_at: string;
  protocol: string;
}

export function TextBox({ service }: { service: Service }) {
  /* eslint-disable */
  const [connectionError, setConnectionError] = useState(false);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);

  const [description, setDescription] = useState('');
  /* eslint-enable */

  //const [isLoading, setIsLoading] = useState(true);

  const { setObservationBox, observationBox } = useContexState();

  useEffect(() => {
    const timer = setTimeout(() => {
      //setIsLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const storedCookie = Cookie.get('auth_token');
  const maxRetries = 4;

  const router = useRouter();

  async function fetchConcludedMaterial() {
    setConnectionError(false);

    for (let count = 0; count < maxRetries; count++) {
      try {
        setIsPopupValue(
          count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando'
        );

        const response = await api.get('/api/services/concluded', {
          params: {
            token: storedCookie,
            protocol: service?.protocol,
            serviceIds: JSON.stringify('selectedItems')
          }
        });

        count = maxRetries;
        router.push('/dashboard/new');
        console.log(response.data);
      } catch (error) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        setConnectionError(true);
      }
    }
    setIsPopupValue(null);
  }

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setObservationBox((prevItems) => {
      return {
        ...prevItems,
        [service?.protocol]: event.target.value
      };
    });
  };

  return (
    <ListContainer>
      <InputContainer>
        <Input
          value={
            observationBox[service?.protocol]?.length > 0
              ? observationBox[service?.protocol]
              : ''
          }
          onChange={handleDescriptionChange}
          placeholder="Escreva sua descrição aqui..."
        />
      </InputContainer>
      <div>
        <Button onClick={() => router.back()}>Voltar</Button>
        <Button onClick={() => fetchConcludedMaterial()}>Concluir</Button>
      </div>
    </ListContainer>
  );
}
