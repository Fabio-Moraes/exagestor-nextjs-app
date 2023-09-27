'use client';

import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100%;
  position: relative;
  margin: 0 auto;
  height: 100%;
`;

export const Wrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  height: 100%;
`;

export const Main = styled.div`
  user-select: none;
  flex-direction: column;
  width: min(601px, 100%);
  
  display: flex;
  min-height: 100%;
  margin-top: auto;
  position: relative;
`;
