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
      background-color: #a9c4b8;
    }
`;

export const ListContainer = styled.ul`
    list-style: none;
    padding: 0;
`;

export const InfoContainer = styled.div`
    display: flex;
    white-space: nowrap;
    padding: 5px;
    width: 100%;

    flex-direction: column;
    justify-content: space-between;
    
    background-color: #E2FBEF;
    align-items: center;

   > div {
    width: 100%;

    > p {
    margin-bottom: 10px;
    text-align: start;
    font-size: 15px;
   }

   > p:last-child {
    margin-bottom: 0px;
   }
   }
`
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