'use client';

import styled from 'styled-components';

export const ListContainer = styled.div`
  margin-top: 2rem;
  border-radius: 0.7rem;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.1);
  border: 0.2rem solid rgb(var(--color-primary-04));
  width: 100%;

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
  }

  > div:last-child {
    display: flex;
    padding: 1rem;
    background-color: rgb(var(--color-primary-04));

    justify-content: space-between;
    align-items: center;
  }
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
