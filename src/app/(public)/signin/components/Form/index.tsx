'use client';

import Cookie from 'js-cookie';
import api from 'lib/api';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { Footer } from '../Footer';

import { Player } from '@lottiefiles/react-lottie-player';
import * as animationData from './assets/lottie/animation.json';

import alert from './assets/svg/alert.svg';
import exa from './assets/svg/exa_logo.svg';

import {
  Button,
  Container,
  ErrorSpan,
  FormContainer,
  Input
} from './styles';

export const Form = () => {
  const [cnpj, setCnpj] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState('');

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
  Cookie.remove('auth_token'); // Remove token inválido

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const formattedCnpj = value
      .replace(/\D/g, '') // Remove tudo que não é dígito
      .replace(/^(\d{2})(\d)/, '$1.$2') // Coloca ponto entre o segundo e o terceiro dígitos
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3') // Coloca ponto entre o quinto e o sexto dígitos
      .replace(/\.(\d{3})(\d)/, '.$1/$2') // Coloca barra entre o oitavo e o nono dígitos
      .replace(/(\d{4})(\d)/, '$1-$2'); // Coloca hífen depois do bloco de quatro dígitos
    setCnpj(formattedCnpj.trim());
  };

  const delay = (amount = 750) => new Promise(resolve => setTimeout(resolve, amount));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cnpj === '' || password === '') {
      setInvalidCredentials('Credenciais inválidas');
      return;
    }

    setLoading(true);

    try {
      // Chamar a API para fazer o login e obter o token JWT
      const response = await api.post('/api/auth/signin', { cnpj, password });

      if (response.status === 200) {
        const { token } = response.data;
        // Armazenar o token JWT no cookie
        Cookie.set('auth_token', token, { expires: 7, path: '/' })
        router.refresh();

      } else {
        await delay()
        setLoading(false)
        setInvalidCredentials('Credenciais inválidas');

      }
    } catch (error) {
      await delay()
      setLoading(false)
      setInvalidCredentials('Credenciais inválidas');
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <Container>
      {invalidCredentials &&
        <ErrorSpan>
          <div>
            <Image
              priority
              src={alert}
              alt="Book"
              width={55}
              height={55}
            />
          </div>
          <span dangerouslySetInnerHTML={{ __html: invalidCredentials }} />
        </ErrorSpan>}
      {loading && <div>
        <div>
          <Player
            src={animationData}
            loop
            autoplay
            speed={1.5}
            style={{ height: '100px', width: '100px' }}
          />
        </div>
      </div>}
      <FormContainer onSubmit={handleSubmit}>
        <div>
          <Image
            priority
            src={exa}
            alt="Book"
            width={30}
            height={30}
            style={{ marginRight: 5 }}
          />
          <strong>Exa Telecom</strong>
        </div>

        <Input
          type="text"
          maxLength={18}
          placeholder="CNPJ"
          value={cnpj}
          onChange={handleChange} />

        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value.trim())} />

        <Button type="submit">Entrar</Button>
        <Footer />
      </FormContainer >
    </Container>
  );
};