'use client';

import styled from 'styled-components';

export const Container = styled.div`
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
    padding: 20px;
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
