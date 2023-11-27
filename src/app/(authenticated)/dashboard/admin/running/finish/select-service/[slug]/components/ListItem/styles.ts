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
  align-items: center;
  justify-content: space-between;
  border: 2px solid #27a567;
  margin: 5px 10px 0 10px;
  border-radius: 5px;
  padding: 5px;
  min-height: 30px;
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

export const ItemContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

  > p {
    text-align: start;
    width: 100%;
  }

  > span {
    font-size: 30px;
    padding: 0px 15px;
  }
`;
