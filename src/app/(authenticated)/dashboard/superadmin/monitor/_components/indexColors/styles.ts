import styled from 'styled-components';

export const Table = styled.table`
  min-width: 35%;
  border-collapse: collapse;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const TableCell = styled.td`
  padding: 5px;
  border: 1px solid #ddd;
  text-align: left;
  font-size: 1.2rem;
`;

export const ColorBox = styled.div<{ color: string }>`
  background-color: ${({ color }) => color};
  color: white;
  padding: 5px;
  border-radius: 3px;
  text-align: center;
  font-weight: bold;
`;
