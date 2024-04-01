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
  background-color: #8bc9a8;
  ${({ $animation }) =>
    $animation &&
    css`
      background: linear-gradient(
        90deg,
        ${'#8bc9a8'} 0%,
        ${lighten(0.2, '#8bc9a8')} 50%,
        ${'#8bc9a8'} 100%
      );

      > div {
        width: 100%;
        opacity: 0.3;
      }
    `}

  background-size: 400% 400%;
  animation: ${animation} 1.2s ease-in-out infinite;

  position: relative;
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
