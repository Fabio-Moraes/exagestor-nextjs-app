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
  border: 0.2rem solid #000000;
  border-radius: 1rem;
  position: fixed;
  text-align: center;
  top: 50%;
  left: 50%;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.3s ease-in-out;
  transform: translate(-50%, -50%);
  padding-top: 0.5rem;

  > span {
    margin-top: 0.5rem;
    white-space: nowrap;
    color: #fff;
    text-shadow: 0.2rem 0.2rem 0.4rem rgba(0, 0, 0, 0.7);
    padding: 0 1rem 1rem 1rem;
    font-weight: 400;
  }
`;
