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

export const CheckboxButton = styled.button<{ $checked: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0rem;
  margin-bottom: 1rem;
  padding-left: 1rem;

  > div {
    width: 2rem;
    height: 2rem;
    border: 0.2rem solid rgb(var(--color-secondary-04));
    background-color: ${({ $checked }) => ($checked ? 'rgb(var(--color-primary-02))' : '#fff')};
    border-radius: 1rem;
  }
  > span {
    margin-left: 0.5rem;
    font-size: 1.4rem;
    color: #ffffff;
  }
`;
