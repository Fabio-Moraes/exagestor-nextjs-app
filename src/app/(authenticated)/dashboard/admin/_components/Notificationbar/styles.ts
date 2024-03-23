'use client';

import styled, { keyframes, css } from 'styled-components';

import { motion } from 'framer-motion';
import { lighten } from 'polished';

const animationBackground = keyframes`
  from {
    background-position: 135% 0%;
  }
  
  to {
    background-position: 0% 0%;
  }
`;

const animationProgress = keyframes`
  from {
    width: 0%;
  }
  to {
    width: var(--progress)
    }
`;

export const Container = styled(motion.div)<{ $fullProgress?: boolean }>`
  border-bottom: 0 solid #3f795e;
  border-width: 0.2rem 0 0.2rem 0;
  display: flex;
  padding: 0.3rem min(1.5rem, max(10vw, 1rem));
  justify-content: start;
  width: 100%;
  height: 3rem;
  white-space: nowrap;

  > P {
    left: 0;
    width: 100%;
    position: absolute;
    text-align: center;
    font-family: 'OpenSans-SemiBold';
    font-size: 1.5rem;
  }

  @media (min-width: 550px) {
    display: none;
  }
  background-color: #f2f2f0;

  &:before {
    content: '';
    background: linear-gradient(
      -90deg,
      #8bc9a8 0%,
      ${lighten(0.2, '#8bc9a8')} 50%,
      #8bc9a8 100%
    );
    background-size: 400% 400%;

    ${({ $fullProgress }) => {
      if ($fullProgress) {
        return css`
          animation: ${animationBackground} 1.2s ease-in-out infinite;
          width: 100%;
        `;
      } else {
        return css`
          animation:
            ${animationBackground} 1.2s ease-in-out infinite,
            ${animationProgress} 6s linear forwards;
        `;
      }
    }};
  }
`;
