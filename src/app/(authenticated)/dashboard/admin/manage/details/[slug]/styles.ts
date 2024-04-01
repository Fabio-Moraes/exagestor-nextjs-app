'use client';

import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
  padding: 2rem;
`;

export const Title = styled.h1`
  font-size: 2.4rem;
  margin-bottom: 2rem;

  color: #333;

  @media (min-width: 550px) {
    height: 4rem;
    line-height: 4rem;
    background-color: #3c7d5d;
    color: #fff;
  }
`;

export const Wrapper = styled.div`
  font-size: 1.8rem;
  background-color: #fff;
  padding-bottom: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.4);
  align-items: center;

  display: flex;
  justify-content: space-around;
  flex-direction: column;

  > p {
    margin-top: 1rem;
  }

  > div:last-child {
    display: flex;
    margin: 0.8rem;
    padding: 1rem;
    background-color: #3f795e;
    border-radius: 0.5rem;

    justify-content: space-between;
    align-items: center;

    > span {
      width: 13rem;
    }
  }
`;

export const Info = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 1.2rem;
  margin-top: 1rem;

  > p {
    padding: 0 0.7rem;
    font-family: 'OpenSans-SemiBold';
    margin-bottom: 1rem;
    text-align: start;
    font-size: 1.3rem;
  }

  > p:last-child {
    margin-bottom: 0;
  }
`;

export const Table = styled.div`
  border: 0.2rem solid #000;
  border-radius: 0.5rem;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  > div:first-child {
    display: flex;
    flex-direction: row;
    border-bottom: 0.2rem solid #000;

    > div:first-child {
      width: 100%;
      background-color: #8bc9a8;
      border-left: 0;
      align-items: center;
      text-align: center;
      padding: 0 0.5rem;

      > span {
        font-family: 'OpenSans-SemiBold';
        font-size: 1.5rem;
      }
    }

    > div {
      min-width: 6.5rem;
      padding: 0 1rem;
      border-left: 0.2rem solid #000;
      background-color: #8bc9a8;
      text-align: center;

      > span {
        font-family: 'OpenSans-SemiBold';
        font-size: 1.5rem;
      }
    }
  }

  > div {
    display: flex;
    flex-direction: row;
    border-bottom: 0.2rem solid #000;

    > div:first-child {
      font-family: 'OpenSans-SemiBold';
      width: 100%;
      padding: 0.5rem;
      font-size: 1.3rem;
      border-left: 0;

      > span {
        text-align: start;
        width: 100%;
        font-size: 1.3rem;
      }
    }

    div {
      min-width: 6.5rem;
      border-left: 0.2rem solid #000;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      > span {
        font-family: 'OpenSans-SemiBold';
        font-size: 1.3rem;
      }
    }
  }

  > div:last-child {
    border-bottom: 0;
  }
`;

export const Observation = styled.div`
  border: 0.2rem solid #000;
  border-radius: 0.5rem;
  padding-bottom: 1rem;

  > p:first-child {
    font-family: 'OpenSans-SemiBold';
    padding: 1rem;
    border-bottom: 0.2rem solid #000;
    background-color: #8bc9a8;
    margin-bottom: 1rem;
    text-align: center;
    font-size: 1.5rem;
  }

  > p {
    padding: 0 1rem;
    margin-bottom: 0;
    text-align: start;
    font-size: 1.3rem;
    word-wrap: break-word;
  }
  > div {
    min-height: 1rem;
  }
`;

export const List = styled.div`
  padding: 2rem;
`;

export const Button = styled.button`
  display: flex;
  height: 3rem;
  width: auto;
  margin: 2rem 3rem 1.5rem 3rem;
  padding: 2rem 1.5rem;
  background-color: #3c7d5d;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  color: #fff;
  text-align: center;
  font-size: 1.6rem;
`;

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  > span {
    text-align: left;
    font-size: 1.7rem;
    color: #333;
  }

  > button {
    width: 15rem;
    background-color: #27a567;
    padding: 1rem;
    margin: 2rem 2rem;
    border: 0.1rem solid #000000;
    border-radius: 0.4rem;
    font-size: 1.6rem;
    color: #fff;
  }
`;

export const ProfileCompany = styled.div`
  border: 0.2rem solid #3f795e;
  display: flex;
  align-items: center;
  text-align: left;
  display: flex;
  height: 100%;
  background-image: radial-gradient(35rem at center, #ffffff 15%, #27a567);
  padding: 0.7rem;
  padding-left: 1.1rem;
  border-radius: 0.5rem;
  height: 6rem;
  margin-bottom: 1rem;
`;

export const ProfileInfoCompany = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  margin-right: 0.5rem;
  width: 100%;

  > h1 {
    font-family: 'OpenSans-Bold';
    color: #000;
    font-size: 1.4rem;
  }

  > span {
    font-family: 'OpenSans-Medium';
    font-size: 1.07rem;
    color: #000;
  }
`;
