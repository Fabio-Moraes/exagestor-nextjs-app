'use client';

import styled from 'styled-components';

export const Container = styled.footer`
  z-index: 1000;
  margin-top: auto;
  position: relative;
  @media (min-width: 550px) {
    padding: 0 2rem 0 2rem;
  }
`;

export const Wrapper = styled.div`
  background-image: linear-gradient(90deg, #68b790, #3f7971 20%, #3f7971 80%, #68b790);
  width: min(60.1rem, 100%);
  padding-top: 1rem;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.3);
  bottom: 0;

  @media (min-width: 550px) {
    border-radius: 0.7rem 0.7rem 0 0;
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  > div h1 {
    color: #fff;
    font-size: 1.36rem;
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
    margin-left: 0.5rem;
  }
`;
