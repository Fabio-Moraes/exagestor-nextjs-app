'use client';

import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
  padding: 2rem;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  color: #333;
  padding: 0.8rem;
  align-items: center;
  justify-content: center;

  > h1 {
    font-size: 3rem;
    margin-bottom: 0.3rem;
  }

  > span {
    font-size: 1.7rem;
  }

  @media (min-width: 550px) {
    background-color: #3c7d5d;
    color: #fff;
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
    background-color: #27a567;
    padding: 1rem;
    margin: 2rem 2rem;
    border: 0.1rem solid #000000;
    border-radius: 0.4rem;
    font-size: 1.6rem;
    color: #fff;
  }
`;
