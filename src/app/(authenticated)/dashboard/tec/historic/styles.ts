'use client';

import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  text-align: center;
  padding: 2rem;
`;

export const Title = styled.h1`
  font-size: 2.4rem;
  margin-bottom: 2rem;
  border-radius: 0.7rem;
  font-family: 'OpenSans-SemiBold';

  @media (min-width: 550px) {
    box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.5);
    height: 4rem;
    line-height: 4rem;
    background-color: #5e9987;
    color: #fff;
  }
`;

export const ListContainer = styled.ul`
  list-style: none;
  padding: 0;

  > button {
    width: 20rem;
    background-color: #27a567;
    flex-shrink: 0;
    color: #fff;
    padding: 0.7rem;
    margin: 1rem 0 2rem 0;
    border-radius: 3rem;
    font-size: 1.6rem;
    user-select: none;

    > div {
      display: flex;
      flex-direction: row;
      width: 100%;
      > p {
        text-align: center;
        width: 100%;
      }
    }

    transition: all 0.05s ease;
    box-shadow: 0px 3px 0px #8bc9a8;

    &:active {
      transform: translateY(2px);
      box-shadow: none;
    }
  }
`;

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  display: flex;
  justify-content: center;
  > div {
    animation-name: ${rotateAnimation};
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
`;

export const ListItem = styled.li`
  font-size: 1.8rem;
  margin-bottom: 3rem;
  background-color: #fff;
  border: 0.2rem solid #3f795e;
  border-radius: 0.7rem;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.4);

  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  > span {
    text-align: left;
    font-size: 1.7rem;
    color: #333;
  }

  > button {
    width: 15rem;
    background-color: #27a567;
    padding: 1rem;
    margin: 2rem 2rem;
    border: 0.1rem solid #000000;
    border-radius: 0.4rem;
    font-size: 1.6rem;
    color: #fff;
  }
`;
