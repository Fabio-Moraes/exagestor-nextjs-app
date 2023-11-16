'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';

import { FullScreenLoading } from 'components/FullScreenLoading';
import { Modal } from 'components/Modal';

import alertSvg from './assets/svg/alert.svg';
import checkedSvg from './assets/svg/checked.svg';
import { Button, Container, FormContainer, Input, Title } from './styles';

import Cookie from 'js-cookie';
import api from 'lib/api';

export default function NewRegister() {
  const [cnpj, setCnpj] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');

  const [modalValue, setModalValue] = useState('');
  const [iconSvgModal, setIconSvgModal] = useState(alertSvg);
  const [fullScreenLoadingValue, setFullScreenLoadingValue] = useState('');

  const [successfullyCompleted, setSuccessfullyCompleted] = useState(false);

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

  const handleCnpj = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const formattedCnpj = value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2');
    setCnpj(formattedCnpj.trim());
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

      if (cnpj.trim() === '') {
        setModalValue('Informe o CNPJ do funcionário.');
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

          const storedCookie = Cookie.get('auth_token');

          const response = await api.post('/api/admin/register', {
            name: name,
            password: password,
            cnpj: cnpj,
            token: storedCookie
          });

          const { success } = response.data;

          if (success) {
            setSuccessfullyCompleted(true);
            setFullScreenLoadingValue('');
            setIconSvgModal(checkedSvg);
            setModalValue('Novo funcionário(a) registrado com sucesso.');

            await new Promise((resolve) => setTimeout(resolve, 1000));
            router.push('/dashboard/admin/running');
            return;
          } else {
            console.error('Erro:', response.data.error);
          }
        } catch (error) {
          console.error('Erro na requisição POST:', error);
        }

        retryCount++;
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

        <label htmlFor="CNPJ">Cnpj</label>
        <Input
          type="text"
          maxLength={18}
          placeholder="Cnpj"
          value={cnpj}
          onChange={handleCnpj}
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

        <Button type="submit">Registrar</Button>
      </FormContainer>

      {modalValue && !fullScreenLoadingValue && (
        <Modal icon={iconSvgModal} message={modalValue} />
      )}
      {fullScreenLoadingValue && <FullScreenLoading message={fullScreenLoadingValue} />}
    </Container>
  );
}
