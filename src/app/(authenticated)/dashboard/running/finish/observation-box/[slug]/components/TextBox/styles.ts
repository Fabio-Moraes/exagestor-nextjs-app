'use client';

import styled, { keyframes } from 'styled-components';

import { lighten } from 'polished';

export const ListContainer = styled.div`
  margin-top: 20px;
  background-color: #dce6dc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 2px solid #3f795e;

  > p {
    text-align: end;
    padding-right: 10px;
    margin-bottom: 7px;
  }

  > div:first-child {
    display: flex;
    margin: 8px;
    background-color: #fff;
    border-radius: 5px;

    border: 2px solid #3f795e;

    justify-content: space-between;
    align-items: center;

    > button {
      width: 130px;
    }
  }

  > div:last-child {
    display: flex;
    padding: 10px;
    background-color: #3f795e;

    justify-content: space-between;
    align-items: center;

    > button {
      width: 100px;
    }
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

const animation = keyframes`
  from {
    background-position: 0% 0%;
  }
  
  to {
    background-position: 135% 0%;
  }
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
    border-radius: 5px;
    height: 30px;
    width: 35px;
    margin: 0px 10px 0 10px;

    background: linear-gradient(
      -90deg,
      #6ab78e 0%,
      ${lighten(0.2, '#6AB78E')} 50%,
      #6ab78e 100%
    );

    background-size: 400% 400%;
    animation: ${animation} 1.2s ease-in-out infinite;
  }

  > div {
    display: flex;
    border-radius: 5px;
    height: 30px;
    width: 100%;
    margin-right: 10px;

    background: linear-gradient(
      -90deg,
      #6ab78e 0%,
      ${lighten(0.2, '#6AB78E')} 50%,
      #6ab78e 100%
    );

    background-size: 400% 400%;
    animation: ${animation} 1.2s ease-in-out infinite;
  }
`;

export const InputContainer = styled.div`
  margin-bottom: 20px;
`;

export const Input = styled.textarea`
  width: 100%;
  height: 150px;
  font-size: 16px;
  padding: 10px;
  resize: none;

  font-size: 16px;
  font-family: Arial, sans-serif;
  color: black;
  position: relative;

  &:focus {
    outline: none;
  }
`;
