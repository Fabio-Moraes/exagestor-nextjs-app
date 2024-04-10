'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { FullScreenLoading } from 'components/FullScreenLoading';
import { Modal } from 'components/Modal';
import { decryptObject } from 'functions';
import { TimedWait } from 'functions/TimedWait';
import { internalApi } from 'services/apiAxios';

import alertSvg from './_assets/svg/alert.svg';
import checkedSvg from './_assets/svg/checked.svg';

import { Button, Container, FormContainer, Input, Title } from './styles';

interface SlugType {
  params: {
    slug: string;
  };
}

interface DecryptObjectType {
  userId?: number;
  userName?: string;
  employee_all?: boolean;
}

export default function ChangePassword({ params }: SlugType) {
  const [yourPassword, setYourPassword] = useState('');
  const [newPasswordEmployee, setNewPasswordEmployee] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const [modalValue, setModalValue] = useState('');
  const [iconSvgModal, setIconSvgModal] = useState(alertSvg);
  const [isPopupValue, setIsPopupValue] = useState('');

  const [successfullyCompleted, setSuccessfullyCompleted] = useState(false);

  const { userName, userId } = decryptObject(params.slug) as DecryptObjectType;

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

      if (newPasswordEmployee.trim() === '' || passwordCheck.trim() === '') {
        setModalValue('Informe a senha do funcionário');
        return;
      }

      if (newPasswordEmployee.trim() !== passwordCheck.trim()) {
        setModalValue('Senha não conferem');
        return;
      }

      for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
        try {
          setIsPopupValue(generateConnectingMessage(retryCount));

          const response = await internalApi.post('/api/bridge', {
            baseURL: '/api/admin/manage/update_password_employee',
            employeeId: String(userId),
            yourPassword: yourPassword,
            newPasswordEmployee: newPasswordEmployee
          });

          const { status } = response.data;

          if (status === 'success') {
            setSuccessfullyCompleted(true);
            setIsPopupValue('');
            setIconSvgModal(checkedSvg);
            setModalValue('Senha redefinida com sucesso.');

            await new Promise((resolve) => setTimeout(resolve, 1000));
            router.push('/dashboard/admin/manage', { scroll: false });
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

              if (statusCode === 401) {
                setIsPopupValue('');
                setModalValue('Senha inválidas');
                break;
              }

              if (retryCount === maxRetries) {
                setModalValue('Não foi possível redefinir a senha após várias tentativas.');
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
    <Container>
      <Title>Redefinir senha {userName && `- ${userName}`}</Title>
      <FormContainer onSubmit={handleSubmit}>
        <Input
          type="password"
          placeholder="Sua senha de administrador"
          value={yourPassword}
          onChange={(e) => setYourPassword(e.target.value.trim())}
        />

        <Input
          type="password"
          placeholder="Nova senha do funcionário"
          value={newPasswordEmployee}
          onChange={(e) => setNewPasswordEmployee(e.target.value.trim())}
        />

        <Input
          type="password"
          placeholder="Confirme a nova senha"
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value.trim())}
        />

        <Button type="submit">Redefinir</Button>
      </FormContainer>

      {modalValue && !isPopupValue && <Modal icon={iconSvgModal} message={modalValue} />}
      {isPopupValue && <FullScreenLoading message={isPopupValue} />}
    </Container>
  );
}
