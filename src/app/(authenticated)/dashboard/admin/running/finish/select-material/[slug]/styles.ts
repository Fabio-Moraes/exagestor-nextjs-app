'use client';

import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  text-align: center;
  padding: 20px;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  color: #333;
  padding: 8px;
  align-items: center;
  justify-content: center;

  > h1 {
    font-size: 30px;
    margin-bottom: 3px;
  }

  > span {
    font-size: 17px;
  }

  @media (min-width: 550px) {
    background-color: #3c7d5d;
    color: #fff;
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  > span {
    text-align: left;
    font-size: 17px;
    color: #333;
  }

  > button {
    width: 150px;
    background-color: #27a567;
    padding: 10px;
    margin: 20px 20px;
    border: 1px solid #000000;
    border-radius: 4px;
    font-size: 16px;
    color: #fff;
  }
`;
