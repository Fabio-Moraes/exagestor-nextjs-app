'use client';

import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
  padding: 2rem;
`;

export const Title = styled.h1`
  font-size: 2.4rem;
  margin-bottom: 2.5rem;
  border-radius: 0.7rem;
  font-family: 'OpenSans-SemiBold';
  text-align: center;

  @media (min-width: 550px) {
    box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.5);
    height: 4rem;
    line-height: 4rem;
    background-color: #5e9987;
    color: #fff;
    margin-bottom: 3rem;
  }
`;

export const ContainerSelecteddataCalendar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const WrapperSelectedDataCalendar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  > span {
    margin-inline: 0.5rem;
  }
`;

export const WrapperButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  border-radius: 30rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #8bc9a8;
  width: 4.5rem;
  margin-right: 1rem;
  align-items: center;

  &:active {
    transform: scale(0.95);
    opacity: 0.5;
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
    border-radius: 0.7rem;
    font-size: 1.6rem;
    color: #fff;
  }
`;
