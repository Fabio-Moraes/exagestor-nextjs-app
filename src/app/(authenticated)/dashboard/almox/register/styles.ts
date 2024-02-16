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

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  border-radius: 7px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  background-color: #ffffff;
  padding-top: 15px;

  > div {
    display: flex;
    align-items: center;
  }

  > div:nth-last-child(2) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 10px;
  }

  > label {
    overflow-wrap: break-word;
    font-family: 'OpenSans-Medium';
    margin: 0px 20px 5px 20px;
    text-align: start;
  }

  > span:last-child {
    font-family: 'OpenSans-Medium';
    font-size: 13px;
    padding: 12px 0 10px 0;
  }
`;

export const Asterisk = styled.strong`
  color: red;
`;

export const Input = styled.input`
  padding: 10px;
  margin: 0px 20px 15px 20px;
  border: 1px solid #000000;
  border-radius: 4px;
  font-size: 16px;
  background-color: #fff;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #777;
  }
`;

export const CheckboxButton = styled.button<{ $checked: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0px 10px 13px 20px;

  > div {
    width: 20px;
    height: 20px;
    border: 2px solid #27a567;
    background-color: ${({ $checked }) => ($checked ? '#27a567' : '#fff')};
    border-radius: 10px;
  }

  > span {
    font-family: 'OpenSans-Medium';
    margin-left: 5px;
    font-size: 14px;
  }
`;

export const ContainerCounter = styled.div`
  display: flex;
  padding-right: 5px;
  width: 100%;
  justify-content: flex-end;

  > p {
    font-family: 'OpenSans-Medium';
    text-align: end;
  }
`;

export const ContainerObservation = styled.div`
  padding: 0 20px;
  flex-direction: column;
`;

export const Observation = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  resize: none;

  border-radius: 4px;
  border: 1px solid #000000;

  font-size: 16px;
  font-family: Arial, sans-serif;
  color: black; /* Cor do texto */
  position: relative;
  outline: none;
  overflow-y: auto;
`;

export const Button = styled.button`
  width: 150px;
  background-color: #27a567;
  padding: 10px;
  margin: 0px 20px;
  border: 1px solid #000000;
  border-radius: 4px;
  font-size: 16px;
  color: #fff;
`;
