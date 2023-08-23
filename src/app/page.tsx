'use client';
import { useRouter } from 'next/navigation';

import Cookie from 'js-cookie';
import { ChangeEvent, useState } from 'react';

import { Player } from '@lottiefiles/react-lottie-player';
import * as animationData from './animation.json';
;

import { Button, Container, Form, Input, Loading, Title } from './styles';

import api from 'lib/api';

export default function SignIn() {
  const [cnpj, setCnpj] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  Cookie.remove('auth_token');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const formattedCnpj = value
      .replace(/\D/g, '') // Remove tudo que não é dígito
      .replace(/^(\d{2})(\d)/, '$1.$2') // Coloca ponto entre o segundo e o terceiro dígitos
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3') // Coloca ponto entre o quinto e o sexto dígitos
      .replace(/\.(\d{3})(\d)/, '.$1/$2') // Coloca barra entre o oitavo e o nono dígitos
      .replace(/(\d{4})(\d)/, '$1-$2'); // Coloca hífen depois do bloco de quatro dígitos

    setCnpj(formattedCnpj);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Chamar a API para fazer o login e obter o token JWT
      const response = await api.post('/login', { cnpj, password });

      if (response.status === 200) {
        const { token } = response.data;
        // Armazenar o token JWT no cookie
        Cookie.set('auth_token', token, { expires: 7, path: '/' })
        router.refresh();

      } else {
        setLoading(false);
        console.log('Credenciais inválidas');
      }
    } catch (error) {
      setLoading(false);
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Exa Telecom</Title>
        <Input type="text" maxLength={18} placeholder="CNPJ" value={cnpj} onChange={handleChange} />
        <Input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
        {loading ? <Loading>
          <Player
            src={animationData}
            className="player"
            loop
            autoplay
            speed={2}
            style={{ height: '60px', width: '60px' }}
          />
        </Loading> : <Button type="submit">Entrar</Button>}
      </Form>
    </Container>
  );
};
