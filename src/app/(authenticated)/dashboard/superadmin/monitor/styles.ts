'use client';

import styled, { keyframes } from 'styled-components';

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

export const ListContainer = styled.ul`
  list-style: none;
  padding: 0;

  > div:first-child() {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: start;
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

export const Spinner = styled.div`
  display: flex;
  justify-content: center;
  > div {
    animation-name: ${rotateAnimation};
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
`;

export const ListItem = styled.li`
  font-size: 1.8rem;
  margin-bottom: 3rem;
  border: 0.2rem solid rgb(var(--color-primary-04));
  border-radius: 0.5rem;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.4);

  display: flex;
  justify-content: space-between;
  flex-direction: column;
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

export const StatusIndex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 50px;
`;

export const Status = styled.div`
  width: 150px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  background-color: ${({ color }) => color};
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: start;
  width: 100%;

  > div {
    display: flex;
    flex-direction: row;
  }
`;

export const WrapperButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  border-radius: 30rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: rgb(var(--color-secondary-02));
  border: 1px solid #ddd;

  > button {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;

    &:active {
      transform: scale(0.95);
      opacity: 0.5;
    }
  }
`;
