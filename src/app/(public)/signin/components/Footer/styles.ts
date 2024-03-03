'use client';

import styled from 'styled-components';

export const Container = styled.footer`
  z-index: 1000;
  background-image: linear-gradient(to left, #3f795e, #3f7971, #3f795e);
  width: min(60.1rem, 100%);
  padding-top: 1rem;
  position: relative;
  bottom: 0;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
  }

  > div h1 {
    color: #fff;
    font-size: 1.3rem;
    text-align: center;
    margin: 0.7rem;
    margin-bottom: 1rem;
  }

  > span {
    color: #fff;
    display: block;
    font-size: 1.2rem;
    text-align: center;
    padding-bottom: 2rem;
  }
`;
