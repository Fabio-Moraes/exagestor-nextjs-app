'use client';

import styled from 'styled-components';

export const Container = styled.div`
  display: none;

  @media (min-width: 900px) {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    width: min(180px, 100%);
  }
`;
