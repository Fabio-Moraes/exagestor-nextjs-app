'use client';

import styled from 'styled-components';

export const Container = styled.div`
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

export const Main = styled.div`
  user-select: none;
  flex-direction: column;
  width: min(601px, 100%);
  
  display: flex;
  min-height: 100%;
  margin-top: auto;
  position: relative;
  //background: hotpink;

  //border-left: 3px solid #7a7a7a;

  @media (min-width: 550px) {
    //border-left: 1px solid #7a7a7a;
    //border-right: 1px solid #7a7a7a;
    //border-bottom: 1px solid #2f3336;
  }
`;
