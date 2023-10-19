'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

import Cookie from 'js-cookie';
import api from 'lib/api';

import ListItem from '../ListItem';

import searchSvg from './assets/svg/search.svg';

import { Button, ListContainer, SearchBar, SearchWrapper } from './styles';

interface ListProps { id: string, description: string };

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

export function List({ service, items }: { service: Service, items: ListProps[] }) {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showSelected, setShowSelected] = useState<boolean>(false);


    const [connectionError, setConnectionError] = useState(false);
    const [isPopupValue, setIsPopupValue] = useState<string | null>(null);

    const storedCookie = Cookie.get('auth_token');
    const maxRetries = 4

    const router = useRouter();

    async function fetchConcludedServices() {
        setConnectionError(false);

        for (let count = 0; count < maxRetries; count++) {
            try {
                setIsPopupValue(count > 0
                    ? `Conectando<br>Tentativa (${count + 1})`
                    : 'Conectando'
                );

                const response = await api.get('/api/services/concluded-service', {
                    params: {
                        token: storedCookie,
                        protocol: service?.protocol,
                        serviceIds: selectedItems.join(',')
                    }
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

    const toggleItem = (item: string) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const filteredItems = items?.filter(item =>
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (showSelected ? selectedItems.includes(item.id) : true)
    );

    return (
        <ListContainer>
            <div>
                <SearchWrapper>
                    <Image priority src={searchSvg} alt="Book" width={25} height={25} />
                    <SearchBar
                        type="text"
                        placeholder="Pesquisar produto..."
                        autoFocus
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </SearchWrapper>
                <Button $path={showSelected} onClick={() => setShowSelected(!showSelected)}>
                    {showSelected ? 'Mostrar Todos' : `Filtrar Selecionado${selectedItems.length > 1 ? 's' : ''} (${selectedItems.length})`}
                </Button>
            </div>
            {filteredItems.map(item => (
                <ListItem
                    key={item.description}
                    item={item.description}
                    selected={selectedItems.includes(item.id)}
                    onSelect={() => toggleItem(item.id)}
                />
            ))}
            <div>
                <Button $path={showSelected} onClick={() => setShowSelected(!showSelected)}>
                    Voltar
                </Button>
                <Button $path={showSelected} onClick={() => fetchConcludedServices()}>
                    Concluir
                </Button>
            </div>
        </ListContainer>
    );
};