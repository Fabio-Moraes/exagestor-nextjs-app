'use client';

import { useState } from 'react';

import Cookie from 'js-cookie';
import api from 'lib/api';

import { ButtonFinish, Container } from './styles';

import { encryptObject } from '../../../../../../functions';

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
    /* eslint-disable */
    const [connectionError, setConnectionError] = useState(false);
    const [isPopupValue, setIsPopupValue] = useState<string | null>(null);
    /* eslint-enable */

    const storedCookie = Cookie.get('auth_token');
    const maxRetries = 4;

    async function fetchStatusServices() {
        setConnectionError(false);

        for (let count = 0; count < maxRetries; count++) {
            try {
                setIsPopupValue(
                    count > 0
                        ? `Conectando<br>Tentativa (${count + 1})`
                        : 'Conectando'
                );

                const response = await api.get(
                    `/api/services/${
                        service?.status === 'active' ? 'pause' : 'start'
                    }`,
                    {
                        params: {
                            token: storedCookie,
                            protocol: service?.protocol
                        }
                    }
                );

                count = maxRetries;
                location.reload();
                console.log(response.data);
            } catch (error) {
                await new Promise((resolve) => setTimeout(resolve, 5000));
                setConnectionError(true);
            }
        }
        setIsPopupValue(null);
    }

    async function fetchCancelServices() {
        setConnectionError(false);

        for (let count = 0; count < maxRetries; count++) {
            try {
                setIsPopupValue(
                    count > 0
                        ? `Conectando<br>Tentativa (${count + 1})`
                        : 'Conectando'
                );

                const response = await api.get('/api/services/cancel', {
                    params: { token: storedCookie, protocol: service?.protocol }
                });

                count = maxRetries;
                location.reload();
                console.log(response.data);
            } catch (error) {
                await new Promise((resolve) => setTimeout(resolve, 5000));
                setConnectionError(true);
            }
        }
        setIsPopupValue(null);
    }

    const encryptSlug = encryptObject({ protocol: service?.protocol });

    return (
        <Container>
            <ButtonFinish
                href={`/dashboard/running/finish/select-service/${encryptSlug}`}
            >
                <span>Finalizar</span>
            </ButtonFinish>
            <button onClick={() => fetchStatusServices()}>
                {service?.status !== 'active' ? 'Retomar' : 'Pausar'}
            </button>
            <button onClick={() => fetchCancelServices()}>Cancerlar</button>
        </Container>
    );
}
