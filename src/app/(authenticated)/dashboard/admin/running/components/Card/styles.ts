'use client';

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  white-space: nowrap;
  background-color: #3c7d5d;

  width: 100%;

  flex-direction: column;
  justify-content: space-between;

  align-items: center;

  > div:first-child {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 10px;
    background-color: #3c7d5d;

    > p {
      @media (min-width: 550px) {
        margin-left: 95px;
      }
      color: #ffffff;
    }
  }

  > div:last-child {
    background-color: #ffffff;
    width: 100%;
    padding: 20px;
    border-radius: 5px 5px 5px 5px;
    > p {
      margin-bottom: 10px;
      text-align: start;
      font-size: 15px;
    }

    > p:last-child {
      margin-bottom: 0px;
    }
  }
`;
