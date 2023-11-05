'use client';

import { useRouter } from 'next/navigation';

import { Button, Container, Title, Wrapper } from './styles';

export default function Details() {
    const router = useRouter();

    return (
        <Container>
            <Title>Detalhes</Title>
            <Wrapper>
                <p></p>
                <div>
                    <p>Solicitante</p>
                    <p>Cidade</p>
                    <p>Protocolo</p>
                    <p>Início </p>
                    <p>Status do serviço</p>
                </div>

                <Button onClick={() => router.back()}>
                    <p>Voltar</p>
                </Button>
            </Wrapper>
        </Container>
    );
}
