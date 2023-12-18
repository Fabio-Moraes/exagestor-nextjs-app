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

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px;
  font-size: 18px;
  background-color: #3c7d5d;
  color: #ffffff;

  > p {
    font-family: 'OpenSans-SemiBold';
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
