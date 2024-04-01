'use client';

import styled from 'styled-components';

export const Container = styled.div`
  z-index: 1000;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.8rem 1.5rem 1.5rem 1.5rem;

  @media (max-width: 550px) {
    background-image: linear-gradient(
      49deg,
      #92d3b3 10%,
      #b1d6c3 15%,
      #ffffff 30%,
      #ffffff 50%,
      #b1d6c3 70%,
      #92d3b3
    );
  }

  @media (min-width: 550px) {
    margin-left: 0.6rem;
    margin-right: 1rem;
  }
`;

export const ProfileUser = styled.div`
  display: flex;
  height: 100%;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.5);
  background-image: linear-gradient(to top, #ffd700, #dce6dc);
  border-radius: 0.7rem;
  flex-direction: column;
  justify-content: center;
  width: 14rem;
  height: 7rem;
  align-items: end;
  padding: 0 0.6rem 0.3rem 0.4rem;

  > span {
    margin-right: 0.1rem;
    padding-left: 0.5rem;
    outline: 0;
    text-align: start;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    font-family: 'OpenSans-SemiBold';
    color: #111111;
    overflow: hidden;
    height: 2rem;
    width: 100%;
  }

  > div {
    display: flex;
    width: 100%;

    > button {
      border: 0.2rem solid #d4a13b;
      background: #27a567;
      box-shadow: -1.2rem 0 0 0 rgba(0, 0, 0, 0.5);
      background-color: #fff;
      border-radius: 0.5rem;
      padding: 0.2rem 0.7rem 0.2rem 0.7rem;
      cursor: pointer;
      margin-left: auto;
      margin-top: 0.1rem;

      &:hover {
        @media (min-width: 550px) {
          border: 0.2rem solid #d4a13b;
          background-image: radial-gradient(6rem at center, #d4a13b, #dce6dc);
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
        font-size: 1.2rem;
      }
    }

    > button h2 {
      font-family: 'OpenSans-SemiBold';
      font-size: 1.2rem;
    }
  }
`;

export const ProfileCompany = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
  display: flex;
  height: 100%;
  //box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.5);
  //background-image: linear-gradient(to left, #8bc9a8, #dce6dc);
  padding: 0.7rem;
  padding-left: 1.1rem;
  border-radius: 0.7rem;
  height: 7rem;
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
    font-size: 1.8rem;
  }

  > span {
    font-family: 'OpenSans-Medium';
    font-size: 1.38rem;
    color: #000;
  }
`;
