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
  min-height: 90px;
  min-width: 200px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;

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
    padding-bottom: 70px;
    border-radius: 10px;
    > div { 
      animation-name: ${rotateAnimation};
      animation-duration: 1s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    };
  }
`