'use client';

//import Link from 'next/link';

import styled from 'styled-components';

export const Container = styled.button`
  display: flex;
  white-space: nowrap;
  padding: 0 20px;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  > p {
    margin-top: 10px;
    text-align: start;
    font-size: 16px;
    font-weight: bold;
  }

  > div {
    width: 100%;
    padding: 10px;

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
