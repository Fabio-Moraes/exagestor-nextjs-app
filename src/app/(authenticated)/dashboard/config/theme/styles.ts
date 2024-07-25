'use client';

import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
  padding: 2rem;
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

export const ContainerButton = styled.div`
  display: grid;
  grid-gap: 5px;
  padding: 0.5rem;
  align-items: center;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, 175px);
  grid-template-rows: repeat(2, 105px);
  border-radius: 0.7rem;

  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;

  background-image: linear-gradient(
    to right top,
    rgba(var(--color-primary-04), 1),
    rgba(var(--color-primary-03), 0.7),
    rgba(var(--color-primary-03), 0.6),
    rgba(var(--color-primary-01), 0.7)
  );
`;

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
  background-color: rgba(0%, 0%, 0%, 0.3);
  border-radius: 0.3rem;

  > p {
    width: 100%;
    color: #ffffff;
    background-color: rgb(var(--color-primary-02));
  }
`;
