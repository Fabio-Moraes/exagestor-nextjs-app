'use client';

import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  margin: 0 auto;
`;

export const Wrapper = styled.div`
  max-width: 100%;
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
