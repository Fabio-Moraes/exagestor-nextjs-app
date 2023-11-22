'use client';

import styled from 'styled-components';

export const ListContainer = styled.div`
  margin-top: 20px;
  background-color: #dce6dc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 2px solid #3f795e;

  justify-content: center;
  align-items: center;

  > div:first-child {
    display: flex;
    margin: 8px;
    background-color: #fff;
    border-radius: 5px;

    border: 2px solid #3f795e;

    justify-content: space-between;
    align-items: center;

    > button {
      width: 130px;
    }
  }

  > div:last-child {
    display: flex;
    padding: 10px;
    background-color: #3f795e;

    justify-content: space-between;
    align-items: center;

    > button {
      width: 100px;
    }
  }
`;

export const Button = styled.button`
  display: block;
  align-items: center;
  flex-shrink: 0;
  padding: 10px;
  border-radius: 5px;
  width: 180px;
  background-color: #fff;
  border: 2px solid #27a567;
  cursor: pointer;
`;

export const InputContainer = styled.div`
  margin-bottom: 20px;
`;

export const Input = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  resize: none;

  font-size: 16px;
  font-family: Arial, sans-serif;
  color: black; /* Cor do texto */
  position: relative;
  outline: none;
  overflow-y: auto;
`;

export const ContainerCounter = styled.div`
  display: flex;
  padding-right: 10px;

  align-items: center;
  justify-content: flex-end;

  > p {
    text-align: end;
    margin-bottom: 7px;
  }
`;

export const SkaletonInput = styled.div`
  min-width: 100%;
  min-height: 150px;
  padding: 10px;
  resize: none;
  position: relative;
  overflow-y: auto;
`;
