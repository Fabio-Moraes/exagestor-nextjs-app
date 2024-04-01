'use client';

import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
  padding: 2rem;
`;

export const Title = styled.h1`
  font-size: 2.4rem;
  margin-bottom: 2rem;
  border-radius: 0.7rem;
  font-family: 'OpenSans-SemiBold';

  @media (min-width: 550px) {
    box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.5);
    height: 4rem;
    line-height: 4rem;
    background-color: #5e9987;
    color: #fff;
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding-top: 1.5rem;

  > div {
    display: flex;
    align-items: center;
  }

  > div:nth-last-child(2) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 1rem;
  }

  > label {
    overflow-wrap: break-word;
    margin: 0 2rem 0.5rem 2rem;
    text-align: start;
  }
`;

export const Input = styled.input`
  padding: 1rem;
  margin: 0 0rem 1.5rem 0rem;
  font-size: 1.6rem;
  background-color: #fafafa;
  border-radius: 0.5rem;
  outline: 0.1rem solid #ccc;
  font-family: 'OpenSans-Regular';

  &:focus {
    outline: 0.2rem solid #27a567;
  }

  &::placeholder {
    color: #666;
  }
`;

export const PasswordInputContainer = styled.div`
  position: relative;
  width: 80%;
`;

export const PasswordInput = styled.input`
  padding: 1rem;
  border: 0.1rem solid #ccc;
  border-radius: 0.5rem;
  font-size: 1.6rem;
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
  right: 1rem;
  transform: translateY(-50%);
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

export const CheckboxButton = styled.button<{ $checked: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0 1rem 1rem 0.5rem;

  > div {
    width: 2rem;
    height: 2rem;
    border: 0.2rem solid #27a567;
    background-color: ${({ $checked }) => ($checked ? '#27A567' : '#fff')};
    border-radius: 1rem;
  }
  > span {
    margin-left: 0.5rem;
    font-size: 1.4rem;
  }
`;

export const Button = styled.button`
  width: 15rem;
  background-color: #27a567;
  padding: 1rem;
  margin: 2rem 2rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.6rem;
  color: #fff;

  &:hover {
    background-color: #00796b;
  }

  &:focus {
    outline: none;
  }
`;

/* export const Button = styled.button`
  width: 100%;
  background-color: #27A567;
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.6rem;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #00796b;
  }

  &:focus {
    outline: none;
  }
`; */

//////////////////////////////////////////////////
/* 
'use client';

import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
  padding: 2rem;
`;

export const Title = styled.h1`
  font-size: 2.4rem;
  border-radius: 0.7rem;
  font-family: 'OpenSans-SemiBold';
  color: #333;
  padding: 1rem;

  @media (min-width: 550px) {
    box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.5);
    height: 4rem;
    line-height: 4rem;
    background-image: linear-gradient(to left, #27A567, #7bdcb5);
    color: #fff;
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  border-radius: 0.7rem;
  background-color: #f5f5f5;
  padding: 1.5rem 2rem;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.1);
`;

export const Input = styled.input`
  padding: 1rem;
  margin-bottom: 1.5rem;
  border: 0.1rem solid #ccc;
  border-radius: 0.5rem;
  font-size: 1.6rem;
  background-color: #fafafa;

  &:focus {
    outline: none;
    border-color: #27A567;
  }

  &::placeholder {
    color: #999;
  }
`;

export const PasswordInputContainer = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

export const PasswordInput = styled(Input)`
  width: 100%;
`;

export const TogglePasswordVisibilityButton = styled.button`
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  cursor: pointer;
  background: none;
  border: none;
  &:focus {
    outline: none;
  }
`;

export const Select = styled.select`
  padding: 1rem;
  margin-bottom: 1.5rem;
  border: 0.1rem solid #ccc;
  border-radius: 0.5rem;
  font-size: 1.6rem;
  background-color: #fff;
  color: #777;

  &:focus {
    outline: none;
    border-color: #27A567;
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
  margin-bottom: 1.5rem;

  > div {
    width: 2rem;
    height: 2rem;
    border: 0.2rem solid #27A567;
    background-color: ${({ $checked }) => ($checked ? '#27A567' : '#fff')};
    border-radius: 1rem;
  }
  > span {
    margin-left: 0.5rem;
    font-size: 1.6rem;
    color: #333;
  }
`;

export const Button = styled.button`
  width: 100%;
  background-color: #27A567;
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.6rem;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #00796b;
  }

  &:focus {
    outline: none;
  }
`;
 */
