'use client';

import { useEffect, useState } from "react";

import {
    Container,
    ListContainer,
    ListItem,
    Title
} from './styles';

import Cookie from 'js-cookie';
import api from 'lib/api';

import { ControlButtons } from './components/ControlButtons';
import { DisplayInfo } from './components/DisplayInfo';

import { Spinner } from 'components/Spinner';

interface Service {
    id: number;
    name: string;
    city: string;
    address: string;
    nomenclature: string;
    classification: string;
    created_at: string;
    protocol: string;
}

export default function RunningService() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const storedCookie = Cookie.get('auth_token');

    useEffect(() => {
        async function fetchServices() {
            try {
                const response = await api.get('/services', {
                    params: { token: storedCookie }
                });

                setServices(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error('Erro ao recuperar serviços', error);
            }
        }

        fetchServices();
    }, []);


    return (
        <Container>
            <Title>Serviços</Title>
            <ListContainer>
                {services.map((service) => (
                    <ListItem key={service.id}>
                        <DisplayInfo service={service} />
                        <ControlButtons />
                    </ListItem>
                )).reverse()}
            </ListContainer>
            <Spinner active={loading} />
        </Container>
    );
}
