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

export const Skeleton = styled.div<{ $width: string; $height: string }>`
  border-radius: 5px;
  ${({ $width, $height }) =>
    $width &&
    css`
      width: ${$width};
      height: ${$height};
    `};

  margin-bottom: 5px;

  background: linear-gradient(
    -90deg,
    #6ab78e 0%,
    ${lighten(0.2, '#6AB78E')} 50%,
    #6ab78e 100%
  );

  background-size: 400% 400%;
  animation: ${animation} 1.2s ease-in-out infinite;
`;
