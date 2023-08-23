'use client';

import Link from 'next/link';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  user-select: none;
  display: flex;
  flex-direction: column;
  width: min(601px, 100%);

  @media (min-width: 550px) {
    //border-left: 1px solid var(--gray);
    //border-right: 1px solid var(--gray);
  }
`;

export const Forehead = styled.div`
  margin-left: 6px;
  margin-right: 10px;

  z-index: 2;
  top: 0;
  display: flex;
  align-items: center;
  text-align: left;
  padding: 8px 0 9px 13px;
  background-color: #fff;

  > div:last-child {
    display: flex;
    margin-right: 10px;
    height: 100%;
    background-image: linear-gradient(to top, #a9c4b8, #dce6dc);
    border: 2px solid #3f795e;

    flex-direction: column;
    justify-content: center; 
    padding: 10px; 

    border-radius: 7px;

   > span {
    outline: 0;
    text-align: end;
    font-weight: bold;
    white-space: nowrap;
    font-size: 15px;
    margin-bottom: 5px;
    color: #000
  }

    > button {
      background-color: #27A567;
      font-weight: bold;
      font-size: 14px;
      border-radius: 5px;
      padding: 3px 8px 3px 8px;
      cursor: pointer;
      margin-left: auto;
    }
  };
`;

export const MenuHeader = styled.div`
    border: 2px solid #3f795e;
    
  position: sticky;
  display: flex;
  padding: 3px min(20px, max(10vw, 10px));
  background-image: linear-gradient(to right, #809e91, #dce6dc);
  justify-content: space-between;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 2;
  white-space: nowrap;

  @media (min-width: 550px) {
    display: none;
  }
`;

export const Button = styled(Link) <{ $path?: boolean }>`
  display: flex;
  position: static;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
  outline: 0;
  border-radius: 5px;
  padding: 5px 10px 5px 10px;
  cursor: pointer;
  

  > span {
      text-align: center;
      font-weight: bold;
      font-size: 12px;
      overflow-wrap: break-word;
  }

  ${({ $path = '' }) => {
    const activeButtonCSS = css`
    border: 2px solid #000000;
    background-color: #27A567;
    > span {color: #fff;}
    `;

    return $path && activeButtonCSS;
  }};
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;

  width: 100%;

  > strong {
    color: #2d4535;
    font-size: 22px;
  }
  > span {
    font-size: 15px;
    color: var(--gray);
  }
`;
