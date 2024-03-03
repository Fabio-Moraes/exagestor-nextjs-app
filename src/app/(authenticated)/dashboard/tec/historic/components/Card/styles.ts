'use client';

import styled from 'styled-components';

export const Container = styled.button`
  display: flex;
  white-space: nowrap;
  padding: 0 2rem;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  > p {
    margin-top: 1rem;
    text-align: start;
    font-size: 1.6rem;
    font-weight: bold;
  }

  > div {
    width: 100%;
    padding: 1rem;

    > p {
      margin-bottom: 1rem;
      text-align: start;
      font-size: 1.5rem;
    }

    > p:last-child {
      margin-bottom: 0;
    }
  }
`;
