'use client';

import Link from 'next/link';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: none;

  @media (min-width: 550px) {
    display: flex;
    flex-direction: column;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding: 7px;
  border: 2px solid #3f795e;

  border-radius: 15px;
    background-image: linear-gradient(to top, #a9c4b8, #dce6dc);

  @media (min-width: 1065px) {
    align-items: flex-start;
  }
`;

export const Button = styled(Link)<{ $path?: boolean }>`
  display: block;
  align-items: center;
  flex-shrink: 0;
  margin: 5px;
  padding: 10px ;
  border-radius: 5px;

  > span {
    display: none;
  }

  @media (min-width: 1065px) {
    display: flex;
    padding-right: 15px;
    outline: 0;
    width: 95%;

    > span {
      display: inline;
      margin-left: 19px;
      text-align: start;
      font-weight: bold;
      font-size: 12px;
    }
  }
  
  ${({ $path = '' }) => {
    const activeButtonCSS = css`
    background-color: #27A567;
    > span {color: #fff};
    `;

    const disabledButtonCSS = css`
    background: #fff;
    border: 2px solid #3f795e;
    &:hover {
      border: 2px solid #27A567;
      background: #27A567;
      box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
    }`;
    
    return $path ? activeButtonCSS : disabledButtonCSS;
  }};

  
`;

  //border-left: 1px solid #7a7a7a;
  //border-right: 1px solid #7a7a7a;
  //border-bottom: 1px solid #2f3336;
