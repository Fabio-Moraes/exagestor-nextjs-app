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
    margin: 0 2rem 0.5rem 2rem;
    text-align: start;
  }
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

export const PasswordInputContainer = styled.div`
  position: relative;
  width: 80%;
`;

export const PasswordInput = styled.input`
  padding: 1rem;
  border: 0.1rem solid #ccc;
  border-radius: 0.5rem;
  font-size: 1.6rem;
  overflow-wrap: break-word;
  text-align: start;
  width: 100%;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #777;
  }
`;

export const TogglePasswordVisibilityButton = styled.button`
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

export const Select = styled.select`
  padding: 1rem;
  margin: 0 2rem 1.5rem 2rem;
  border: 0.1rem solid #000000;
  border-radius: 0.4rem;
  font-size: 1.6rem;
  background-color: #fff;
  color: #777;

  &:focus {
    outline: none;
  }
`;

export const Option = styled.option`
  background-color: #fff;
  color: #777;
`;

export const CheckboxButton = styled.button<{ $checked: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0 1rem 1rem 2rem;

  > div {
    width: 2rem;
    height: 2rem;
    border: 0.2rem solid #27a567;
    background-color: ${({ $checked }) => ($checked ? '#27a567' : '#fff')};
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
  margin: 2rem 2rem;
  border: 0.1rem solid #000000;
  border-radius: 0.4rem;
  font-size: 1.6rem;
  color: #fff;
`;
