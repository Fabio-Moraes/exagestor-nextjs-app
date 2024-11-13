'use client';

import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
  padding: 2rem;
`;

export const WrapperHorizontalList = styled.div`
  background: -webkit-linear-gradient(90deg, rgb(var(--color-primary-03)), #000000);
  background: linear-gradient(90deg, rgb(var(--color-primary-03)), #000000);
  position: relative;
  border-radius: 1rem;

  @media (max-width: 550px) {
    border-radius: 0;
    margin: 0 -2rem;
  }
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  color: #333;
  padding: 0.8rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;

  > div {
    display: flex;
    flex-direction: column;
    align-items: start;

    > span {
      font-size: 1.75rem;
    }
  }

  @media (min-width: 550px) {
    background-color: rgb(var(--color-primary-05));
    color: #fff;
  }
`;

export const Pin = styled.div`
  width: 23rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > span {
    font-size: 1.7rem;
  }

  > div {
    height: 3rem;
    padding: 0 0.5rem;
    display: flex;
    background-color: #dddddd;
    justify-content: space-between;
    border-radius: 2rem;
    align-items: center;
    > button {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 0.8rem;
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
