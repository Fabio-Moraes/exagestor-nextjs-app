'use client';

import styled from 'styled-components';

export const ListContainer = styled.div`
  margin-top: 2rem;
  border-radius: 0.7rem;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.1);
  border: 0.2rem solid rgb(var(--color-primary-04));

  overflow: hidden;

  > div:first-child {
    display: flex;
    padding: 1rem;
    background-color: rgb(var(--color-primary-04));
    flex-direction: column;
    align-items: center;
    margin-bottom: 0.9rem;

    > span {
      text-align: center;
      margin-top: 1rem;
      color: #fff;
    }

    > div {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      > div {
        display: flex;
        align-items: 'center';
        justify-content: flex-start;
        > button:nth-child(1) {
          width: 17rem;
        }

        > button:nth-child(2) {
          width: 8rem;
          margin-left: 1rem;
        }
      }
    }
  }

  > div:last-child {
    display: flex;
    padding: 1rem;
    background-color: rgb(var(--color-primary-04));
    margin-top: 0.9rem;

    justify-content: space-between;
    align-items: center;

    > button {
      width: 10rem;
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

export const Button = styled.button`
  display: block;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem;
  border-radius: 0.5rem;
  width: 18rem;
  background-color: #fff;
  border: 0.2rem solid rgb(var(--color-secondary-04));
  cursor: pointer;
`;

export const ItemsSkeleton = styled.div`
  background-color: #fff;

  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 0.2rem solid rgb(var(--color-secondary-04));
  margin: 0.5rem;
  border-radius: 0.5rem;

  min-height: 5rem;
  cursor: progress;

  > div:first-child {
    display: flex;
    margin: 0 1rem;
  }

  > div:last-child {
    display: flex;
    margin: 0 1rem 0 0;
  }
`;
