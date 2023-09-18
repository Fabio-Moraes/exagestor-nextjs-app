'use client';

import styled, { keyframes } from 'styled-components';

export const FixedBlock = styled.div`
  z-index: 1001;
  background-color: rgba(0,0,0,.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const ErrorSpan = styled.span`
  display: flex;
  z-index: 2000;
  background-image: linear-gradient(to top, #3f795e, rgba(63, 121, 94, 0.9));
  position: fixed;
  text-align: center;
  top: 50%;
  left: 50%;
  border: 2px solid #000000;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.3s ease-in-out;

  align-items: center;
  justify-content: center;
  flex-direction: column;

  > div {
    padding-top: 10px;
  }

  > span {
    white-space: nowrap;
    color: #fff;
    padding: 0px 10px 10px 10px;
    font-weight: 400;
  }
`;

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
