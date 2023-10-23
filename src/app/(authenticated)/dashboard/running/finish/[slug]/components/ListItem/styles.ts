'use client';

import styled, { css } from 'styled-components';

export const ItemContainer = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid #27A567;
  margin: 5px;
  padding: 5px 0px;
  border-radius: 5px;
  text-align: start;
  cursor: pointer;
  background-color: #fff;
  ${props => props.selected && css`background-color: #8BC9A8`};

  > p {
    text-align: start;
    width: 100%;
  } 

  > span {
   font-size: 30px;
   padding: 0px 15px;
  }
`;  