'use client';

import styled from 'styled-components';

export const Container = styled.div<{ $path: string }>`
  display: flex;
  align-items: start;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  padding: 4px 2px;
  background-color: ${({ $path }) => $path};

  > div {
    display: flex;
    margin: 3px 5px;
    background-color: #fff;
    border-radius: 3px;
    padding: 5px;
    flex-direction: row;
    max-height: 30px;

    > p {
      font-family: 'OpenSans-SemiBold';
      color: #000;
      font-size: 15px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      max-width: 100%;
    }

    > p:first-child {
      margin-right: 3px;
    }

    > p:last-child {
      margin-left: 2px;
    }
  }

  > div:last-child {
    background-color: transparent;
    margin: 0;
    > button {
      padding: 3px;
      max-height: 30px;
    }
  }
`;
