'use client';

import Cookie from 'js-cookie';
import api from 'lib/api';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { Footer } from '../Footer';


import { FullScreenLoading } from 'components/FullScreenLoading';

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
    //const [loading, setLoading] = useState(false);
    const [invalidCredentials, setInvalidCredentials] = useState('');

    const [isPopupValue, setIsPopupValue] = useState<string | null>(null);

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

        const maxRetries = 4;

        for (let count = 0; count < maxRetries; count++) {
            try {
                setIsPopupValue(count > 0
                    ? `Conectando<br>Tentativa (${count + 1})`
                    : 'Conectando'
                );

                // Chamar a API para fazer o login e obter o token JWT
                const response = await api.post('/api/auth/signin', { cnpj, password });
                const { token } = response.data;

                              if (response.status === 200) {
                    // Armazenar o token JWT no cookie
                    count = maxRetries;
                    Cookie.set('auth_token', token, { expires: 7, path: '/' });
                    router.refresh();
                    return;
                }
                
                if (response.status === 401) {
                    count = maxRetries;
                    setIsPopupValue(null);
                    setInvalidCredentials('Credenciais inválidas');
                    return;
                }

                await new Promise((resolve) => setTimeout(resolve, 5000));

            } catch (error) {
                await new Promise((resolve) => setTimeout(resolve, 5000));
                setInvalidCredentials('Credenciais inválidas');
                console.error('Erro ao fazer login:', error);
            }
            setIsPopupValue(null);
        }
    };

    return (<>
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
            {/* {!loading && <div>
                <div>
                    <Player
                        src={animationData}
                        loop
                        autoplay
                        speed={1.5}
                        style={{ height: '100px', width: '100px' }}
                    />
                </div>
            </div>} */}
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
            {isPopupValue && <FullScreenLoading /* message={isPopupValue} */ />}
        </>
    );
};