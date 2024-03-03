'use client';

import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
  padding: 2rem;
`;

export const Title = styled.h1`
  font-size: 2.4rem;
  margin-bottom: 2rem;
  border-radius: 0.7rem;
  font-family: 'OpenSans-SemiBold';
  color: #333;

  @media (min-width: 550px) {
    box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.5);
    height: 4rem;
    line-height: 4rem;
    background-image: linear-gradient(to left, #8bc9a8, #dce6dc);
    color: #000;
  }
`;

export const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ListItem = styled.li`
  font-size: 1.8rem;
  margin-bottom: 3rem;
  border: 0.2rem solid #3f795e;
  border-radius: 0.5rem;
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
