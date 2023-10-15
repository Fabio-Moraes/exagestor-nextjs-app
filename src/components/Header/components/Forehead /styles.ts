'use client';

import styled from 'styled-components';

export const Container = styled.div`
  @media (max-width: 550px) {
    background-image: linear-gradient(to top, #a9c4b8, #ffffff, #ffffff);
    padding-left: 22px;
  }

  @media (min-width: 550px) {
    margin-left: 6px;
    margin-right: 10px;
  }
  
  z-index: 1000;
  top: 0;
  display: flex;
  align-items: center;
  text-align: left;
  padding: 8px 0 9px 13px;

  > div:last-child {
    display: flex;
    margin-right: 20px;
    height: 100%;
    background-image: linear-gradient(to top, #a9c4b8, #dce6dc);
    border: 2px solid #3f795e;
    border-radius: 7px;
    flex-direction: column;
    justify-content: center; 
    padding: 10px; 

   > span {
    outline: 0;
    text-align: end;
    font-weight: bold;
    white-space: nowrap;
    font-size: 15px;
    margin-bottom: 5px;
    color: #000
  }

    > button {
      border: 2px solid #3f795e;
      background: #27A567;
      box-shadow: -12px 0px 0px 0px rgba(0, 0, 0, 0.5);
      background-color: #fff;
      font-weight: bold;
      font-size: 14px;
      border-radius: 5px;
      padding: 3px 8px 3px 8px;
      cursor: pointer;
      margin-left: auto;

    &:hover {
     @media (min-width: 550px) {
      border: 2px solid #27A567;
      background-image: radial-gradient(60px at center, #27A567, #dce6dc);
      }
     } 
    }
  };
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 15px;
  width: 100%;
  
  > strong {
    color: #2d4535;
    font-size: 22px;
  }
  > span { 
    padding-left: 1px;
    font-size: 15px;
    color: var(--gray);
  }
`;
