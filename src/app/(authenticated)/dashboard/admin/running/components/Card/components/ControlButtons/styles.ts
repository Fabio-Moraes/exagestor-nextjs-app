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

export const Container = styled.div<{ $animation: boolean; $color: string }>`
  background-color: ${({ $color }) => $color};
  ${({ $animation, $color }) =>
    $animation &&
    css`
      background: linear-gradient(
        90deg,
        ${'$color'} 0%,
        ${lighten(0.2, $color)} 50%,
        ${$color} 100%
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
  border-width: 2px 0 0 0;

  @media (min-width: 550px) {
    right: 30px;
    flex-direction: column;
  }

  > button {
    padding-top: 2px;
    margin: 5px 20px;
    cursor: pointer;
    font-size: 15px;

    @media (min-width: 550px) {
      &:hover {
        filter: brightness(120%) contrast(150%) saturate(200%) sepia(50%);
      }
    }

    > p {
      color: #000;
      margin-top: -5px;
      font-weight: bold;
      font-size: 12px;
    }

    @media (min-width: 550px) {
      margin: 10px 10px;
    }
  }
`;
