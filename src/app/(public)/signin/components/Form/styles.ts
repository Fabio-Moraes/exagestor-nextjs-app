'use client';

import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const ErrorSpan = styled.span`
  display: flex;
  background-image: linear-gradient(to top, #FFEBE8, rgba(255, 235, 232, .9) );
  position: absolute;
  text-align: center;
  border: 2px solid #DD3C10;
  border-radius: 10px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.3s ease-in-out;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  > div {
    padding-top: 10px;
  }

  > span {
    white-space: nowrap;
    color: #000;
    padding: 0px 10px 10px 10px;
    font-weight: 400;
  }
`;

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
  min-height: 300px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;

  > div {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 2;
    padding-bottom: 70px;
    border-radius: 10px;
    > div {
      animation: ${rotateAnimation} 1s linear infinite;
    }
    //box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    //backdrop-filter: blur( 13.5px );
    //-webkit-backdrop-filter: blur( 13.5px );
  }
  background-color: #8956
`

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
  padding-top: 10px;
  background-color: #ffffff ;

   > div {
    display: flex;
    align-items: center;
    margin: 5px 7px 0px 0px;
    > strong {
    font-size: 22px;
  }
  } 
`;

export const Input = styled.input`
  padding: 10px;
  margin: 15px 20px 0px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  overflow-wrap: break-word;
  text-align: start;
  width: 80%; 

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #777;
  }
`;

export const Button = styled.button`
  width: 80%;  
  background-color: #27a567;
  padding: 10px;
  margin: 20px 20px;
  border-radius: 4px;
  font-size: 16px;
  color: #fff;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #27b466; /* Cor do botão ao passar o mouse */
  }
`;

export const ErrorContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    > span {
        text-align: left;
        font-size: 17px;
        color: #333;
    }

    > button {
        width: 150px;
        background-color: #27a567;
        padding: 10px;
        margin: 20px 20px;
        border: 1px solid #000000;
        border-radius: 4px;
        font-size: 16px;
        color: #fff
    }
`