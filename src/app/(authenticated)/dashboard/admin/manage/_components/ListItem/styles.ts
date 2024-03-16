'use client';

import styled from 'styled-components';

export const Container = styled.div`
  background-image: linear-gradient(-135deg, #8bc9a8, #dce6dc, #8bc9a8, #dce6dc);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  //border: 0.1rem solid #27a567;
  margin: 0rem 1rem 2.8rem 1rem;
  border-radius: 0.7rem;
  cursor: pointer;

  overflow: hidden;

  > div:nth-child(2) {
    display: flex;
    justify-content: end;
    min-height: 4rem;
    > button {
      border: 0.2rem solid #b3475b;
      background-color: #d9534f;
      padding: 0.4rem 1rem;
      border-radius: 0.5rem;
      cursor: pointer;
      margin: 0.5rem;
      color: #fff;
    }
  }

  > div button p {
    font-family: 'OpenSans-SemiBold';
    font-size: 1.2rem;
  }
`;

export const Reset = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  border-radius: 0.5rem;
  margin: 0 auto;
  padding-left: 1rem;
`;

export const ItemContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: start;
  flex-direction: column;

  > p:first-child {
    font-family: 'OpenSans-SemiBold';
    font-size: 1.5rem;
    background-color: #f2f2f0;
    padding: 0.5rem 1rem 0.5rem 0.5rem;
    border-radius: 0 0 0.5rem 0;
  }

  > div {
    margin: 0.5rem;
    p {
      font-family: 'OpenSans-SemiBold';
      font-size: 1.6rem;
      text-align: start;
      padding: 0.23rem 0;
      //width: 100%;
    }
  }
`;
