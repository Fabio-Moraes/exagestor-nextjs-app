'use client';

import styled, { keyframes } from 'styled-components';

import { lighten } from 'polished';

export const Container = styled.div`
  z-index: 1000;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 13px 9px 13px;

  @media (max-width: 550px) {
    background-image: linear-gradient(to top, #a9c4b8, #ffffff, #ffffff);
  }

  @media (min-width: 550px) {
    margin-left: 6px;
    margin-right: 10px;
  }
`;

export const ProfileUser = styled.div`
  display: flex;
  height: 100%;
  background-image: linear-gradient(to top, #ffd700, #dce6dc);
  border: 2px solid #d4a13b;
  border-radius: 7px;
  flex-direction: column;
  justify-content: center;
  padding: 7px;
  width: 115px;
  height: 70px;
  align-items: end;

  > span {
    margin-right: 1px;
    outline: 0;
    text-align: end;
    white-space: nowrap;
    font-size: 15px;
    margin-bottom: 5px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    color: #111111;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 20px;
    width: 100%;
  }

  > div {
    padding-left: 4px;
    display: flex;
    width: 100%;

    > button {
      border: 2px solid #d4a13b;
      background: #27a567;
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
          border: 2px solid #d4a13b;
          background-image: radial-gradient(60px at center, #d4a13b, #dce6dc);
        }
      }
    }
  }
`;

const animation = keyframes`
  from {
    background-position: 0% 0%;
  }
  
  to {
    background-position: 135% 0%;
  }
`;

export const ProfileUserNameSkeleton = styled.div`
  border-radius: 5px;
  height: 20px;
  width: 90px;
  margin-bottom: 5px;

  background: linear-gradient(
    -90deg,
    #b78e6a 0%,
    ${lighten(0.2, '#b78e6a')} 50%,
    #b78e6a 100%
  );

  background-size: 400% 400%;
  animation: ${animation} 1.2s ease-in-out infinite;
`;

export const ProfileCompany = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
`;

export const ProfileInfoCompany = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  width: 100%;

  > strong {
    color: #111111;
    font-size: 18px;
    font-family: Arial, Helvetica, sans-serif;
  }
  > span {
    padding-left: 1px;
    font-size: 14px;
    color: var(--gray);
  }
`;
