'use client';

import styled from 'styled-components';

export const Container = styled.li`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
  overflow: hidden;
  width: 100%;
  border-radius: 0.7rem;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.3);
`;

export const CardHeader = styled.div<{ $path: string }>`
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 0.4rem 0.2rem;
  background-color: ${({ $path }) => $path};

  > p {
    background-color: #fff;
    border-radius: 0.3rem;
    padding: 0.5rem;
    font-family: 'OpenSans-SemiBold';
    color: #000;
    margin: 0.3rem 0.5rem;
    font-size: 1.5rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 100%;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  @media (min-width: 550px) {
    flex-direction: row;
  }
`;
