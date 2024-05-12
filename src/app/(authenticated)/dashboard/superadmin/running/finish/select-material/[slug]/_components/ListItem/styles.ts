'use client';

import styled, { css } from 'styled-components';

export const Container = styled.div<{ selected: boolean }>`
  background-color: #dedede;

  ${(props) =>
    props.selected &&
    css`
      background-color: #8bc9a8;
    `};

  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 0.2rem solid #27a567;
  margin: 0.5rem 1rem 0 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
`;

export const Reset = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  border-radius: 0.5rem;
  margin: 0.5rem;
  padding-left: 1rem;
`;

export const ItemContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

  > div {
    display: flex;
    flex-direction: column;
  }

  > p {
    text-align: start;
    width: 100%;
  }

  > span {
    font-size: 3rem;
    padding: 0 1.5rem;
  }
`;

export const SearchBar = styled.input`
  font-size: 3rem;
  padding: 0 0.5rem;
  margin: 0 0.5rem;
  background-color: #fff;
  border-radius: 0.5rem;
  width: 8rem;
  outline: none;
  text-align: center;
  &::placeholder {
    color: #333;
  }
`;

export const IncrementButton = styled.button`
  font-size: 2rem;
  background-color: #333;
  color: #fff;
  border-radius: 0.5rem;
  cursor: pointer;
  text-align: center;

  > span {
    transform: rotate(-90deg);
  }

  font-weight: 900;

  padding-bottom: 0.3rem;

  margin: 0.5rem;

  width: auto;
  height: 3rem;
`;

export const DecrementButton = styled.button`
  font-size: 2rem;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  text-align: center;

  font-weight: 900;

  > span {
    transform: rotate(-90deg);
  }

  padding-bottom: 0.3rem;

  margin: 0.5rem;

  width: auto;
  height: 3rem;
`;
