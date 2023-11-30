'use client';

import styled from 'styled-components';

export const Container = styled.div`
  white-space: nowrap;
  justify-content: center;
  display: flex;
  align-items: center;
  background-color: #8bc9a8;
  border-width: 2px 0 0 0;

  @media (min-width: 550px) {
    right: 30px;
    flex-direction: column;
  }

  > button {
    padding-top: 2px;
    margin: 5px 20px;
    cursor: pointer;
    font-size: 15px;

    @media (min-width: 550px) {
      &:hover {
        filter: brightness(120%) contrast(150%) saturate(200%) sepia(50%);
      }
    }

    > p {
      color: #000;
      margin-top: -5px;
      font-weight: bold;
      font-size: 12px;
    }

    @media (min-width: 550px) {
      margin: 10px 10px;
    }
  }
`;
