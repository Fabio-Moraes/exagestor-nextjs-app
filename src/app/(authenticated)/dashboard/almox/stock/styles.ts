'use client';

import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  border-radius: 7px;
  font-family: 'OpenSans-SemiBold';
  color: #333;

  @media (min-width: 550px) {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    height: 40px;
    line-height: 40px;
    background-image: linear-gradient(to left, #8bc9a8, #dce6dc);
    color: #000;
  }
`;

export const Form = styled.div`
  margin-bottom: 20px;
`;

export const InputLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Input = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const AddButton = styled.button`
  width: 100%;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;

export const CheckboxButton = styled.button<{ $checked: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0px 10px 10px 20px;

  > div {
    width: 20px;
    height: 20px;
    border: 2px solid #27a567;
    background-color: ${({ $checked }) => ($checked ? '#27a567' : '#fff')};
    border-radius: 10px;
  }
  > span {
    margin-left: 5px;
    font-size: 14px;
  }
`;

export const TableHeader = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 2px solid #000;
  background-color: #8bc9a8;
  padding: 10px 0;
  width: 100%;

  div {
    min-width: 67px;
    border-left: 2px solid #000;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    > span {
      width: 100%;
      font-family: 'OpenSans-Bold';
      font-size: 13px;
    }
  }

  > div:first-child {
    width: 100%;
    padding: 5px 10px;
    border-left: 0;
    text-align: start;
  }
`;

export const TableRow = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: row;
  border-bottom: 2px solid #000;
  background-color: ${({ isSelected }) => (isSelected ? '#e9c80f' : '#ffffff')};
  padding: 10px 0;
  width: 100%;

  > div {
    min-width: 67px;
    border-left: 2px solid #000;
    display: flex;
    justify-content: center;
    align-items: center;

    > span {
      width: 100%;
      font-family: 'OpenSans-SemiBold';
      font-size: 13px;
    }
  }

  > div:first-child {
    width: 100%;
    padding: 5px 10px;
    border-left: 0;
    text-align: start;
  }
`;

export const Table = styled.div`
  border: 2px solid #000;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  > div:last-child {
    border-bottom: 0;
  }
`;

export const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  > span {
    text-align: left;
    font-size: 17px;
    color: #333;
  }

  > button {
    width: 150px;
    background-color: #27a567;
    padding: 10px;
    margin: 20px 20px;
    border: 1px solid #000000;
    border-radius: 7px;
    font-size: 16px;
    color: #fff;
  }
`;
