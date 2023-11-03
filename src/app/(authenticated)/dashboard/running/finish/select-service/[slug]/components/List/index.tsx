'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useState } from 'react';


import ListItem from '../ListItem';

import infoSvg from './assets/svg/info.svg';
import searchSvg from './assets/svg/search.svg';

import { encryptObject } from '../../../../../../../../../functions';

import { Button, ListContainer, SearchBar, SearchWrapper } from './styles';

import { useContexState } from '../../../../../../../../../hooks/useGlobalContext';

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
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showSelected, setShowSelected] = useState<boolean>(false);
    
    const { selectService, setSelectService } = useContexState();

    const router = useRouter();

    async function fetchConcludedServices() {
        const encryptSlug = encryptObject({ protocol: service?.protocol })
        router.push(`/dashboard/running/finish/select-material/${encryptSlug}`);
    }

    const toggleItem = (item: string) => {
        setSelectService(prevItems => {
            const protocolKey = String(service?.protocol);
        
           return { ...prevItems,
            [protocolKey]: {
                ...(prevItems[protocolKey] || {}),
                [item]: (prevItems[protocolKey]?.[item] || 0) + 1
            }}
        });
    };

    const toggleItemReset = (item: string) => {
        setSelectService(prevItems => {
            const updatedItems = { ...prevItems };
            const protocolKey = String(service?.protocol);
            const selectedItemsCount = Object.keys(updatedItems[protocolKey] || {}).length

            if (updatedItems[protocolKey].hasOwnProperty(item)) {
                selectedItemsCount > 1
                    ? delete updatedItems[protocolKey][item]
                    : delete updatedItems[protocolKey]
            }

            return updatedItems;
        });
    };

    const selectServiceClean = () => {
        setSelectService(prevItems => {
            const updatedItems = { ...prevItems };
            const protocolKey = String(service?.protocol);
    
            if (updatedItems.hasOwnProperty(protocolKey)) {
                delete updatedItems[protocolKey];
            }
    
            return updatedItems;
        });
    };

    const filteredItems = items?.filter(item =>
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (showSelected ? selectService[String(service?.protocol)][item.id] : true)
    );

    const selectedItemKeys = Object.keys(selectService[String(service?.protocol)] || {});
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
                        <Button onClick={() => setShowSelected(!showSelected)}>
                            {showSelected
                                ? 'Mostrar Todos'
                                : `Filtrar Selecionado${selectedItemKeys.length > 1 ? 's' : ''} (${selectedItemKeys.length})`}
                        </Button>

                        <Button onClick={selectServiceClean} >
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
                    count={selectService?.[String(service?.protocol)]?.[item.id]}
                    onSelect={() => toggleItem(item.id)}
                    onReset={() => toggleItemReset(item.id)}
                />
            ))}
            <div>
                <Button onClick={() => router.back()}>
                    Voltar
                </Button>
                <Button onClick={() => fetchConcludedServices()}>
                    Avançar
                </Button>
            </div>
        </ListContainer>
    );
};