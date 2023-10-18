'use client';

import styled, { css } from 'styled-components';

export const ItemContainer = styled.div<{ selected: boolean }>`
  border: 2px solid #27A567;
  margin: 5px;
  padding: 5px;
  border-radius: 5px;
  text-align: start;
  cursor: pointer;
  background-color: #fff;
  ${props => props.selected && css`background-color: #8BC9A8`};
`;  