'use client';

import Link from 'next/link';
import styled from 'styled-components';

export const Container = styled.div`
   white-space: nowrap;
   justify-content: center;
   display: flex;
   align-items: center;
   background-color: #3C7D5D;

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
    background-color: #fff;
  }

  > button:nth-child(1) {
    &:hover {
      @media (min-width: 550px) {
      border: 2px solid #db9100;
      background-image: radial-gradient(circle, #db9100, #fff);
      box-shadow: 0px 5px 10px 0px rgba(219, 145, 0, .5);
      }
    }
  }
    
  > button:nth-child(2)  {
    &:hover {
      @media (min-width: 550px) {
      border: 2px solid #c72323;
      background-image: radial-gradient(circle, #c72323, #fff);
      box-shadow: 0px 5px 10px 0px rgba(199, 35, 35, .5);
      }
    }
  }
`

export const ButtonFinish = styled(Link)`
 width: 75px;
 border-radius: 5px;
 margin: 10px;
 padding: 2px;
 cursor: pointer;
 border: 2px solid #3f795e;
 background-color: #fff;

 > span {
    font-size: 15px;
 }

 &:hover {
      @media (min-width: 550px) {
      border: 2px solid #27A567;
      background-image: radial-gradient(circle, #27A567, #fff);
      box-shadow: 0px 5px 10px 0px rgba(39, 165, 103, .5);
      }
    }
`;