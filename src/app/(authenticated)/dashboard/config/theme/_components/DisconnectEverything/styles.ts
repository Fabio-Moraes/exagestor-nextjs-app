'use client';

import styled from 'styled-components';

export const BoxButton = styled.div`
  display: flex;
  width: 17rem;
  height: 10rem;
  align-items: start;
  justify-content: space-between;
  flex-direction: column;

  overflow: hidden;
  //margin-bottom: 0.5rem;

  //padding-bottom: 1.3rem;
  backdrop-filter: blur(16px);
  -webki-backdrop-filter: blur(16px);
  background-color: rgba(30%, 30%, 30%, 0.5);
  border-radius: 0.3rem;

  > p {
    width: 100%;
    color: #ffffff;
    background-color: rgb(var(--color-primary-02));
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 100%;
  //border: 0.2rem solid rgb(var(--color-secondary-04));
  background-color: rgba(var(--color-primary-02));
  flex-shrink: 0;
  color: #fff;
  //padding: 0.7rem;
  //margin: 1rem;
  //border-radius: 1rem;
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

  transition: all 0.15s ease;
  box-shadow: 0px 3px 0px rgb(var(--color-secondary-02));

  &:active {
    transform: translateX(-5rem);
    box-shadow: none;
  }
`;
