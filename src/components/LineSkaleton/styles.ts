import styled, { css, keyframes } from 'styled-components';

import { lighten } from 'polished';

const animation = keyframes`
  from {
    background-position: 0% 0%;
  }
  
  to {
    background-position: 135% 0%;
  }
`;

export const Skeleton = styled.div<{ $width: string; $height: string; $color: string }>`
  border-radius: 0.5rem;
  ${({ $width, $height }) =>
    $width &&
    css`
      width: ${$width};
      height: ${$height};
    `};

  margin-bottom: 0.5rem;

  ${({ $color }) => css`
    background: linear-gradient(
      -90deg,
      ${$color} 0%,
      ${lighten(0.2, $color)} 50%,
      ${$color} 100%
    );
  `}

  background-size: 400% 400%;
  animation: ${animation} 1.2s ease-in-out infinite;
`;
