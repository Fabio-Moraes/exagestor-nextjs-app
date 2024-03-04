'use client';

import { useRouter } from 'next/navigation';
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';

import { FullScreenLoading } from 'components/FullScreenLoading';
import Image from 'components/Vercel/Image';
import apiRoute from 'services/apiRoute';

import alert from './_assets/svg/alert.svg';
import exa from './_assets/svg/exa_logo.svg';
import eyeClosed from './_assets/svg/eye-closed-.svg';
import eyeOpen from './_assets/svg/eye-open.svg';

import {
  Button,
  CheckboxButton,
  Container,
  ErrorSpan,
  FormContainer,
  Input,
  PasswordInput,
  PasswordInputContainer,
  TogglePasswordVisibilityButton
} from './styles';

interface CustomError extends Error {
  response?: {
    status: number;
  };
}

const maxRetries = 4;
const reconnectDelay = 3000;

export const Form = () => {
  const [identification, setIdentification] = useState('');
  const [cpfOrCnpj, setCpfOrCnpj] = useState('CNPJ');
  const [password, setPassword] = useState('');
  const [invalidCredentials, setInvalidCredentials] = useState('');
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleClickOutside = () => {
    if (invalidCredentials !== '') {
      setInvalidCredentials('');
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  const router = useRouter();

  const handleChangeCnpj = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const formattedCnpj = value
      .replace(/[^\d]/g, '') // Remove todos os caracteres não numéricos
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .slice(0, 18);
    setIdentification(formattedCnpj.trim());
  };

  const handleChangeCpf = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const formattedCpf = value
      .replace(/[^\d]/g, '') // Remove todos os caracteres não numéricos
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1-$2')
      .slice(0, 14);
    setIdentification(formattedCpf.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 1) {
      setInvalidCredentials('Credenciais inválidas');
      return;
    }

    if (cpfOrCnpj === 'CNPJ' && identification.length < 18) {
      setInvalidCredentials('Credenciais inválidas');
      return;
    }

    if (cpfOrCnpj === 'CPF' && identification.length < 14) {
      setInvalidCredentials('Credenciais inválidas');
      return;
    }

    function sleep(ms: number): Promise<void> {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        console.log('LOG: RETRY');
        setIsPopupValue(
          retryCount > 0 ? `Conectando<br>Tentativa (${retryCount + 1})` : 'Conectando'
        );

        await apiRoute.post('/api/login', {
          identification: identification,
          password: password
        });

        router.refresh();
        break;
      } catch (error: unknown) {
        if (error instanceof Error) {
          const customError = error as CustomError;
          if (customError.response) {
            const statusCode = customError.response.status;
            console.log('Erro ao fazer login. Código de status:', statusCode);
            if (statusCode === 401) {
              setIsPopupValue(null);
              setInvalidCredentials('Credenciais inválidas');
              break;
            }
          } else {
            console.error('Erro desconhecido:', error);
          }
          await sleep(reconnectDelay);
        }
        if (retryCount + 1 === maxRetries) {
          setIsPopupValue(null);
          setInvalidCredentials('Conexão perdida. Por favor, tente novamente.');
        }
      }
    }
  };

  return (
    <>
      <Container>
        <FormContainer onSubmit={handleSubmit}>
          <div>
            <Image
              priority
              src={exa}
              alt="Book"
              width={40}
              height={40}
              style={{
                marginRight: 5,
                marginLeft: -5
              }}
            />
            <strong>Exa Telecom</strong>
          </div>

          <div>
            <CheckboxButton
              type="button"
              $checked={cpfOrCnpj === 'CNPJ'}
              onClick={() => {
                setIdentification('');
                setCpfOrCnpj('CNPJ');
              }}
            >
              <div />
              <span>Jurídica</span>
            </CheckboxButton>

            <CheckboxButton
              type="button"
              $checked={cpfOrCnpj === 'CPF'}
              onClick={() => {
                setIdentification('');
                setCpfOrCnpj('CPF');
              }}
            >
              <div />
              <span>Física</span>
            </CheckboxButton>
          </div>

          <Input
            type="numeric"
            placeholder={`${cpfOrCnpj}`}
            value={identification}
            onChange={cpfOrCnpj === 'CNPJ' ? handleChangeCnpj : handleChangeCpf}
          />

          <PasswordInputContainer>
            <PasswordInput
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value.trim())}
            />
            <TogglePasswordVisibilityButton
              type="button"
              onClick={() => setPasswordVisible((i) => !i)}
            >
              <Image
                priority
                src={passwordVisible ? eyeOpen : eyeClosed}
                alt="Icon"
                width={20}
                height={20}
                style={{
                  marginTop: 5,
                  marginLeft: -5
                }}
              />
            </TogglePasswordVisibilityButton>
          </PasswordInputContainer>

          <Button type="submit">Entrar</Button>
        </FormContainer>
        {invalidCredentials && (
          <ErrorSpan>
            <div>
              <Image priority src={alert} alt="Book" width={55} height={55} />
            </div>
            <span
              dangerouslySetInnerHTML={{
                __html: invalidCredentials
              }}
            />
          </ErrorSpan>
        )}
      </Container>
      {isPopupValue && <FullScreenLoading message={isPopupValue} />}
    </>
  );
};
