'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { ChangeEvent, useEffect, useState } from 'react';

import Cookie from 'js-cookie';
import api from 'lib/api';

import { FullScreenLoading } from 'components/FullScreenLoading';
import { Footer } from '../Footer';

import alert from './assets/svg/alert.svg';
import exa from './assets/svg/exa_logo.svg';

import {
    Button,
    Container,
    ErrorSpan,
    FormContainer,
    Input
} from './styles';

interface CustomError extends Error {
    response?: {
        status: number;
    };
}

const MAX_RETRIES = 4;

export const Form = () => {
    const [cnpj, setCnpj] = useState('');
    const [password, setPassword] = useState('');
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
    Cookie.remove('auth_token');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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

        if (cnpj.length < 18 || password.length < 1) {
            setInvalidCredentials('Credenciais inválidas');
            return;
        }

        for (let count = 0; count < MAX_RETRIES; count++) {
            try {
                setIsPopupValue(count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando');
                const response = await api.post('/api/auth/signin', { cnpj, password });
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
                {invalidCredentials && (
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
                    </ErrorSpan>
                )}
            </Container>
            {isPopupValue && <FullScreenLoading message={isPopupValue} />}
        </>
    );
};