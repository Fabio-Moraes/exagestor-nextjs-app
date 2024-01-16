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
  border: 2px solid #3f795e;
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
  padding: 0 20px 0 20px;
  margin-top: 10px;

  > p {
    margin-bottom: 10px;
    text-align: start;
    font-size: 15px;
  }

  > p:last-child {
    margin-bottom: 0px;
  }
`;

export const Observation = styled.div`
  border: 2px solid #3f795e;
  border-radius: 5px;
  padding-bottom: 10px;

  > h2 {
    font-size: 20px;
    padding-bottom: 10px;
  }

  > p:first-child {
    padding: 5px;
    border-bottom: 2px solid #3f795e;
    background-image: radial-gradient(350px at center, #ffffff 15%, #27a567);
    margin-bottom: 10px;
    text-align: center;
    font-size: 15px;
  }

  > p {
    padding: 0 20px;
    margin-bottom: 0px;
    text-align: start;
    font-size: 15px;
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
