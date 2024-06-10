'use client';

import styled from 'styled-components';

export const ListContainer = styled.div`
  margin-top: 1rem;
  padding-bottom: 1rem;
  border-radius: 0.7rem;
  /* position: relative; */

  > button {
    background-color: var(--color-palette-vibrant-100);
    align-items: center;
    flex-shrink: 0;
    border-radius: 0.5rem;
    width: 10rem;
    margin-bottom: 3rem;
    cursor: pointer;
    user-select: none;

    > p {
      text-align: center;
      width: 100%;
      color: #fff;
    }

    display: flex;
    height: 4.5rem;

    transition: all 0.05s ease;
    box-shadow: 0px 3px 0px var(--color-palette-primary-200);

    &:active {
      transform: translateY(2px);
      box-shadow: none;
    }
  }

  > div:first-child {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;

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
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 4rem;
  border-radius: 0.5rem;
  background-color: #fafafa;
  margin: 0rem 0 2rem 0;
  outline: 0.1rem solid #ccc;

  &:focus-within {
    outline: 0.2rem solid var(--color-palette-vibrant-100);
  }

  @media (min-width: 550px) {
    margin: 1rem 0 2rem 0;
  }
`;

export const SearchBar = styled.input`
  flex-grow: 1;
  font-size: 1.6rem;
  text-indent: 3rem;
  height: 100%;
  padding-left: 0.7rem;
  text-indent: 0;

  &::placeholder {
    color: #666;
  }
`;

export const Button = styled.button`
  display: block;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem;
  border-radius: 0.5rem;
  width: 16rem;
  background-color: var(--color-palette-primary-200);
  cursor: pointer;
`;

export const ItemsSkeleton = styled.div`
  background-image: linear-gradient(
    45deg,
    var(--color-palette-base-100) 65%,
    var(--color-palette-primary-200)
  );
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin: 0rem 0rem 2.8rem 0rem;
  border-radius: 0.7rem;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  min-height: 18rem;

  > div:first-child {
    display: flex;
    margin: 0;
    flex-direction: column;
    background-color: #f2f2f0;
    border-radius: 0 0 0.5rem 0;
    width: 17rem;
    line-height: 1.2;
    padding: 0.5rem 0 0 0.5rem;
    height: 4.6rem;
  }

  > div {
    margin: 0.5rem;
    margin-bottom: 0;
  }
`;

/* 
> div::before {
      content: '';
      background-color: #000;
      display: block;
      position: absolute;
      inset: 0;
      z-index: -1;
      transition: transform 300ms ease;
      transform-origin: right;
      transform: scaleX(0);
    }

    > div:hover::before {
      transform: scaleX(1);
      transform-origin: left;
    } 
*/
