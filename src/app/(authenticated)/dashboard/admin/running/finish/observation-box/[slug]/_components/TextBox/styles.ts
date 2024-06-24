'use client';

import styled from 'styled-components';

export const ListContainer = styled.div`
  margin-top: 2rem;
  border-radius: 0.7rem;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.1);
  border: 0.2rem solid rgb(var(--color-primary-04));

  justify-content: center;
  align-items: center;

  > div:first-child {
    display: flex;
    margin: 0.8rem;
    background-color: #fff;
    border-radius: 0.5rem;

    border: 0.2rem solid rgb(var(--color-primary-04));

    justify-content: space-between;
    align-items: center;

    > button {
      width: 13rem;
    }
  }

  > div:last-child {
    display: flex;
    padding: 1rem;
    background-color: rgb(var(--color-primary-04));

    justify-content: space-between;
    align-items: center;

    > button {
      width: 10rem;
    }
  }
`;

export const Button = styled.button`
  display: block;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem;
  border-radius: 0.5rem;
  width: 18rem;
  background-color: #fff;
  border: 0.2rem solid rgb(var(--color-secondary-04));
  cursor: pointer;
`;

export const InputContainer = styled.div`
  margin-bottom: 2rem;
`;

export const Input = styled.textarea`
  width: 100%;
  height: 15rem;
  padding: 1rem;
  resize: none;

  font-size: 1.6rem;
  font-family: Arial, sans-serif;
  color: black; /* Cor do texto */
  position: relative;
  outline: none;
  overflow-y: auto;
`;

export const ContainerCounter = styled.div`
  display: flex;
  padding-right: 1rem;

  align-items: center;
  justify-content: flex-end;

  > p {
    text-align: end;
    margin-bottom: 0.7rem;
  }
`;

export const SkaletonInput = styled.div`
  min-width: 100%;
  min-height: 15rem;
  padding: 1rem;
  resize: none;
  position: relative;
  overflow-y: auto;
`;

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  > span {
    text-align: left;
    font-size: 1.7rem;
    color: #333;
  }

  > button {
    width: 15rem;
    background-color: rgb(var(--color-secondary-04));
    padding: 1rem;
    margin: 2rem 2rem;
    border: 0.1rem solid #000000;
    border-radius: 0.4rem;
    font-size: 1.6rem;
    color: #fff;
  }
`;
