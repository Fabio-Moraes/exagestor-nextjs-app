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

    user-select: text;

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

export const Countdown = styled.div`
  background-color: #3f7971;
  margin-inline: 1rem;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  line-height: 2.5rem;
  > p {
    color: #fff;
    font-size: 1.5rem;
  }
`;
