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

export const ItemList = styled.div``;

export const Table = styled.div`
  border: 2px solid #000;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  > div:first-child {
    display: flex;
    flex-direction: row;
    border-bottom: 2px solid #000;

    > div:first-child {
      width: 100%;
      background-color: #8bc9a8;
      border-left: 0;
      align-items: center;
      text-align: center;
      padding: 10px;

      > span {
        font-family: 'OpenSans-SemiBold';
        font-size: 15px;
      }
    }

    > div {
      min-width: 63px;
      padding: 10px;
      border-left: 2px solid #000;
      background-color: #8bc9a8;
      text-align: center;

      > span {
        font-family: 'OpenSans-SemiBold';
        font-size: 15px;
      }
    }
  }

  > div {
    display: flex;
    flex-direction: row;
    border-bottom: 2px solid #000;

    > div:first-child {
      font-family: 'OpenSans-SemiBold';
      width: 100%;
      padding: 5px;
      text-align: start;
      font-size: 13px;
      border-left: 0;

      > span {
        text-align: start;
        font-size: 13px;
      }
    }

    div {
      min-width: 63px;
      border-left: 2px solid #000;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      > span {
        font-family: 'OpenSans-SemiBold';
        font-size: 13px;
      }
    }
  }

  > div:last-child {
    border-bottom: 0;
  }
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
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
