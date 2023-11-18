'use client';

import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  text-align: center;
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;

  @media (min-width: 550px) {
    height: 40px;
    line-height: 40px;
    background-color: #3c7d5d;
    color: #fff;
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  border: 2px solid #3f795e;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding-top: 15px;

  > div {
    display: flex;
    align-items: center;
  }

  > div:nth-last-child(2) {
    //background-color: #3f795e;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 10px;
  }

  > label {
    overflow-wrap: break-word;
    margin: 0px 20px 5px 20px;
    text-align: start;
  }
`;

export const Input = styled.input`
  padding: 10px;
  margin: 0px 20px 15px 20px;
  border: 1px solid #000000;
  border-radius: 4px;
  font-size: 16px;
  background-color: #fff;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #777;
  }
`;

export const PasswordInputContainer = styled.div`
  position: relative;
  width: 80%;
  // margin: 15px 20px 0px 20px;
`;

export const PasswordInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  overflow-wrap: break-word;
  text-align: start;
  width: 100%;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #777;
  }
`;

export const TogglePasswordVisibilityButton = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

export const Select = styled.select`
  padding: 10px;
  margin: 0px 20px 15px 20px;
  border: 1px solid #000000;
  border-radius: 4px;
  font-size: 16px;
  background-color: #fff;
  color: #777;

  &:focus {
    outline: none;
  }
`;

export const Option = styled.option`
  background-color: #fff;
  color: #777;
`;

export const CheckboxButton = styled.button<{ $checked: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0px 10px 10px 20px;

  > div {
    width: 20px;
    height: 20px;
    border: 2px solid #27a567;
    background-color: ${({ $checked }) => ($checked ? '#27a567' : '#fff')};
    border-radius: 10px;
  }
  > span {
    margin-left: 5px;
    font-size: 14px;
  }
`;

export const Button = styled.button`
  width: 150px;
  background-color: #27a567;
  padding: 10px;
  margin: 20px 20px;
  border: 1px solid #000000;
  border-radius: 4px;
  font-size: 16px;
  color: #fff;
`;
