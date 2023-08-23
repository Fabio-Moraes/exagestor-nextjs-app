'use client';

import styled from 'styled-components';

export const greenTheme = {
  primaryColor: '#4CAF50',
  textColor: '#ffffff',
};

export const Loading = styled.div`
display: flex;
margin-top: 7px;
align-items: center;
justify-content: center;
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #ffffff; /* Fundo branco */
    margin: 30px;
  `;

export const Form = styled.form`
    padding: 20px;
    background-color: #2F4F4F; /* Cor de fundo do card */
    border-radius: 10px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); /* Sombra */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `;

export const Title = styled.h1`
    color: ${greenTheme.primaryColor};
    font-size: 28px;
    margin-bottom: 20px;
  `;

export const Input = styled.input`
    background-color: #ffffff; /* Fundo branco */
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc; /* Borda */
    border-radius: 5px;
    width: 100%;
  `;

export const Button = styled.button`
    margin-top: 10px;
    padding: 10px 20px;
    background-color: ${greenTheme.primaryColor};
    color: ${greenTheme.textColor};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 70%;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.3s ease;
  
    &:hover {
      background-color: #45a049; /* Cor do botão ao passar o mouse */
    }
  `;