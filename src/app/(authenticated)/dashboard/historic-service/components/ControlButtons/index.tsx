'use client';

import { useState } from 'react';

import Cookie from 'js-cookie';
import api from 'lib/api';

import { useRouter } from 'next/navigation';
import { ButtonFinish, Container } from './styles';

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

export function ControlButtons({ service }: { service: Service }) {
    const [connectionError, setConnectionError] = useState(false);
    const [isPopupValue, setIsPopupValue] = useState<string | null>(null);

    const storedCookie = Cookie.get('auth_token');
    const maxRetries = 4

    const router = useRouter();

    async function fetchStatusServices() {
        setConnectionError(false);

        for (let count = 0; count < maxRetries; count++) {
            try {
                setIsPopupValue(count > 0
                    ? `Conectando<br>Tentativa (${count + 1})`
                    : 'Conectando'
                );

                const response = await api.get(`/api/services/${service?.status === 'active' ? 'pause-service' : 'start-service'}`, {
                    params: { token: storedCookie, protocol: service?.protocol }
                });

                count = maxRetries;
                router.push('/dashboard/new-service');
                console.log(response.data);
            } catch (error) {
                await new Promise((resolve) => setTimeout(resolve, 5000));
                setConnectionError(true);
            }
        }
        setIsPopupValue(null);
    }

    return (
        <Container>
            <ButtonFinish href={`/dashboard/finish-service/${service?.protocol}`}><span>Finalizar</span></ButtonFinish>
            <button onClick={() => fetchStatusServices()}>{service?.status !== 'active' ? 'Retomar' : 'Pausar'}</button>
            <button>Cancerlar</button>
        </Container>
    )
}