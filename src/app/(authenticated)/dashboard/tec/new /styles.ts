'use client';

import DateTime from 'react-datetime';

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

  @media (min-width: 550px) {
    box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.5);
    height: 4rem;
    line-height: 4rem;
    background-color: #5e9987;
    color: #fff;
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
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
    margin: 0 2rem 0.5rem 2rem;
    text-align: start;
  }
`;

export const Input = styled.input`
  padding: 1rem;
  margin: 0 0rem 1.5rem 0rem;
  font-size: 1.6rem;
  background-color: #fafafa;
  border-radius: 0.5rem;
  outline: 0.1rem solid #ccc;
  font-family: 'OpenSans-Regular';

  &:focus {
    outline: 0.2rem solid var(--primary-green-color);
  }

  &::placeholder {
    color: #666;
  }
`;

export const Select = styled.select`
  padding: 1rem;
  margin: 0 0rem 1.5rem 0rem;
  font-size: 1.6rem;
  background-color: #fafafa;
  border-radius: 0.5rem;
  outline: 0.1rem solid #ccc;
  font-family: 'OpenSans-Regular';
`;

export const Option = styled.option`
  background-color: #fff;
  color: #777;
`;

export const WrapperCheckboxButton = styled.div`
  display: flex;
  width: 22rem;
`;

export const CheckboxButton = styled.button<{ $checked: boolean }>`
  display: flex;
  //align-items: center;
  cursor: pointer;
  margin: 0.6rem 1rem 2rem 0.5rem;

  > div {
    width: 2rem;
    height: 2rem;
    border: 0.2rem solid var(--primary-green-color);
    background-color: ${({ $checked }) => ($checked ? 'var(--primary-green-color)' : '#fff')};
    border-radius: 1rem;
  }
  > span {
    margin-left: 0.5rem;
    font-size: 1.4rem;
  }
`;

export const Button = styled.button`
  width: 15rem;
  background-color: var(--primary-green-color);
  padding: 1rem;
  margin: 3rem 0rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.6rem;
  color: #fff;

  &:hover {
    background-color: #00796b;
  }

  &:focus {
    outline: none;
  }
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
    background-color: var(--primary-green-color);
    padding: 1rem;
    margin: 2rem 2rem;
    border: 0.1rem solid #000000;
    border-radius: 0.7rem;
    font-size: 1.6rem;
    color: #fff;
  }
`;

export const StyledDateTime = styled(DateTime)`
  input {
    width: 100%;
    padding: 1rem;
    margin: 0 0rem 1.5rem 0rem;
    font-size: 1.6rem;
    background-color: #fafafa;
    border-radius: 0.5rem;
    outline: 0.1rem solid #ccc;
    font-family: 'OpenSans-Regular';

    &:focus {
      outline: 0.2rem solid var(--primary-green-color);
    }

    &::placeholder {
      color: #666;
    }
  }
`;
