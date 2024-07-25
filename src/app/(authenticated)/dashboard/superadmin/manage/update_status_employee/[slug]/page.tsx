'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { FullScreenLoading } from 'components/FullScreenLoading';
import { Modal } from 'components/Modal';
import { decryptObject } from 'functions';
import { HandleLogout } from 'functions/HandleLogout';
import { TimedWait } from 'functions/TimedWait';
import { internalApi } from 'services/apiAxios';

import { useWebSocket } from 'contexts/webSocket';

import alertSvg from './_assets/svg/alert.svg';
import checkedSvg from './_assets/svg/checked.svg';

import * as S from './styles';

interface SlugType {
  params: {
    slug: string;
  };
}

interface DecryptObjectType {
  userId?: number;
  userName?: string;
  accountStatus?: string;
}

export default function UpdateStateEmployee({ params }: SlugType) {
  const [yourPassword, setYourPassword] = useState('');
  const [modalValue, setModalValue] = useState('');
  const [iconSvgModal, setIconSvgModal] = useState(alertSvg);
  const [isPopupValue, setIsPopupValue] = useState('');

  const [successfullyCompleted, setSuccessfullyCompleted] = useState(false);

  const {
    userName,
    userId,
    accountStatus = ''
  } = decryptObject(params.slug) as DecryptObjectType;

  const socket = useWebSocket();
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

  const maxRetries = 4;

  function generateConnectingMessage(count: number): string {
    return count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando';
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!successfullyCompleted) {
      setIconSvgModal(iconSvgModal);

      if (yourPassword.trim() === '') {
        setModalValue('Informe a senha de administrador');
        return;
      }

      for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
        try {
          setIsPopupValue(generateConnectingMessage(retryCount));

          const response = await internalApi.post('/api/bridge', {
            baseURL: '/api/superadmin/manage/update_status_employee',
            employeeId: String(userId),
            yourPassword: yourPassword,
            accountStatus: accountStatus
          });

          const { status } = response.data;

          if (status === 'success') {
            setSuccessfullyCompleted(true);
            setIsPopupValue('');
            setIconSvgModal(checkedSvg);
            setModalValue('Funcionário inativado com sucesso.');

            if (socket && accountStatus === 'inactive') {
              socket.emit('REMOTE_LOGOUT_USER', JSON.stringify({ employee_id: userId }));
            }

            await TimedWait(1000);
            router.push('/dashboard/superadmin/manage', { scroll: false });
            break;
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            const customError = error as CustomError;
            if (customError.response) {
              const statusCode = customError.response.status;

              if (statusCode === 403) {
                HandleLogout();
                break;
              }

              if (statusCode === 409) {
                break;
              }

              if (statusCode === 401) {
                setIsPopupValue('');
                setModalValue('Senha inválidas');
                break;
              }

              if (retryCount === maxRetries) {
                setModalValue(
                  'Não foi possível inativar o funcionário após várias tentativas.'
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

  const selectedStateAccount = {
    inactive: 'Inativar',
    active: 'Reativar'
  } as { [key: string]: string };

  return (
    <S.Container>
      <S.Title>
        {selectedStateAccount[accountStatus]} {userName && `- ${userName}`}
      </S.Title>
      <S.FormContainer onSubmit={handleSubmit}>
        <S.Input
          type="password"
          placeholder="Digite sua senha de administrador"
          value={yourPassword}
          onChange={(e) => setYourPassword(e.target.value.trim())}
        />

        <S.Button type="submit">{selectedStateAccount[accountStatus]}</S.Button>
      </S.FormContainer>
      {modalValue && !isPopupValue && <Modal icon={iconSvgModal} message={modalValue} />}
      {isPopupValue && <FullScreenLoading message={isPopupValue} />}
    </S.Container>
  );
}
