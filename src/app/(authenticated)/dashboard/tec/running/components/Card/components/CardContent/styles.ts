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
    padding: 7px;
    > p {
      padding: 5px;
      margin-bottom: 10px;
      text-align: start;
      font-size: 15px;
      white-space: normal;
      font-family: 'OpenSans-SemiBold';
      background-color: ${({ $color }) => $color};
      border-radius: 3px;
    }

    > p:last-child {
      margin-bottom: 0px;
    }
  }
`;
