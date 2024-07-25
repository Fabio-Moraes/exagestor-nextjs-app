'use client';

import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';

import { FullScreenLoading } from 'components/FullScreenLoading';
import Image from 'components/Vercel/Image';
import { HandleLogout } from 'functions/HandleLogout';
import { internalApi } from 'services/apiAxios';

import alert from './_assets/svg/alert.svg';
import eyeClosed from './_assets/svg/eye-closed-.svg';
import eyeOpen from './_assets/svg/eye-open.svg';
//import exa from 'app/_assets/svg/brand_logo.svg';

import * as S from './styles';

interface CustomError extends Error {
  response?: {
    status: number;
  };
}

const maxRetries = 4;
const reconnectDelay = 3000;

export const Form = () => {
  const [identification, setIdentification] = useState('');
  const [cpfOrCnpj, setCpfOrCnpj] = useState('CPF');
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

  const handleChangeCnpj = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const formattedCnpj = value
      .replace(/[^\d]/g, '')
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
      .replace(/[^\d]/g, '')
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
        setIsPopupValue(
          retryCount > 0 ? `Conectando<br>Tentativa (${retryCount + 1})` : 'Conectando'
        );

        await internalApi.post('/api/signin', {
          identification: identification,
          password: password
        });

        window.location.reload();
        break;
      } catch (error: unknown) {
        if (error instanceof Error) {
          const customError = error as CustomError;
          if (customError.response) {
            const statusCode = customError.response.status;

            if (statusCode === 403) {
              HandleLogout();
              break;
            }

            if (statusCode === 401) {
              setIsPopupValue(null);
              setInvalidCredentials('Credenciais inválidas');
              break;
            }

            if (statusCode === 403) {
              setIsPopupValue(null);
              setInvalidCredentials('Conta bloqueada');
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
      <S.Container>
        <S.FormContainer onSubmit={handleSubmit}>
          {/*
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
            <strong>GESTOR</strong>
          </div>
          */}

          <div>
            <S.CheckboxButton
              type="button"
              $checked={cpfOrCnpj === 'CPF'}
              onClick={() => {
                setIdentification('');
                setCpfOrCnpj('CPF');
              }}
            >
              <div />
              <span>Física</span>
            </S.CheckboxButton>

            <S.CheckboxButton
              type="button"
              $checked={cpfOrCnpj === 'CNPJ'}
              onClick={() => {
                setIdentification('');
                setCpfOrCnpj('CNPJ');
              }}
            >
              <div />
              <span>Jurídica</span>
            </S.CheckboxButton>
          </div>

          <S.Input
            type="numeric"
            placeholder={`${cpfOrCnpj}`}
            value={identification}
            onChange={cpfOrCnpj === 'CNPJ' ? handleChangeCnpj : handleChangeCpf}
          />

          <S.PasswordInputContainer>
            <S.PasswordInput
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value.trim())}
            />
            <S.TogglePasswordVisibilityButton
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
            </S.TogglePasswordVisibilityButton>
          </S.PasswordInputContainer>

          <S.Button type="submit">Entrar</S.Button>
        </S.FormContainer>
        {invalidCredentials && (
          <S.ErrorSpan>
            <div>
              <Image priority src={alert} alt="Book" width={55} height={55} />
            </div>
            <span
              dangerouslySetInnerHTML={{
                __html: invalidCredentials
              }}
            />
          </S.ErrorSpan>
        )}
      </S.Container>
      {isPopupValue && <FullScreenLoading message={isPopupValue} />}
    </>
  );
};
