'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';

import { FullScreenLoading } from 'components/FullScreenLoading';
import { Modal } from 'components/Modal';
import { TimedWait } from 'functions/TimedWait';
import { internalApi } from 'services/apiAxios';

import alertSvg from './_assets/svg/alert.svg';
import checkedSvg from './_assets/svg/checked.svg';

import * as S from './styles';

export function RegisterEmployee() {
  const [identification, setIdentification] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [cpfOrCnpj, setCpfOrCnpj] = useState('CNPJ');
  const [name, setName] = useState('');
  const [accountType, setAccountType] = useState('TEC');

  const [modalValue, setModalValue] = useState('');
  const [iconSvgModal, setIconSvgModal] = useState(alertSvg);
  const [isPopupValue, setIsPopupValue] = useState('');

  const [successfullyCompleted, setSuccessfullyCompleted] = useState(false);

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
    setName(e.target.value);
  };

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

      if (name.trim() === '') {
        setModalValue('Informe o nome do funcionário.');
        return;
      }

      if (!validateName(name)) {
        setModalValue('O nome não pode conter números ou caracteres inválidos.');
        return;
      }

      if (identification.trim() === '') {
        setModalValue(`Informe o ${cpfOrCnpj} do funcionário.`);
        return;
      }

      if (identification.trim().length < (cpfOrCnpj === 'CPF' ? 14 : 18)) {
        setModalValue(`${cpfOrCnpj} inválido.`);
        return;
      }

      if (password.trim() === '' || passwordCheck.trim() === '') {
        setModalValue('Informe a senha');
        return;
      }

      if (password.trim() !== passwordCheck.trim()) {
        setModalValue('Senha não conferem');
        return;
      }

      for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
        try {
          setIsPopupValue(generateConnectingMessage(retryCount));

          const response = await internalApi.post('/api/bridge', {
            baseURL: '/api/superadmin/register-employee',
            name: name,
            password: password,
            identification: identification,
            accountType: accountType
          });

          const { status } = response.data;

          if (status === 'already registered') {
            setIsPopupValue('');
            setModalValue(
              `Funcionário(a) do <br>${cpfOrCnpj} ${identification} já existente.`
            );
            break;
          }

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
          placeholder="Nome completo"
          value={name}
          onChange={handleName}
        />

        <div>
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
        </div>
        <S.Input
          type="numeric"
          placeholder={`${cpfOrCnpj}`}
          value={identification}
          onChange={cpfOrCnpj === 'CNPJ' ? handleChangeCnpj : handleChangeCpf}
        />
        <S.Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value.trim())}
        />
        <S.Input
          type="password"
          placeholder="Confirme a senha"
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value.trim())}
        />

        <div>
          <S.CheckboxButton
            type="button"
            $checked={accountType === 'TEC'}
            onClick={() => {
              setAccountType('TEC');
            }}
          >
            <div />
            <span>TEC</span>
          </S.CheckboxButton>

          <S.CheckboxButton
            type="button"
            $checked={accountType === 'ADMIN'}
            onClick={() => {
              setAccountType('ADMIN');
            }}
          >
            <div />
            <span>ADMIN</span>
          </S.CheckboxButton>

          <S.CheckboxButton
            type="button"
            $checked={accountType === 'ALMOX'}
            onClick={() => {
              setAccountType('ALMOX');
            }}
          >
            <div />
            <span>ALMOX</span>
          </S.CheckboxButton>

          <S.CheckboxButton
            type="button"
            $checked={accountType === 'COP'}
            onClick={() => {
              setAccountType('COP');
            }}
          >
            <div />
            <span>COP</span>
          </S.CheckboxButton>
        </div>

        <S.Button type="submit">Registrar</S.Button>
      </S.FormContainer>

      {modalValue && !isPopupValue && <Modal icon={iconSvgModal} message={modalValue} />}
      {isPopupValue && <FullScreenLoading message={isPopupValue} />}
    </>
  );
}
