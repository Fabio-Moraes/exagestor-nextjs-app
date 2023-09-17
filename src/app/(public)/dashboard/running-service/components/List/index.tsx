'use client';

import Cookie from 'js-cookie';
import api from 'lib/api';

import { useEffect, useState } from "react";
import { Container, InfoContainer, ListContainer, ListItem, MenuContainer, Title } from './styles';

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

export function List() {
    const [services, setServices] = useState<Service[]>([]);
    const storedCookie = Cookie.get('auth_token');

    useEffect(() => {
        async function fetchServices() {
            try {
                const response = await api.get('/services', {
                    params: {
                        token: storedCookie,
                    }
                });

                setServices(response.data);
            } catch (error) {
                console.error('Erro ao recuperar serviços', error);
            }
        }

        fetchServices();
    }, []);

    return (
        <Container>
            <Title>Serviços</Title>
            <ListContainer>
                {services?.map((service) => {
                    const now = new Date(service.created_at);
                    const year = now.getFullYear();
                    const month = (now.getMonth() + 1).toString().padStart(2, '0');
                    const day = now.getDate().toString().padStart(2, '0');
                    const hours = now.getHours().toString().padStart(2, '0');
                    const minutes = now.getMinutes().toString().padStart(2, '0');
                    const seconds = now.getSeconds().toString().padStart(2, '0');

                    const createdAt = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
                    return (
                        <ListItem key={String(service.id)}>
                            <InfoContainer>
                                <div>
                                    <p>Solicitante: {service.name}</p>
                                    <p>Cidade: {service.city}</p>
                                    <p>Endereço de origem do serviço: {service.address}</p>
                                    <p>Nomenclatura de caixa ou cabo: {service.nomenclature}</p>
                                    <p>Classe: {service.classification}</p>
                                    <p>Protocolo: {service.protocol}</p>
                                    <p>Início: {createdAt}</p>
                                    <p>Status do serviço: Em andamento</p>
                                </div>
                            </InfoContainer>

                            <MenuContainer>
                                {/* <button>Detalhes</button> */}
                                <button>Finalizar</button>
                                <button>Pausar</button>
                                <button>Cancerlar</button>
                            </MenuContainer>
                        </ListItem>
                    )
                }).reverse()}
            </ListContainer>
        </Container>
    );
}
