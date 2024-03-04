'use client';

import styled from 'styled-components';

export const Container = styled.div<{ $color: string }>`
  display: flex;
  white-space: nowrap;
  width: 100%;
  background-color: #ffffff;

  flex-direction: column;
  justify-content: space-between;

  align-items: center;

  > div:last-child {
    width: 100%;
    height: 100%;
    padding: 0.7rem;
    > p {
      padding: 0.5rem;
      margin-bottom: 1rem;
      text-align: start;
      font-size: 1.5rem;
      white-space: normal;
      font-family: 'OpenSans-SemiBold';
      background-color: ${({ $color }) => $color};
      border-radius: 0.3rem;
    }

    > p:last-child {
      margin-bottom: 0;
    }
  }
`;
