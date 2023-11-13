'use client';

import styled from 'styled-components';

export const ListContainer = styled.div`
  margin-top: 20px;
  background-color: #dce6dc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 2px solid #3f795e;

  > div:first-child {
    display: flex;
    padding: 10px;
    background-color: #3f795e;
    flex-direction: column;
    align-items: center;
    margin-bottom: 9px;

    > span {
      text-align: center;
      margin-top: 10px;
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
          width: 170px;
        }

        > button:nth-child(2) {
          width: 80px;
          margin-left: 10px;
        }
      }
    }
  }

  > div:last-child {
    display: flex;
    padding: 10px;
    background-color: #3f795e;
    margin-top: 9px;

    justify-content: space-between;
    align-items: center;

    > button {
      width: 100px;
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
  width: 180px;
  background-color: #fff;
  border: 2px solid #27a567;
  cursor: pointer;
`;

export const ItemsSkeleton = styled.div`
  background-color: #fff;

  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid #27a567;
  margin: 5px;
  border-radius: 5px;

  min-height: 50px;
  cursor: progress;

  > div:first-child {
    display: flex;
    margin: 0px 10px;
  }

  > div:last-child {
    display: flex;
    margin: 0 10px 0 0;
  }
`;
