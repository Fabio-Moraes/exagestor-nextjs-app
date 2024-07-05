'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { TextBox } from './_components/TextBox';
import { FullScreenLoading } from 'components/FullScreenLoading';
import { Modal } from 'components/Modal';
import { TimedWait } from 'functions/TimedWait';
import { internalApi } from 'services/apiAxios';

import alertSvg from './_assets/svg/alert.svg';
import checkedSvg from './_assets/svg/checked.svg';

import * as S from './styles';

export function RegisterService() {
  const [description, setDescription] = useState('');
  const [modalValue, setModalValue] = useState('');
  const [iconSvgModal, setIconSvgModal] = useState(alertSvg);
  const [isPopupValue, setIsPopupValue] = useState('');
  const [successfullyCompleted, setSuccessfullyCompleted] = useState(false);
  const [observationBox, setObservationBox] = useState('');
  const [statusSevice, setStatusSevice] = useState('ativo');

  const router = useRouter();

  const handleClickOutside = () => {
    if (modalValue !== '') {
      !isPopupValue && setModalValue('');
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const maxRetries = 4;

  function generateConnectingMessage(count: number): string {
    return count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando';
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    function validateName(str: string) {
      return /^[a-zA-ZÀ-ÿ ]+$/.test(str);
    }

    if (!successfullyCompleted) {
      setIconSvgModal(iconSvgModal);

      if (description.trim() === '') {
        setModalValue('Informe o nome do funcionário.');
        return;
      }

      if (!validateName(description)) {
        setModalValue('O nome não pode conter números ou caracteres inválidos.');
        return;
      }

      for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
        try {
          setIsPopupValue(generateConnectingMessage(retryCount));

          const response = await internalApi.post('/api/bridge', {
            baseURL: '/api/superadmin/register-service',
            description: description,
            status: statusSevice,
            observation: observationBox
          });

          const { status } = response.data;

          if (status === 'success') {
            setSuccessfullyCompleted(true);
            setIsPopupValue('');
            setIconSvgModal(checkedSvg);
            setModalValue('Novo funcionário(a) registrado com sucesso.');

            await new Promise((resolve) => setTimeout(resolve, 1000));
            router.push('/dashboard/superadmin/running', { scroll: false });
            break;
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            const customError = error as CustomError;
            if (customError.response) {
              const statusCode = customError.response.status;
              if (statusCode === 409) {
                break;
              }

              if (retryCount === maxRetries) {
                setModalValue(
                  'Não foi possível registrar o funcionário(a) após várias tentativas.'
                );
                setIsPopupValue('');
              } else {
                await TimedWait(3000);
              }
            }
          }
        }
      }
    }
  };

  return (
    <>
      <S.FormContainer onSubmit={handleSubmit}>
        <S.Input
          type="text"
          id="Nome"
          placeholder="Nome do serviço"
          value={description}
          onChange={handleName}
        />
        <div>
          <S.CheckboxButton
            type="button"
            $checked={statusSevice === 'ativo'}
            onClick={() => setStatusSevice('ativo')}
          >
            <div />
            <span>Ativo</span>
          </S.CheckboxButton>

          <S.CheckboxButton
            type="button"
            $checked={statusSevice === 'inativo'}
            onClick={() => setStatusSevice('inativo')}
          >
            <div />
            <span>Inativo</span>
          </S.CheckboxButton>
        </div>
        <div>
          <TextBox
            onValue={(i: string) => {
              setObservationBox(i);
            }}
          />
        </div>
        <S.Button type="submit">Registrar</S.Button>
      </S.FormContainer>

      {modalValue && !isPopupValue && <Modal icon={iconSvgModal} message={modalValue} />}
      {isPopupValue && <FullScreenLoading message={isPopupValue} />}
    </>
  );
}
