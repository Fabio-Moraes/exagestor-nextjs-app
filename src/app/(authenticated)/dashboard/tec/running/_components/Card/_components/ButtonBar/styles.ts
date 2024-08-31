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
  background-color: rgb(var(--color-primary-02));
  ${({ $animation }) =>
    $animation &&
    css`
      background: linear-gradient(
        90deg,
        rgb(var(--color-primary-02)) 0%,
        ${lighten(0.2, '#cccc')} 50%,
        rgb(var(--color-primary-02)) 100%
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

export const Dialog = styled.dialog`
  background-image: linear-gradient(
    45deg,
    rgb(var(--color-primary-02)) 65%,
    rgb(var(--color-secondary-02))
  );
  border-radius: 0.7rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  > button {
    background-color: #fff;
    align-items: center;
    flex-shrink: 0;
    border-radius: 0.5rem;
    width: 15rem;
    margin: 1rem;
    cursor: pointer;
    user-select: none;

    > p {
      text-align: center;
      width: 100%;
    }

    display: flex;
    height: 4.5rem;

    transition: all 0.05s ease;
    box-shadow: 0px 3px 0px rgb(var(--color-secondary-02));

    &:active {
      transform: translateY(2px);
      box-shadow: none;
    }
  }

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
