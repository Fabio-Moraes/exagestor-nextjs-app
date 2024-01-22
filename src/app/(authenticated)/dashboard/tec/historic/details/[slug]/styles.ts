'use client';

import styled from 'styled-components';

export const Container = styled.div`
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
    background-color: #3c7d5d;
    color: #fff;
  }
`;

export const Wrapper = styled.div`
  font-size: 18px;
  background-color: #fff;
  padding-bottom: 5px;
  //border: 2px solid #3f795e;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  align-items: center;

  display: flex;
  justify-content: space-around;
  flex-direction: column;

  > p {
    margin-top: 10px;
  }

  > div:last-child {
    display: flex;
    margin: 8px;
    padding: 10px;
    background-color: #3f795e;
    border-radius: 5px;

    justify-content: space-between;
    align-items: center;

    > span {
      width: 130px;
    }
  }
`;

export const Info = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 12px;
  margin-top: 10px;

  > p {
    padding: 0 7px;
    font-family: 'OpenSans-Medium';
    margin-bottom: 10px;
    text-align: start;
    font-size: 12px;
  }

  > p:last-child {
    margin-bottom: 0px;
  }
`;

export const Observation = styled.div`
  border: 2px solid #3f795e;
  border-radius: 5px;
  padding-bottom: 10px;

  > p:first-child {
    padding: 3px;
    font-family: 'OpenSans-Medium';
    border-bottom: 2px solid #3f795e;
    background-image: radial-gradient(350px at center, #ffffff 15%, #27a567);
    margin-bottom: 10px;
    text-align: center;
    font-size: 12px;
  }

  > p {
    padding: 0 10px;
    margin-bottom: 0px;
    text-align: start;
    font-size: 13px;
  }
  > div {
    min-height: 10px;
  }
`;

export const List = styled.div`
  padding: 20px;
`;

export const Button = styled.button`
  display: flex;
  height: 30px;
  width: auto;
  margin: 20px 30px 15px 30px;
  padding: 20px 15px;
  background-color: #3c7d5d;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  color: #fff;
  text-align: center;
  font-size: 16px;
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
    color: #fff;
  }
`;

export const ProfileCompany = styled.div`
  border: 2px solid #3f795e;
  display: flex;
  align-items: center;
  text-align: left;
  display: flex;
  height: 100%;
  //box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  background-image: radial-gradient(350px at center, #ffffff 15%, #27a567);
  padding: 7px;
  padding-left: 11px;
  border-radius: 5px;
  height: 60px;
  margin-bottom: 10px;
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
    font-size: 14px;
  }

  > span {
    font-family: 'OpenSans-Medium';
    font-size: 10.7px;
    color: #000;
  }
`;
