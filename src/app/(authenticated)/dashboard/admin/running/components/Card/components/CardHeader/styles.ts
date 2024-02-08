'use client';

import styled from 'styled-components';

export const Container = styled.div<{ $path: string }>`
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 4px 2px;
  background-color: ${({ $path }) => $path};

  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;

    > div {
      display: flex;
      margin: 3px 5px;
      background-color: #fff;
      border-radius: 3px;
      padding: 5px;
      flex-direction: row;
      max-height: 30px;
      max-width: 80%;

      > p {
        font-family: 'OpenSans-SemiBold';
        color: #000;
        font-size: 15px;
        max-width: 100%;
      }

      > p:first-child {
        margin-right: 3px;
      }

      > p:last-child {
        overflow: hidden;
        margin-left: 2px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    > button {
      padding: 4px 5px;
      max-height: 30px;
    }
  }
`;
