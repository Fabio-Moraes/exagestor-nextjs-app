'use client';

import styled from 'styled-components';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;

  > div {
    display: flex;
    align-items: center;
    margin: 20px 0px 0px 0px;
  }

  > label {
    overflow-wrap: break-word;
    margin: 15px 20px 0px 20px;
    text-align: start;
  }
`;

export const Input = styled.input`
  padding: 10px;
  margin: 0px 20px;
  border: 1px solid #000000;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #777;
  }
`;

export const Select = styled.select`
  padding: 10px;
  margin: 0px 20px;
  border: 1px solid #000000;
  border-radius: 4px;
  font-size: 16px;
  color: #777;

  &:focus {
    outline: none;
  }
`;

export const Option = styled.option`
  background-color: #fff;
  color: #777;
`;

export const CheckboxButton = styled.button<{ $checked: number }>`
  display: flex;
  align-items: center;
  margin: 0px 30px 0px 20px;
  border: 1px solid #000000;
  padding: 8px 10px;
  border-radius: 4px;
  cursor: pointer;

  > div {
    width: 20px;
    height: 20px;
    border: 2px solid #27a567;
    background-color: ${({ $checked }) => ($checked === 1 ? '#27a567' : '#fff')};
    border-radius: 10px;
  }

  > span {
    margin-left: 5px;
    font-size: 14px;
  }
`;

export const Button = styled.button`
  width: 150px;
  background-color: #27a567;
  padding: 10px;
  margin: 20px 20px;
  border: 1px solid #000000;
  border-radius: 4px;
  font-size: 16px;
  color: #fff;
`;
