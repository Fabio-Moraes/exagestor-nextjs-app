'use client';

import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
  padding: 2rem;

  > div {
    display: flex;
    flex-direction: column;
    align-items: start;

    input[type='file'] {
      display: none;
    }

    > button,
    label {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 20rem;
      background-color: rgb(var(--color-secondary-04));
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
      box-shadow: 0px 3px 0px rgb(var(--color-secondary-02));

      &:active {
        transform: translateY(2px);
        box-shadow: none;
      }
    }
  }
`;

export const Title = styled.h1`
  font-size: 2.4rem;
  margin-bottom: 2.5rem;
  border-radius: 0.7rem;
  font-family: 'OpenSans-SemiBold';
  text-align: center;

  @media (min-width: 550px) {
    box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.5);
    height: 4rem;
    line-height: 4rem;
    background-color: rgb(var(--color-secondary-03));
    color: #fff;
    margin-bottom: 3rem;
  }
`;
