'use client';

import styled from 'styled-components';

export const Container = styled.li`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  overflow: hidden;
  width: 100%;
  border-radius: 7px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

export const CardHeader = styled.div<{ $path: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 5px;
  font-size: 18px;
  background-color: ${({ $path }) => $path};
  color: #ffffff;

  > p {
    background-color: #ffffff;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 80%;
    border-radius: 7px;
    padding: 2px 10px;
    font-family: 'OpenSans-SemiBold';
    color: #000;
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
