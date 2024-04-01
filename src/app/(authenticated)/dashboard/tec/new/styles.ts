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
  align-items: start;

  > div {
    display: flex;
    justify-content: start;
    width: 100%;
    align-items: end;
    margin: 0 0 0 0;
  }

  > label {
    overflow-wrap: break-word;
    margin: 1.5rem 2rem 0.5rem 2rem;
    text-align: start;
  }
`;

export const Input = styled.input`
  padding: 1rem;
  width: 100%;
  margin: 0 0rem 1.5rem 0rem;
  font-size: 1.6rem;
  background-color: #fafafa;
  border-radius: 0.5rem;
  outline: 0.1rem solid #ccc;
  font-family: 'OpenSans-Regular';
  color: #000;

  &:focus {
    outline: 0.2rem solid #27a567;
  }

  &::placeholder {
    color: #666;
  }
`;

export const Select = styled.select`
  padding: 1rem;
  width: 100%;
  margin: 0 0rem 1.5rem 0rem;
  font-size: 1.6rem;
  background-color: #fafafa;
  border-radius: 0.5rem;
  outline: 0.1rem solid #ccc;
  font-family: 'OpenSans-Regular';

  &:focus {
    outline: 0.2rem solid #27a567;
  }

  > option:first-child {
    display: none;
  }
`;

export const Option = styled.option`
  background-color: #fff;
  color: #777;
`;

export const CheckboxButton = styled.button<{ $checked: number }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 1rem 5rem 1.5rem 0rem;

  > div {
    width: 2rem;
    height: 2rem;
    border: 0.2rem solid #27a567;
    background-color: ${({ $checked }) => ($checked === 1 ? '#27a567' : '#fff')};
    border-radius: 1rem;
  }
  > span {
    margin-left: 0.5rem;
    font-size: 1.4rem;
  }
`;

export const Button = styled.button`
  width: 15rem;
  background-color: #27a567;
  padding: 1rem;
  margin: 3rem 0;
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
