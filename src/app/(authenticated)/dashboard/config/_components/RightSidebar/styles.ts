'use client';

import styled from 'styled-components';

export const Container = styled.div`
  display: none;

  @media (min-width: 1065px) {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    width: min(18rem, 100%);
  }
`;
