'use client';

import styled, { keyframes } from 'styled-components';

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
  background-image: linear-gradient(to top, #ffebe8, rgba(255, 235, 232, 0.9));
  position: absolute;
  text-align: center;
  border: 0.2rem solid #dd3c10;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.3s ease-in-out;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  > div {
    padding-top: 1rem;
  }

  > span {
    white-space: nowrap;
    color: #000;
    padding: 0 1rem 1rem 1rem;
    font-weight: 400;
  }
`;

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  overflow: hidden;

  > div {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 2;
    padding-bottom: 7rem;
    border-radius: 1rem;
    > div {
      animation: ${rotateAnimation} 1s linear infinite;
    }
  }
  background-color: #8956;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 1rem;
  background-color: #ffffff;

  > div:nth-child(1) {
    display: flex;
    align-items: center;
    margin: 0.5rem 0.7rem 1rem 0;
    > strong {
      font-size: 2.2rem;
    }
  }

  > div:nth-child(2) {
    //justify-content: center;
    //padding: 1rem;
    padding: 0 3rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    width: 100%;
  }
`;

export const CheckboxButton = styled.button<{ $checked: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 1.5rem;

  > div {
    width: 2rem;
    height: 2rem;
    border: 0.2rem solid var(--color-palette-vibrant-100);
    background-color: ${({ $checked }) =>
      $checked ? 'var(--color-palette-vibrant-100)' : '#fff'};
    border-radius: 1rem;
  }

  > span {
    margin-left: 0.5rem;
    font-size: 1.4rem;
  }
`;

export const Input = styled.input`
  padding: 1rem;
  margin: 1.5rem 2rem 0 2rem;
  border: 0.1rem solid #ccc;
  border-radius: 0.5rem;
  font-size: 1.6rem;
  overflow-wrap: break-word;
  text-align: start;
  width: 80%;

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
  margin: 1.5rem 2rem 0 2rem;
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

export const Button = styled.button`
  width: 80%;
  background-color: var(--color-palette-vibrant-100);
  padding: 1rem;
  margin: 2rem 2rem;
  border-radius: 0.4rem;
  font-size: 1.6rem;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #27b466;
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
    background-color: var(--color-palette-vibrant-100);
    padding: 1rem;
    margin: 2rem 2rem;
    border: 0.1rem solid #000000;
    border-radius: 0.4rem;
    font-size: 1.6rem;
    color: #fff;
  }
`;
