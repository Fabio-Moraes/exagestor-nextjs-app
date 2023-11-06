'use client';

import styled from 'styled-components';

export const Container = styled.div`
  background-color: #f0f2f5;
  position: relative;
  margin: 0 auto;
  height: 100%;
`;

export const Wrapper = styled.div`
  min-height: 100%;
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  height: 100%;
`;

export const Main = styled.main`
  user-select: none;
  flex-direction: column;
  width: min(601px, 100%);
  align-items: center;
  justify-content: center;
  display: flex;
  min-height: 100%;

  > div {
    position: absolute;

    @media (max-width: 550px) {
      top: 30px;
    }
  }
`;
