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

export const MenuContainer = styled.div`
   white-space: nowrap;
   justify-content: center;
   display: flex;
   align-items: center;
   background-color: #a9c4b8;

   @media (min-width: 550px) {
    flex-direction: column;
    }

  > button {
    width: 75px;
    border-radius: 5px;
    margin: 10px;
    padding: 5px;
    cursor: pointer;
    border: 2px solid #3f795e;
    background-image: radial-gradient(circle, #dce6dc, #809e91);
  }
  
  > button:nth-child(1){
    &:hover {
      @media (min-width: 550px) {
      border: 2px solid #27A567;
      background-image: radial-gradient(circle, #27A567, #dce6dc);
      box-shadow: 0px 5px 10px 0px rgba(39, 165, 103, .5);
      }
    }
  }

  > button:nth-child(2) {
    &:hover {
      @media (min-width: 550px) {
      border: 2px solid #db9100;
      background-image: radial-gradient(circle, #db9100, #dce6dc);
      box-shadow: 0px 5px 10px 0px rgba(219, 145, 0, .5);
      }
    }
  }
    
  > button:nth-child(3)  {
    &:hover {
      @media (min-width: 550px) {
      border: 2px solid #c72323;
      background-image: radial-gradient(circle, #c72323, #dce6dc);
      box-shadow: 0px 5px 10px 0px rgba(199, 35, 35, .5);
      }
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