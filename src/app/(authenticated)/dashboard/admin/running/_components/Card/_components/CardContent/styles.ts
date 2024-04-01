'use client';

import styled from 'styled-components';

export const Container = styled.div`
  white-space: nowrap;
  width: 100%;
  background-color: #f2f2f0;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  > div:last-child {
    width: 100%;
    height: 100%;
    padding: 0.7rem;

    > p {
      padding: 0.5rem;
      margin: 0.5rem 0;
      text-align: start;
      font-size: 1.5rem;
      white-space: normal;

      font-family: 'OpenSans-SemiBold';
    }

    > p:last-child {
      margin-bottom: 0;
    }
  }
`;
