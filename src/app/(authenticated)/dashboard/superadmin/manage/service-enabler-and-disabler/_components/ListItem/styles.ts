'use client';

import styled, { css } from 'styled-components';

export const Container = styled.div<{ selected: boolean }>`
  background-color: #e0e0e0;

  ${(props) =>
    props.selected
      ? css`
          background-color: rgba(0, 179, 126, 0.3);
        `
      : css`
          background-color: rgba(178, 34, 34, 0.5);
        `};

  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 0.2rem solid rgb(var(--color-secondary-04));
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

export const ItemContainer = styled.div<{ selected: boolean }>`
  display: flex;
  width: 100%;
  align-items: center;
  height: 10rem;
  padding: 0 1rem;

  > button {
    ${(props) =>
      props.selected
        ? css`
            border: 0.2rem solid #00b37e;
            background-color: rgba(0, 179, 126, 0.5);
            box-shadow: 1.2rem 0 0 0 rgba(0, 0, 0, 0.5);
            margin-right: 1.2rem;

            &:hover {
              @media (min-width: 550px) {
                border: 0.2rem solid #00b37e;
                background-image: radial-gradient(6rem at center, #00b37e, #dce6dc);
              }
            }
          `
        : css`
            border: 0.2rem solid #b22222;
            background-color: rgba(178, 34, 34, 0.5);
            box-shadow: -1.2rem 0 0 0 rgba(0, 0, 0, 0.5);

            &:hover {
              @media (min-width: 550px) {
                border: 0.2rem solid #b22222;
                background-image: radial-gradient(6rem at center, #b22222, #dce6dc);
              }
            }
          `};

    border-radius: 0.5rem;
    padding: 0.2rem 0.7rem 0.2rem 0.7rem;
    cursor: pointer;
    margin-left: auto;
    margin-top: 0.1rem;
    max-height: 2.5rem;

    height: 3rem;
    width: 5rem;
  }

  > div {
    display: flex;
    flex-direction: column;
  }

  > p {
    padding-right: 3rem;
    text-align: start;
    width: 100%;
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
