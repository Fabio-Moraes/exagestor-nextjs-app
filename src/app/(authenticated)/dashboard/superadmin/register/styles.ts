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
  height: 7rem;
  align-items: start;
  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 0.5rem;

  padding: 0.5rem;
  width: 18rem;
  background-color: rgb(var(--color-secondary-02));
  border-radius: 0.7rem;
`;

export const CheckboxButton = styled.button<{ $checked: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0rem;

  > div {
    width: 2rem;
    height: 2rem;
    border: 0.2rem solid rgb(var(--color-secondary-04));
    background-color: ${({ $checked }) => ($checked ? 'rgb(var(--color-primary-02))' : '#fff')};
    border-radius: 1rem;
  }
  > span {
    margin-left: 0.5rem;
    font-size: 1.4rem;
    color: #ffffff;
  }
`;
