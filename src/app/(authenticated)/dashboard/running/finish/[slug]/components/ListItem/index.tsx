'use client';

import React from 'react';

import { ItemContainer } from './styles';

interface ListItemProps {
    item: string;
    count: number;
    onSelect: () => void;
}

const ListItem: React.FC<ListItemProps> = ({ item, count = 0, onSelect }) => {
    return <ItemContainer selected={Boolean(count > 0)} onClick={onSelect}><span>{count}</span><p>{item}</p></ItemContainer>;
};

export default ListItem;
