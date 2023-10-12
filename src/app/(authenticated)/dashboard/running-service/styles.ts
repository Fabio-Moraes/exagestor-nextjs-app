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
      background-color: #3C7D5D;
      color: #fff;
    }
`;

export const ListContainer = styled.ul`
    list-style: none;
    padding: 0;
`;

export const ListItem = styled.li`
    font-size: 18px;
    margin-bottom: 30px;
    border: 2px solid #3f795e;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
    display: flex;
    justify-content: space-between;
    flex-direction:  column;

    @media (min-width: 550px) {
    flex-direction:  row;
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
