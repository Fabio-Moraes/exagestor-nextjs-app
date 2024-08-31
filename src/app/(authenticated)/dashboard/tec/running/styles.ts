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
    background-color: rgb(var(--color-secondary-03));
    color: #fff;
  }
`;

export const BoxButton = styled.div`
  display: flex;
  height: auto;
  align-items: start;
  justify-content: flex-start;
  margin-bottom: 2rem;
  padding: 0.5rem 1rem;
  width: 27rem;
  background-color: rgba(var(--color-secondary-02), 0.8);
  border-radius: 0.7rem;

  flex-direction: column;

  > span {
    color: #ffffff;
  }

  > div {
    margin: 0.5rem 0rem;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

export const Input = styled.input`
  padding: 1rem;
  width: 15rem;

  font-size: 1.6rem;
  background-color: #fafafa;
  border-radius: 0.5rem;
  outline: 0.1rem solid #ccc;
  font-family: 'OpenSans-Regular';
  height: 3.6rem;

  &:focus {
    outline: 0.2rem solid rgb(var(--color-secondary-04));
  }

  &::placeholder {
    color: #666;
  }
`;

export const Button = styled.button`
  width: 9rem;
  background-color: rgb(var(--color-secondary-04));
  margin: 0rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.6rem;
  color: #fff;
  height: 4rem;

  &:hover {
    background-color: #00796b;
  }

  &:focus {
    outline: none;
  }
`;

export const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  font-size: 1.8rem;
  margin-bottom: 3rem;
  overflow: hidden;
  border-radius: 0.7rem;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.1);

  > div:first-child {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 1rem;
    background-color: rgb(var(--color-primary-05));
    color: #ffffff;

    > p {
      font-family: 'OpenSans-SemiBold';
    }
  }

  > div:last-child {
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    @media (min-width: 550px) {
      flex-direction: row;
    }
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
    border-radius: 0.4rem;
    font-size: 1.6rem;
    color: #fff;
  }
`;
