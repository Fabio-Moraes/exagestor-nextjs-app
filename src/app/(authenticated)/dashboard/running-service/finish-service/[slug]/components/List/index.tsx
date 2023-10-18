'use client';

import React, { useState } from 'react';
import ListItem from '../ListItem';

import Image from 'next/image';
import searchSvg from './assets/svg/search.svg';

import { Button, ListContainer, SearchBar, SearchWrapper } from './styles';

interface ListProps {
    items: { id: string, description: string }[];
}

const List: React.FC<ListProps> = ({ items }) => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showSelected, setShowSelected] = useState<boolean>(false);

    const toggleItem = (item: string) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
    };

    const filteredItems = items.filter(item =>
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
                <Button $path={showSelected} onClick={() => console.log(selectedItems)}>
                    Concluir
                </Button>
            </div>
        </ListContainer>
    );
};

export default List;
