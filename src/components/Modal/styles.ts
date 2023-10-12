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

export const Container = styled.span`
  display: flex;
  z-index: 2000;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-image: linear-gradient(to top, #3f795e, rgba(63, 121, 94, 0.9));
  border: 2px solid #000000;
  border-radius: 10px;
  position: fixed;
  text-align: center;
  top: 50%;
  left: 50%;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.3s ease-in-out;
  transform: translate(-50%, -50%);
  padding-top: 5px;

  > span {
    margin-top: 5px;
    white-space: nowrap;
    color: #fff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
    padding: 0px 10px 10px 10px;
    font-weight: 400;
  }
`;