'use client';

import styled, { css, keyframes } from 'styled-components';

import { lighten } from 'polished';

const animation = keyframes`
  from {
    background-position: 135% 0%;
  }
  
  to {
    background-position: 0% 0%;
  }
`;

export const Container = styled.div<{ $animation: boolean }>`
  background-color: var(--color-palette-base-100);
  ${({ $animation }) =>
    $animation &&
    css`
      background: linear-gradient(
        90deg,
        var(--color-palette-base-100) 0%,
        ${() => {
            const computedStyle = window.getComputedStyle(document.documentElement);
            const textBackground = computedStyle.getPropertyValue('--color-palette-base-100');
            return lighten(0.2, textBackground);
          }}
          50%,
        var(--color-palette-base-100) 100%
      );

      > div {
        width: 100%;
        opacity: 0.3;
      }
    `}

  background-size: 400% 400%;
  animation: ${animation} 1.2s ease-in-out infinite;
`;

export const Wrapper = styled.div`
  white-space: nowrap;
  justify-content: center;
  display: flex;
  align-items: center;
  border-width: 0.2rem 0 0 0;

  @media (min-width: 550px) {
    right: 3rem;
    flex-direction: column;
    height: 100%;
  }

  > button {
    padding-top: 0.2rem;
    margin: 0.5rem 2rem;
    cursor: pointer;
    font-size: 1.5rem;

    @media (min-width: 550px) {
      &:hover {
        filter: brightness(120%) contrast(150%) saturate(200%) sepia(50%);
      }
    }

    > p {
      color: #000;
      margin-top: -0.5rem;
      font-weight: bold;
      font-size: 1.2rem;
    }

    @media (min-width: 550px) {
      margin: 1rem;
    }
  }
`;
