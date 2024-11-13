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

export const Table = styled.div`
  border: 0.2rem solid #000;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 0rem 0rem 0.7rem 0.7rem;

  > div:last-child {
    border-bottom: 0;
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

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const Card = styled.div`
  display: flex;
  align-items: start;
  width: 100%;
  margin: 1rem 0;
  background-color: rgba(var(--color-secondary-03), 0.8);
  padding: 1rem;
  border-radius: 1rem;
  flex-direction: column;

  > p,
  span {
    color: #ffffff;
  }
`;

export const ContainerCard = styled.div`
  display: flex;
  padding: 1rem;
  background-color: rgba(var(--color-secondary-03), 0.2);
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
