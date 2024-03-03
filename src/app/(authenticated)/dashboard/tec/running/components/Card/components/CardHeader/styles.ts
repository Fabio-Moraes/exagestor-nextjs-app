'use client';

import styled from 'styled-components';

export const Container = styled.div<{ $path: string }>`
  display: flex;
  align-items: start;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  padding: 0.4rem 0.2rem;
  background-color: ${({ $path }) => $path};

  > div {
    display: flex;
    margin: 0.3rem 0.5rem;
    background-color: #fff;
    border-radius: 0.3rem;
    padding: 0.5rem;
    flex-direction: row;
    max-height: 3rem;

    > p {
      font-family: 'OpenSans-SemiBold';
      color: #000;
      font-size: 1.5rem;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      max-width: 100%;
    }

    > p:first-child {
      margin-right: 0.3rem;
    }

    > p:last-child {
      margin-left: 0.2rem;
    }
  }

  > div:last-child {
    background-color: transparent;
    margin: 0;
    > button {
      padding: 0.3rem;
      max-height: 3rem;
    }
  }
`;
