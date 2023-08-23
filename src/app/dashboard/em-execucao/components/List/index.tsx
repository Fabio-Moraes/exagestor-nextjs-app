'use client';

import api from 'lib/api';
import { useEffect, useState } from "react";

interface Service {
    id: number;
    name: string;
}

export function List() {
    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        async function fetchServices() {
            try {
                const response = await api.get('/services');
                setServices(response.data);
            } catch (error) {
                console.error('Erro ao recuperar serviços', error);
            }
        }

        fetchServices();
    }, []);


    const servicesJSON = JSON.stringify(services);

    return (
        <div>
            <h1>Services List</h1>
            <ul>
                {services?.map((service) => {
                    return <li key={String(service.id)}>{service.name}</li>
                })}
            </ul>
        </div>
    )
}