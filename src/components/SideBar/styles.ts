'use client';

import styled from 'styled-components';

export const Container = styled.div`
  display: none;
  
  @media (min-width: 900px) {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    width: min(180px, 100%);
    border-left: 1px solid #7a7a7a;
  }
`;

export const Body = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  margin-top: 3px;

  > div + div {
    margin-top: 15px;
  }
`;
