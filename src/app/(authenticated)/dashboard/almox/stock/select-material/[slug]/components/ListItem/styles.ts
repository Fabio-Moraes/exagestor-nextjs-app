'use client';

import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid #27a567;
  margin: 5px 10px 0 10px;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
`;

export const Reset = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  border-radius: 5px;
  margin: 5px;
  padding-left: 10px;
`;

export const ItemContainer = styled.div<{ selected: boolean }>`
  background-color: #f2f2f2;

  > div {
    height: 100%;
    background-color: #dedede;
    ${(props) =>
      props.selected &&
      css`
        background-color: #8bc9a8;
      `};
  }

  display: flex;
  width: 100%;
  align-items: center;
  height: 150px;

  > div {
    display: flex;
    flex-direction: column;
  }

  > p {
    text-align: start;
    width: 100%;
  }

  min-height: 100%;

  > span {
    text-align: start;
    min-height: 100%;
    font-size: 18px;
    padding: 0px 15px;
  }
`;

export const SearchBar = styled.input`
  font-size: 30px;
  padding: 0px 5px;
  margin: 0 5px;
  background-color: #fff;
  border-radius: 5px;
  width: 80px;
  outline: none;
  text-align: center;
  &::placeholder {
    color: #333;
  }
`;

export const IncrementButton = styled.button`
  font-size: 20px;
  background-color: #333;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;

  > span {
    transform: rotate(-90deg);
  }

  font-weight: 900;

  padding-bottom: 3px;

  margin: 5px;

  width: auto;
  height: 30px;
`;

export const DecrementButton = styled.button`
  font-size: 20px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  text-align: center;

  font-weight: 900;

  > span {
    transform: rotate(-90deg);
  }

  padding-bottom: 3px;

  margin: 5px;

  width: auto;
  height: 30px;
`;
