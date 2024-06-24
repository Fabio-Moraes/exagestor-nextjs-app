'use client';

import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  text-align: center;
  padding: 2rem;
`;

export const Title = styled.h1`
  font-size: 2.4rem;
  margin-bottom: 2rem;

  color: #333;

  @media (min-width: 550px) {
    height: 4rem;
    line-height: 4rem;
    background-color: rgb(var(--color-primary-05));
    color: #fff;
  }
`;

export const Wrapper = styled.div`
  font-size: 1.8rem;
  background-color: #fff;
  padding-bottom: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.4);
  align-items: center;

  display: flex;
  justify-content: space-around;
  flex-direction: column;

  overflow: hidden;

  > p {
    margin-top: 1rem;
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

export const WrapperSpinner = styled.div`
  background-color: rgb(var(--color-primary-02));
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  width: 80%;
  padding-top: 1rem;
  padding-bottom: 2rem;
  margin-bottom: 2rem;

  > p {
    color: #fff;
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 2;
    border-radius: 1rem;
    > div {
      animation: ${rotateAnimation} 1s linear infinite;
    }
  }
`;

export const Info = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 2rem 2rem 0rem 2rem;
  margin-top: 1rem;

  > p {
    padding: 0 0.7rem;
    font-family: 'OpenSans-SemiBold';
    margin-bottom: 5rem;
    text-align: start;
    font-size: 2rem;
  }

  > p:last-child {
    margin-top: 1rem;
    font-size: 3rem;
  }
`;

export const WrapperButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
`;

export const Button = styled.button`
  display: flex;
  height: 3rem;
  width: auto;
  margin: 2rem 3rem 1.5rem 3rem;
  padding: 2rem 1.5rem;
  background-color: rgb(var(--color-primary-05));
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  color: #fff;
  text-align: center;
  font-size: 1.6rem;
  white-space: nowrap;
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
    background-color: rgb(var(--color-secondary-04));
    padding: 1rem;
    margin: 2rem 2rem;
    border: 0.1rem solid #000000;
    border-radius: 0.4rem;
    font-size: 1.6rem;
    color: #fff;
  }
`;
