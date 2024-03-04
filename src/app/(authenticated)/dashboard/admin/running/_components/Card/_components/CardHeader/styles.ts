'use client';

import styled from 'styled-components';

export const Container = styled.div<{ $path: string }>`
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 0.4rem 0.2rem;
  background-color: ${({ $path }) => $path};

  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;

    > div {
      display: flex;
      margin: 0.3rem 0.5rem;
      background-color: #fff;
      border-radius: 0.3rem;
      padding: 0.5rem;
      flex-direction: row;
      max-height: 3rem;
      max-width: 80%;

      > p {
        font-family: 'OpenSans-SemiBold';
        color: #000;
        font-size: 1.5rem;
        max-width: 100%;
      }

      > p:first-child {
        margin-right: 0.3rem;
      }

      > p:last-child {
        overflow: hidden;
        margin-left: 0.2rem;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    > button {
      padding: 0.4rem 0.5rem;
      max-height: 3rem;
    }
  }
`;
