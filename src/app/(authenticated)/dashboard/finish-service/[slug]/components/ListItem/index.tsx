'use client';

import React from 'react';

import { ItemContainer } from './styles';

interface ListItemProps {
    item: string;
    selected: boolean;
    onSelect: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ item, selected, onSelect }) => {
    return <ItemContainer selected={selected} onClick={onSelect}>{item}</ItemContainer>;
};

export default ListItem;
