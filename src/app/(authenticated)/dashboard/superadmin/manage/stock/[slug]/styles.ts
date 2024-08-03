'use client';

import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
  padding: 2rem;
`;

export const Title = styled.h1`
  font-size: 2.4rem;
  margin-bottom: 2.5rem;
  border-radius: 0.7rem;
  font-family: 'OpenSans-SemiBold';
  text-align: center;

  @media (min-width: 550px) {
    box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.5);
    height: 4rem;
    line-height: 4rem;
    background-color: rgb(var(--color-secondary-03));
    color: #fff;
    margin-bottom: 3rem;
  }
`;

export const Tabs = styled.div`
  display: flex;
  width: 100%;
  background-color: rgba(var(--color-secondary-03), 0.3);
  align-items: end;
  justify-content: start;
  flex-direction: row;
  border-radius: 0.7rem 0.7rem 0rem 0rem;
  overflow: hidden;

  > button {
    border-radius: 0.7rem 0.7rem 0rem 0rem;
    padding: 0.5rem 1rem;
  }
`;

export const TabButton = styled.button<{ $checked: boolean }>`
  color: #ffffff;
  background-color: ${({ $checked }) => $checked && 'rgb(var(--color-primary-02))'};
  color: ${({ $checked }) => ($checked ? '#fff' : '#000')};
`;

export const Form = styled.div`
  margin-bottom: 2rem;
`;

export const InputLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

export const Input = styled.input`
  width: calc(100% - 2rem);
  padding: 1rem;
  margin-bottom: 1.5rem;
  border: 0.1rem solid #ccc;
  border-radius: 0.4rem;
`;

export const AddButton = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 0.4rem;
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
  margin: 0 1rem 1rem 2rem;

  > div {
    width: 2rem;
    height: 2rem;
    border: 0.2rem solid rgb(var(--color-secondary-04));
    background-color: ${({ $checked }) =>
      $checked ? 'rgb(var(--color-secondary-04))' : '#fff'};
    border-radius: 1rem;
  }
  > span {
    margin-left: 0.5rem;
    font-size: 1.4rem;
  }
`;

export const TableHeader = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 0.2rem solid #000;
  background-color: rgba(var(--color-secondary-02), 0.3);
  padding: 1rem 0;
  width: 100%;

  div {
    min-width: 6.7rem;
    border-left: 0.2rem solid #000;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    > span {
      width: 100%;
      font-family: 'OpenSans-Bold';
      font-size: 1.3rem;
    }
  }

  > div:first-child {
    width: 100%;
    padding: 0.5rem 1rem;
    border-left: 0;
    text-align: start;
  }
`;

export const TableRow = styled.div<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: row;
  border-bottom: 0.2rem solid #000;
  background-color: ${({ $isSelected }) =>
    $isSelected ? 'rgba(var(--color-primary-02), 0.5)' : '#ffffff'};
  padding: 1rem 0;
  width: 100%;

  > div {
    min-width: 6.7rem;
    border-left: 0.2rem solid #000;
    display: flex;
    justify-content: center;
    align-items: center;

    > span {
      width: 100%;
      font-family: 'OpenSans-SemiBold';
      font-size: 1.3rem;
    }
  }

  > div:first-child {
    width: 100%;
    padding: 0.5rem 1rem;
    border-left: 0;
    text-align: start;
  }
`;

export const Table = styled.div`
  border: 0.2rem solid #000;
  border-radius: 0rem 0rem 0.7rem 0.7rem;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  > div:last-child {
    border-bottom: 0;
  }
`;

export const Button = styled.button`
  width: 30rem;
  background-color: rgb(var(--color-secondary-04));
  padding: 1rem;
  margin: 2rem 2rem;
  border: 0.1rem solid #000000;
  border-radius: 0.4rem;
  font-size: 1.6rem;
  color: #fff;
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
    border-radius: 0.7rem;
    font-size: 1.6rem;
    color: #fff;
  }
`;
