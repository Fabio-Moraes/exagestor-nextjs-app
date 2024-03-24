'use client';

import styled, { css } from 'styled-components';

export const Container = styled.div`
  border: 0 solid #3f795e;
  border-width: 0.2rem 0 0.2rem 0;
  position: sticky;
  display: flex;
  padding: 0.3rem min(1.5rem, max(10vw, 1rem));
  background-image: radial-gradient(35rem at center, #ffffff 20%, #27a567);
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

export const Button = styled.button<{ $path?: boolean }>`
  display: flex;
  position: static;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
  outline: 0;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
  width: 7.5rem;
  cursor: pointer;

  > span {
    text-align: center;
    font-weight: bold;
    font-size: 1.2rem;
    overflow-wrap: break-word;
  }

  ${({ $path = '' }) => {
    const activeButtonCSS = css`
      //border: 0.2rem solid #000000;
      background-color: #27a567;
      > span {
        color: #fff;
      }
    `;

    return $path && activeButtonCSS;
  }};
`;
