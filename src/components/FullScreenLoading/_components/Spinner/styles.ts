'use client';

import styled, { keyframes } from 'styled-components';

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  display: flex;
  z-index: 1000;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 9rem;
  min-width: 20rem;
  border-radius: 1rem;
  overflow: hidden;
  margin-bottom: 1rem;

  > div {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 2;
    padding-bottom: 7rem;
    border-radius: 1rem;
    > div {
      animation-name: ${rotateAnimation};
      animation-duration: 1s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }
  }
`;
