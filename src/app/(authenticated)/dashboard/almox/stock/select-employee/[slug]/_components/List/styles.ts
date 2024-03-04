'use client';

import styled, { css } from 'styled-components';

export const ListContainer = styled.div`
  margin-top: 2rem;
  background-color: #ffffff;
  border-radius: 0.7rem;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.1);
  border: 0.2rem solid #3f795e;

  > div:first-child {
    display: flex;
    padding: 1rem;
    background-color: #3f795e;
    flex-direction: column;
    align-items: center;
    margin-bottom: 0.9rem;

    > div {
      display: flex;
      width: 100%;
      flex-direction: row;
      justify-content: space-between;

      > button {
        min-width: 2rem;
      }
    }
  }
`;

export const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: row;
  background-color: #fff;
  padding-left: 0.5rem;
  border-radius: 5rem;
  width: 100%;
  height: 3.5rem;
  margin-bottom: 1rem;
`;

export const SearchBar = styled.input`
  font-size: 1.6rem;
  background-color: transparent;
  border-radius: 2rem;
  width: 100%;
  outline: none;
  position: absolute;
  text-indent: 3rem;

  &::placeholder {
    color: #333;
  }
`;

export const ContainerButton = styled.div<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem;
  background-color: #3f795e;
  align-items: center;
  margin-top: 0.9rem;

  > button:last-child {
    opacity: 0.5;

    ${(props) =>
      props.$isSelected &&
      css`
        opacity: 1;
      `};
  }
`;

export const Button = styled.button`
  display: block;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem;
  border-radius: 0.5rem;
  width: 12rem;
  background-color: #fff;
  border: 0.2rem solid #27a567;
  cursor: pointer;
`;

export const ItemsSkeleton = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  background-color: #fff;
  border: 0.2rem solid #27a567;
  margin: 0.5rem 1rem 0 1rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: progress;

  > div:last-child {
    margin-bottom: 0;
  }
`;
