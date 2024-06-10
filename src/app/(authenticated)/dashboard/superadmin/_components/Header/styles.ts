'use client';

import styled from 'styled-components';

export const Container = styled.div`
  z-index: 1000;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;

  @media (max-width: 550px) {
    background-image: linear-gradient(
      50deg,
      #ffffff 59.7%,
      var(--color-palette-secondary-100) 60%
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
  width: 15rem;
  height: 7rem;
  align-items: end;
  padding: 0 0.6rem 0.3rem 0.4rem;

  > span {
    margin-right: 0.1rem;
    padding-left: 1rem;
    outline: 0;
    text-align: start;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 1.5rem;
    margin-bottom: 1rem;
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
      box-shadow: -1.2rem 0 0 0 rgba(0, 0, 0, 0.5);
      background-color: #fff;
      border-radius: 0.5rem;
      padding: 0.2rem 0.7rem 0.2rem 0.7rem;
      cursor: pointer;
      margin-left: auto;
      margin-top: 0.1rem;
      max-height: 2.5rem;

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
      > div {
        display: flex;
        flex-direction: column;
        line-height: 1.2rem;
        margin-left: 0.5rem;
        > span {
          font-family: 'OpenSans-SemiBold';
          color: #000;
          font-size: 1.2rem;
        }
        > span:last-child {
          font-family: 'OpenSans-SemiBold';
          color: #000;
          font-size: 1.1rem;
        }
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
    font-size: 1.2rem;
    color: #000;
  }
`;
