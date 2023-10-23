'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

import Cookie from 'js-cookie';
import api from 'lib/api';

import ListItem from '../ListItem';

import infoSvg from './assets/svg/info.svg';
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
    const [selectedItems, setSelectedItems] = useState<{ [key: string]: number }>({});
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
                        serviceIds: ''
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
        setSelectedItems((prevItems) => ({
            ...prevItems,
            [item]: prevItems[item] ? prevItems[item] + 1 : 1
        }));
    };

    const filteredItems = items?.filter(item =>
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (showSelected ? selectedItems[item.id] : true)
    );

    useEffect(() => {
        console.log(selectedItems)
    }, [selectedItems])


    const selectedItemKeys = Object.keys(selectedItems);
    const proportion = { width: 30, height: 30 };

    return (
        <ListContainer>
            <div>
                <SearchWrapper>
                    <Image priority src={searchSvg} alt="Book" width={25} height={25} />
                    <SearchBar
                        type="text"
                        placeholder="Pesquisar serviço..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </SearchWrapper>
                <div>
                    <div>
                        <Button $path={showSelected} onClick={() => setShowSelected(!showSelected)}>
                            {showSelected
                                ? 'Mostrar Todos'
                                : `Filtrar Selecionado${selectedItemKeys.length > 1 ? 's' : ''} (${selectedItemKeys.length})`}
                        </Button>

                        <Button $path={showSelected} onClick={() => setSelectedItems({})}>
                            Limpar
                        </Button>
                    </div>
                    <Image priority src={infoSvg} alt="Add" {...proportion} />
                </div>
            </div>
            {filteredItems.map(item => (
                <ListItem
                    key={item.description}
                    item={item.description}
                    count={selectedItems[item.id]}
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