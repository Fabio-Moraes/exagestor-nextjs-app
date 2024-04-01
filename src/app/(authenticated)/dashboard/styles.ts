'use client';

import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  margin: 0 auto;
  min-width: 100vw;
`;

export const Stickybar = styled.div`
  z-index: 1000;
  display: flex;
  flex-direction: column;
  min-width: 100vw;
  position: sticky;
  left: 0;
  top: 0;
`;

export const Wrapper = styled.div`
  min-width: 100vw;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  min-height: 100vh;
`;

export const Main = styled.div`
  user-select: none;
  flex-direction: column;
  width: min(60.1rem, 100%);

  display: flex;
  min-height: 100vh;
  margin-top: auto;
  position: relative;
`;
