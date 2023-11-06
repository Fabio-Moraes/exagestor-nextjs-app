'use client';

import styled from 'styled-components';

export const Container = styled.footer`
  z-index: 1000;
  background-image: linear-gradient(to left, #3f795e, #3f7971, #3f795e);
  width: min(601px, 100%);
  padding-top: 10px;
  margin-top: auto;
  position: relative;
  bottom: 0;

  @media (min-width: 550px) {
    border-radius: 12px 12px 0px 0px;
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
  }

  > div h1 {
    color: #fff;
    font-size: 13px;
    text-align: center;
    margin: 7px;
    margin-bottom: 10px;
  }

  > span {
    color: #fff;
    display: block;
    font-size: 12px;
    text-align: center;
    padding-bottom: 20px;
  }
`;
