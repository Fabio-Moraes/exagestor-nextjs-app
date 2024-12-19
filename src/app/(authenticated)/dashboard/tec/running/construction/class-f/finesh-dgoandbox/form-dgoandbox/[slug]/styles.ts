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
    background-color: rgb(var(--color-secondary-03));
    color: #fff;
  }
`;

export const ContainerCardImages = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: flex-start;
  width: 100%;
  padding-right: 100%;

  button {
    height: 5rem;
    width: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    color: #fff;
    //padding: 0.3rem;
    margin-right: 1rem;
    border-radius: 1rem;
    user-select: none;
    background-color: rgb(var(--color-secondary-04));
    align-items: center;
    justify-content: center;

    > p {
      position: absolute;
      background-color: rgba(0, 0, 0, 0.6);

      > p {
        position: 'absolute';
        text-align: center;
        font-size: 1.6rem;
      }
    }

    transition: all 0.05s ease;
    box-shadow: 0px 2px 0px rgb(var(--color-secondary-02));

    &:active {
      transform: translateY(2px);
      box-shadow: none;
    }
  }
`;

export const FormContainer = styled.div`
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
    outline: 0.2rem solid rgb(var(--color-secondary-04));
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

export const MapButton = styled.button`
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  margin-bottom: 1.3rem;
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
    border: 0.2rem solid rgb(var(--color-secondary-04));
    background-color: ${({ $checked }) => ($checked ? 'rgb(var(--color-secondary-04))' : '#fff')};
    border-radius: 1rem;
  }
  > span {
    margin-left: 0.5rem;
    font-size: 1.4rem;
  }
`;

export const Button = styled.button`
  width: 15rem;
  background-color: rgb(var(--color-secondary-04));
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
    background-color: rgb(var(--color-secondary-04));
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
      outline: 0.2rem solid rgb(var(--color-secondary-04));
    }

    &::placeholder {
      color: #666;
    }
  }
`;

export const DialogQr = styled.dialog`
  border-radius: 2rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(var(--color-primary-01), 0.3);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  border: 0.5rem solid rgb(var(--color-secondary-02));

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
