'use client';

import styled, { css } from 'styled-components';

export const Container = styled.div`
  z-index: 1;
  border: 0 solid rgb(var(--color-primary-04));
  border-width: 0.2rem 0 0.2rem 0;
  display: flex;
  width: 100%;
  padding: 0.3rem min(1.5rem, max(10vw, 1rem));
  background-image: radial-gradient(
    35rem at center,
    #ffffff 20%,
    rgb(var(--color-secondary-04))
  );
  background-color: #f2f2f2;
  justify-content: space-between;
  white-space: nowrap;

  @media (min-width: 550px) {
    display: none;
  }
`;

export const WrapperLink = styled.div<{ $path?: boolean }>`
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
    color: #000;
  }

  ${({ $path = '' }) => {
    const activeButtonCSS = css`
      background-color: rgb(var(--color-primary-02));
      > span {
        color: #fff;
      }
    `;

    return $path && activeButtonCSS;
  }};
`;
