'use client';

import styled from 'styled-components';

export const Container = styled.div`
  background-color: #f0f2f5;
  position: relative;
  margin: 0 auto;
`;

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

export const Main = styled.main`
  user-select: none;
  flex-direction: column;
  width: min(60.1rem, 100vw);
  align-items: center;
  justify-content: center;
  display: flex;

  > div {
    position: absolute;

    @media (max-width: 55rem) {
      top: 3rem;
    }
  }
`;
