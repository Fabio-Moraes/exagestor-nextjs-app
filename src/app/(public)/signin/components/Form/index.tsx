'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';

import { FullScreenLoading } from 'components/FullScreenLoading';

//import { Footer } from '../Footer';
import alert from './assets/svg/alert.svg';
import exa from './assets/svg/exa_logo.svg';
import eyeClosed from './assets/svg/eye-closed-.svg';
import eyeOpen from './assets/svg/eye-open.svg';
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

import Cookie from 'js-cookie';
import api from 'lib/api';

interface CustomError extends Error {
  response?: {
    status: number;
  };
}

const MAX_RETRIES = 6;

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
  Cookie.remove('auth_token');

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

    for (let count = 0; count < MAX_RETRIES; count++) {
      try {
        setIsPopupValue(count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando');
        const response = await api.post('/api/auth/signin', {
          identification: identification,
          password
        });
        const { token } = response.data;

        if (response.status === 200) {
          count = MAX_RETRIES;
          Cookie.set('auth_token', token, { expires: 7, path: '/' });
          router.refresh();
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          const customError = error as CustomError;
          if (customError.response) {
            const statusCode = customError.response.status;
            console.log('Erro ao fazer login. Código de status:', statusCode);
            if (statusCode === 401) {
              count = MAX_RETRIES;
              setIsPopupValue(null);
              setInvalidCredentials('Credenciais inválidas');
              return;
            }
          } else {
            console.error('Erro desconhecido:', error);
          }
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
        if (count + 1 === MAX_RETRIES) {
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
