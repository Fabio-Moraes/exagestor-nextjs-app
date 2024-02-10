'use client';
import React, { useState } from 'react';

import {
  AddButton,
  Container,
  Form,
  Input,
  InputLabel,
  ItemList,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Title
} from './styles';

type Item = {
  name: string;
  quantity: number;
  type: string;
};

export default function NewStock() {
  const [items, setItems] = useState<Item[]>([]);
  const [productName, setProductName] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);
  const [type, setType] = useState<string>('');

  const addItem = () => {
    if (productName && quantity > 0 && type) {
      const newItem: Item = {
        name: productName,
        quantity: quantity,
        type: type
      };
      setItems([...items, newItem]);
      setProductName('');
      setQuantity(0);
      setType('');
    } else {
      alert('Por favor, preencha todos os campos');
    }
  };

  return (
    <Container>
      <Title>Gerenciamento de Almoxarifado</Title>
      <Form>
        <InputLabel>Nome do Produto</InputLabel>
        <Input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <InputLabel>Quantidade</InputLabel>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
        <InputLabel>Tipo</InputLabel>
        <Input type="text" value={type} onChange={(e) => setType(e.target.value)} />
        <AddButton onClick={addItem}>Adicionar Item</AddButton>
      </Form>
      <ItemList>
        <Title>Itens no Almoxarifado</Title>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Nome</TableHeader>
              <TableHeader>Quantidade</TableHeader>
              <TableHeader>Tipo</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.type}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </ItemList>
    </Container>
  );
}
