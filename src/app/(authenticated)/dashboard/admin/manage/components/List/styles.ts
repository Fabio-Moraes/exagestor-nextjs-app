'use client';

import styled from 'styled-components';

export const ListContainer = styled.div`
  margin-top: 20px;
  padding-bottom: 10px;
  background-color: #ffffff;
  border-radius: 7px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 2px solid #3f795e;

  > div:first-child {
    display: flex;
    padding: 10px;
    background-color: #3f795e;
    flex-direction: column;
    align-items: center;
    margin-bottom: 9px;

    > div {
      display: flex;
      width: 100%;
      flex-direction: row;
      justify-content: space-between;

      > button {
        min-width: 20px;
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
  padding-left: 5px;
  border-radius: 50px;
  width: 100%;
  height: 35px;
  margin-bottom: 10px;
`;

export const SearchBar = styled.input`
  font-size: 16px;
  background-color: transparent;
  border-radius: 20px;
  width: 100%;
  outline: none;
  position: absolute;
  text-indent: 30px;

  &::placeholder {
    color: #333;
  }
`;

export const Button = styled.button`
  display: block;
  align-items: center;
  flex-shrink: 0;
  padding: 10px;
  border-radius: 5px;
  width: 120px;
  background-color: #fff;
  border: 2px solid #27a567;
  cursor: pointer;
`;

export const ItemsSkeleton = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  background-color: #fff;
  border: 2px solid #27a567;
  margin: 5px 10px 0 10px;
  padding: 5px;
  border-radius: 5px;
  cursor: progress;

  > div:last-child {
    margin-bottom: 0px;
  }
`;
