'use client';

import styled, { css } from 'styled-components';

export const Container = styled.div<{ $isSelected: boolean }>`
  background-color: #fff;

  ${(props) =>
    props.$isSelected &&
    css`
      background-color: #8bc9a8;
    `};

  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid #27a567;
  margin: 5px 10px 0 10px;
  border-radius: 7px;
  padding: 5px;
  cursor: pointer;
`;

export const Reset = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  border-radius: 5px;
  margin: 0 auto;
  padding-left: 10px;
`;

export const ItemContainer = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;

  > p {
    text-align: start;
    padding: 2.3px 0px;
    width: 100%;
  }
`;
