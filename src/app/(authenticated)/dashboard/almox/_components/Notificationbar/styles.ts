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
  
  20% {
    width: var(--first-percentage-random);
  }

  to {
    width: var(--last-percentage-random);
  }
`;

export const Container = styled(motion.div)<{ $fullProgress?: boolean }>`
  border-bottom: 0 solid var(--color-palette-secondary-300);
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
      var(--color-palette-secondary-100) 0%,
      ${() => {
          const computedStyle = window.getComputedStyle(document.documentElement);
          const textBackground = computedStyle.getPropertyValue(
            '--color-palette-secondary-100'
          );
          return lighten(0.2, textBackground);
        }}
        50%,
      var(--color-palette-secondary-100) 100%
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
            ${animationProgress} 60s linear forwards;
        `;
      }
    }};
  }
`;
