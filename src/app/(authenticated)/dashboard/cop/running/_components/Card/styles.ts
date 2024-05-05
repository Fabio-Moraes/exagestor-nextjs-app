'use client';

import styled from 'styled-components';

export const Container = styled.li`
  display: flcex;
  flex-direction: column;
  margin-bottom: 3rem;
  overflow: hidden;
  width: 100%;
  border-radius: 0.7rem;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.3);
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  @media (min-width: 550px) {
    flex-direction: row;
  }
`;
