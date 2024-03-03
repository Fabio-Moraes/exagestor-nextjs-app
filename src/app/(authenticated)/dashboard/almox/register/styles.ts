'use client';

import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
  padding: 2rem;
`;

export const Title = styled.h1`
  font-size: 2.4rem;
  margin-bottom: 2rem;
  border-radius: 0.7rem;
  font-family: 'OpenSans-SemiBold';
  color: #333;

  @media (min-width: 550px) {
    box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.5);
    height: 4rem;
    line-height: 4rem;
    background-image: linear-gradient(to left, #8bc9a8, #dce6dc);
    color: #000;
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  border-radius: 0.7rem;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.3);
  background-color: #ffffff;
  padding-top: 1.5rem;

  > div {
    display: flex;
    align-items: center;
  }

  > div:nth-last-child(2) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 1rem;
  }

  > label {
    overflow-wrap: break-word;
    font-family: 'OpenSans-Medium';
    margin: 0 2rem 0.5rem 2rem;
    text-align: start;
  }

  > span:last-child {
    font-family: 'OpenSans-Medium';
    font-size: 1.3rem;
    padding: 1.2rem 0 1rem 0;
  }
`;

export const Asterisk = styled.strong`
  color: red;
`;

export const Input = styled.input`
  padding: 1rem;
  margin: 0 2rem 1.5rem 2rem;
  border: 0.1rem solid #000000;
  border-radius: 0.4rem;
  font-size: 1.6rem;
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
  margin: 0 1rem 1.3rem 2rem;

  > div {
    width: 2rem;
    height: 2rem;
    border: 0.2rem solid #27a567;
    background-color: ${({ $checked }) => ($checked ? '#27a567' : '#fff')};
    border-radius: 1rem;
  }

  > span {
    font-family: 'OpenSans-Medium';
    margin-left: 0.5rem;
    font-size: 1.4rem;
  }
`;

export const ContainerCounter = styled.div`
  display: flex;
  padding-right: 0.5rem;
  width: 100%;
  justify-content: flex-end;

  > p {
    font-family: 'OpenSans-Medium';
    text-align: end;
  }
`;

export const ContainerObservation = styled.div`
  padding: 0 2rem;
  flex-direction: column;
`;

export const Observation = styled.textarea`
  width: 100%;
  height: 15rem;
  padding: 1rem;
  resize: none;

  border-radius: 0.4rem;
  border: 0.1rem solid #000000;

  font-size: 1.6rem;
  font-family: Arial, sans-serif;
  color: black; /* Cor do texto */
  position: relative;
  outline: none;
  overflow-y: auto;
`;

export const Button = styled.button`
  width: 15rem;
  background-color: #27a567;
  padding: 1rem;
  margin: 0 2rem;
  border: 0.1rem solid #000000;
  border-radius: 0.4rem;
  font-size: 1.6rem;
  color: #fff;
`;
