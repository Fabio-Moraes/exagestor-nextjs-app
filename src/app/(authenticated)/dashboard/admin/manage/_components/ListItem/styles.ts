'use client';

import styled, { css } from 'styled-components';

export const Container = styled.div<{ selected: boolean }>`
  background-color: #fff;

  ${(props) =>
    props.selected &&
    css`
      background-color: #8bc9a8;
    `};

  display: flex;
  align-items: end;
  justify-content: space-between;
  border: 0.2rem solid #27a567;
  margin: 0.5rem 1rem 0 1rem;
  border-radius: 0.7rem;
  padding: 0.5rem;
  cursor: pointer;

  button:nth-child(2) {
    border: 0.2rem solid #b3475b;
    background-color: #d9534f;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    margin-left: auto;
    margin-top: 0.1rem;
    color: #fff;
  }

  > button p {
    font-family: 'OpenSans-SemiBold';
    font-size: 1.2rem;
  }
`;

export const Reset = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  border-radius: 0.5rem;
  margin: 0 auto;
  padding-left: 1rem;
`;

export const ItemContainer = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;

  > p {
    text-align: start;
    padding: 0.23rem 0;
    width: 100%;
  }
`;
