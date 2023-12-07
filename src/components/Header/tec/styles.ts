'use client';

import styled from 'styled-components';

export const Container = styled.div`
  z-index: 1000;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px 9px 15px;

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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  background-color: #8bc9a8;
  /*  background-image: linear-gradient(to top, #8bc9a8, #dce6dc); */
  border-radius: 7px;
  flex-direction: column;
  justify-content: center;
  width: 120px;
  height: 70px;
  align-items: end;
  padding: 0 6px 3px 4px;

  > span {
    margin-right: 1px;
    padding-left: 5px;
    outline: 0;
    text-align: start;
    white-space: nowrap;
    font-size: 15px;
    margin-bottom: 5px;
    font-family: 'OpenSans-SemiBold';
    color: #111111;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 20px;
    width: 100%;
  }

  > div {
    display: flex;
    width: 100%;

    > button {
      border: 2px solid #27a567;
      background: #27a567;
      box-shadow: -12px 0px 0px 0px rgba(0, 0, 0, 0.5);
      background-color: #fff;
      border-radius: 5px;
      padding: 2px 7px 2px 7px;
      cursor: pointer;
      margin-left: auto;
      margin-top: 1px;

      &:hover {
        @media (min-width: 550px) {
          border: 2px solid #27a567;
          background-image: radial-gradient(60px at center, #27a567, #dce6dc);
        }
      }
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: center;

      > span {
        font-family: 'OpenSans-SemiBold';
        color: #000;
        font-size: 12px;
      }
    }

    > button h2 {
      font-family: 'OpenSans-SemiBold';
      font-size: 12px;
    }
  }
`;

export const ProfileCompany = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
  background-color: #8bc9a8;
  display: flex;
  height: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  /*background-image: linear-gradient(to top, #8bc9a8, #dce6dc);*/
  padding: 7px;
  padding-left: 11px;
  border-radius: 7px;
  height: 70px;
`;

export const ProfileInfoCompany = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  margin-right: 5px;
  width: 100%;

  > h1 {
    font-family: 'OpenSans-Bold';
    color: #000;
    font-size: 18px;
  }

  > span {
    font-family: 'OpenSans-Medium';
    font-size: 13.8px;
    color: #000;
  }
`;
