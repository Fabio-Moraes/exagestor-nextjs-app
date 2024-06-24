'use client';

import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Container = styled.div`
  z-index: 3000;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation-name: ${fadeIn};
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  animation-delay: 0.5s;
  animation-fill-mode: forwards;
`;
export const Wrapper = styled.span`
  display: flex;
  z-index: 2000;
  position: fixed;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  align-items: center;
  justify-content: center;
  flex-direction: column;

  > span {
    color: #fff;
    text-shadow: 0.2rem 0.2rem 0.4rem rgba(0, 0, 0, 0.7);
    white-space: nowrap;
    padding: 0 1rem 1rem 1rem;
    font-weight: 400;
  }
`;
