'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';

import { FullScreenLoading } from 'components/FullScreenLoading';
import { Modal } from 'components/Modal';
import { useContexState } from 'hooks/useGlobalContext';
import apiRoute from 'services/apiRoute';

import alertSvg from './assets/svg/alert.svg';
import checkedSvg from './assets/svg/checked.svg';

import { Button, CheckboxButton, Container, FormContainer, Input, Title } from './styles';

export default function NewRegister() {
  const [identification, setIdentification] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [cpfOrCnpj, setCpfOrCnpj] = useState('CNPJ');
  const [name, setName] = useState('');

  const [modalValue, setModalValue] = useState('');
  const [iconSvgModal, setIconSvgModal] = useState(alertSvg);
  const [fullScreenLoadingValue, setFullScreenLoadingValue] = useState('');

  const [successfullyCompleted, setSuccessfullyCompleted] = useState(false);

  const { setConnectionWebsocketCount } = useContexState();

  const router = useRouter();

  const handleClickOutside = () => {
    if (modalValue !== '') {
      !fullScreenLoadingValue && setModalValue('');
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

      const maxRetries = 4;
      let retryCount = 0;

      while (retryCount < maxRetries) {
        try {
          setFullScreenLoadingValue(
            retryCount > 0 ? `Conectando<br>Tentativa (${retryCount + 1})` : 'Conectando'
          );

          const response = await apiRoute.post('/api/bridge', {
            baseURL: '/api/admin/register',
            name: name,
            password: password,
            identification: identification
          });

          const { status } = response.data;

          if (status === 'already registered') {
            setFullScreenLoadingValue('');
            setModalValue(
              `Funcionário(a) do <br>${cpfOrCnpj} ${identification} já existente.`
            );
            return;
          }

          if (status === 'success') {
            setSuccessfullyCompleted(true);
            setFullScreenLoadingValue('');
            setIconSvgModal(checkedSvg);
            setModalValue('Novo funcionário(a) registrado com sucesso.');

            await new Promise((resolve) => setTimeout(resolve, 1000));
            router.push('/dashboard/admin/running');
            return;
          }
        } catch (error) {
          console.error('Erro na requisição POST:', error);
        }

        retryCount++;
        setConnectionWebsocketCount((prevCount) => prevCount++);
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }

      setModalValue('Não foi possível registrar o funcionário(a) após várias tentativas.');
      setFullScreenLoadingValue('');
    }
  };

  return (
    <Container>
      <Title>Novo Funcionário(a)</Title>
      <FormContainer onSubmit={handleSubmit}>
        <label htmlFor="Nome completo">Nome completo:</label>
        <Input
          type="text"
          id="Nome"
          placeholder="Nome completo"
          value={name}
          onChange={handleName}
        />

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

        <label htmlFor="CNPJ">Cnpj</label>
        <Input
          type="numeric"
          placeholder={`${cpfOrCnpj}`}
          value={identification}
          onChange={cpfOrCnpj === 'CNPJ' ? handleChangeCnpj : handleChangeCpf}
        />

        <label htmlFor="Senha">Senha:</label>
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value.trim())}
        />

        <label htmlFor="Confirme a senha">Confirme a senha:</label>
        <Input
          type="password"
          placeholder="Confirme a senha"
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value.trim())}
        />

        <div>
          <CheckboxButton type="button" $checked={true} onClick={() => {}}>
            <div />
            <span>TEC</span>
          </CheckboxButton>

          <CheckboxButton type="button" $checked={false} onClick={() => {}}>
            <div />
            <span>DIR</span>
          </CheckboxButton>

          <CheckboxButton type="button" $checked={false} onClick={() => {}}>
            <div />
            <span>ALMOX</span>
          </CheckboxButton>

          <CheckboxButton type="button" $checked={false} onClick={() => {}}>
            <div />
            <span>COP</span>
          </CheckboxButton>
        </div>

        <Button type="submit">Registrar</Button>
      </FormContainer>

      {modalValue && !fullScreenLoadingValue && (
        <Modal icon={iconSvgModal} message={modalValue} />
      )}
      {fullScreenLoadingValue && <FullScreenLoading message={fullScreenLoadingValue} />}
    </Container>
  );
}
