'use client';

import styled from 'styled-components';

import { lighten } from 'polished';

export const Container = styled.div<{ $percentage: number }>`
  display: flex;
  justify-content: start;
  width: 100%;
  height: 4rem;
  white-space: nowrap;
  margin-top: 2rem;
  border-radius: 0.4rem;
  overflow: hidden;

  > P {
    left: 0;
    width: 100%;
    margin-top: 1rem;
    position: absolute;
    text-align: center;
    font-family: 'OpenSans-SemiBold';
    font-size: 1.5rem;
  }

  background-color: #dddddd;

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
