'use client'

import Cookie from 'js-cookie';
import api from 'lib/api';

import { FullScreenLoading } from 'components/FullScreenLoading';
import { useEffect, useState } from 'react';
import { List } from './components/List';

import { Container, ErrorContainer, Title } from './styles';

const data = [
    { id: '0', description: '1.11-ADQ DE POSTES (EQPTOS MEC NO POSTE)' },
    { id: '1', description: '1.12-READQ DE POSTES (EQPTOS MEC NO POSTE)' },
    { id: '2', description: '1.13-LANÇ DE CORD' },
    { id: '3', description: '1.14-RETENC CORD/ CBS' },
    { id: '4', description: '1.15-RET CORD DO POSTE' },
    { id: '5', description: '10.11-MANUT PODA DE GALHOS COM REMOCAO-F' },
    { id: '6', description: '10.21-MANUT CAPINA LIMPZ SOBRE TAMP DE C' },
    { id: '7', description: '10.23-MANUT CAPINA DE POSTE RAIO = 2,0M-' },
    { id: '8', description: '10.24-MANUT CAPINA DE MARCO DIÂMTR DE 2.0M' }
];

const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

interface SlugType {
    params: {
        slug: string;
    }
}

interface Service {
    id: number;
    client_name: string;
    city: string;
    address: string;
    nomenclature: string;
    classification: string;
    status: string;
    update_count: number;
    created_at: string;
    protocol: string;
}

export default function FinishService({ params }: SlugType) {
    const [services, setServices] = useState<Service[]>([]);
    const [connectionError, setConnectionError] = useState(false);
    const [isPopupValue, setIsPopupValue] = useState<string | null>(null);

    const storedCookie = Cookie.get('auth_token');
    const maxRetries = 4

    async function fetchServices() {
        setConnectionError(false);

        for (let count = 0; count < maxRetries; count++) {
            try {
                setIsPopupValue(count > 0
                    ? `Conectando<br>Tentativa (${count + 1})`
                    : 'Conectando'
                );

                const response = await api.get('/api/services/finish-service', {
                    params: { token: storedCookie, protocol: params.slug }
                });

                count = maxRetries;
                setServices(response.data);
            } catch (error) {
                await new Promise((resolve) => setTimeout(resolve, 5000));
                setConnectionError(true);
            }
        }
        setIsPopupValue(null);
    }

    useEffect(() => {
        fetchServices();
    }, []);

    return (
        <Container>
            <Title>
                <h1>Finalizar Serviço</h1>
                <span>PROTOCOLO: {services[0]?.protocol}</span>
            </Title>
            {false && <FullScreenLoading message={'isPopupValue'} />}
            {connectionError ? (
                <ErrorContainer>
                    <span>
                        Não foi possível finalizar o serviço devido a
                        instabilidade na conexão. Por favor, tente novamente.
                    </span>
                </ErrorContainer>
            ) : <List items={data} service={services[0]} />}
        </Container>
    );
}