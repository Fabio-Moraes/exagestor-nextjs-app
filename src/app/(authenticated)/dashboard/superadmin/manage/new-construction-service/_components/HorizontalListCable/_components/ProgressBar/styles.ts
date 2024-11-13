'use client';

import styled from 'styled-components';

import { lighten } from 'polished';

export const Container = styled.div<{ $percentage: number }>`
  display: flex;
  justify-content: start;
  width: 100%;
  height: 5rem;
  white-space: nowrap;

  > P {
    width: 20rem;
    margin-top: 1.5rem;
    position: absolute;
    text-align: center;
    font-family: 'OpenSans-SemiBold';
    font-size: 1.5rem;
  }

  @media (min-width: 550px) {
    //display: none;
  }

  background-color: #ffffff;

  &:before {
    content: '';
    background: linear-gradient(
      -90deg,
      rgb(var(--color-primary-01)) 0%,
      ${lighten(0.2, '#cccc')} 50%,
      rgb(var(--color-primary-01)) 100%
    );
    background-size: 400% 400%;
    width: ${({ $percentage }) => `${$percentage}%`};
  }
`;
