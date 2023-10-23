'use client';

import styled from 'styled-components';

export const Container = styled.div`
display: flex;
white-space: nowrap;
padding: 20px;
width: 100%;

flex-direction: column;
justify-content: space-between;

//background-color: #dce6dc;
align-items: center;

> p {
  margin-bottom: 15px;
  text-align: start;
  font-size: 16px;
  }

> div {
width: 100%;
  > p {
  margin-bottom: 10px;
  text-align: start;
  font-size: 15px;
  }
  
  > p:last-child {
  margin-bottom: 0px;
 }
}`