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
  border-radius: 0.5rem;
  border-radius: 0.7rem;

  > h1 {
    font-size: 3rem;
    margin-bottom: 0.3rem;
  }

  > span {
    font-size: 1.7rem;
  }

  @media (min-width: 550px) {
    background-color: rgb(var(--color-primary-05));
    color: #fff;
  }
`;
