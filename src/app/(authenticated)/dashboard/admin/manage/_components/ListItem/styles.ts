'use client';

import styled from 'styled-components';

import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  background-image: linear-gradient(45deg, #3f7971 65%, #8bc9a8);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0rem 0rem 2.8rem 0rem;
  border-radius: 0.7rem;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  min-height: 18rem;

  > div:nth-child(2) {
    display: flex;
    justify-content: end;

    > button {
      border: 0.2rem solid #b3475b;
      background-color: #d9534f;
      padding: 0.4rem 1rem;
      border-radius: 0.5rem;
      margin: 0.5rem;
      color: #fff;
      cursor: pointer;
      user-select: none;
    }
  }

  > div button p {
    font-family: 'OpenSans-SemiBold';
    font-size: 1.2rem;
    color: #fff;
  }
`;

export const ItemContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: start;
  flex-direction: column;

  > p {
    font-family: 'OpenSans-SemiBold';
    font-size: 1.5rem;
    background-color: #f2f2f0;
    padding: 0.5rem 1rem 0.5rem 0.5rem;
    border-radius: 0 0 0.5rem 0;
    min-width: 17rem;
    min-height: 3rem;
  }

  > div {
    margin: 0.5rem;

    p {
      color: #ffffff;
      font-family: 'OpenSans-Bold';
      font-size: 1.6rem;
      text-align: start;
      padding: 0.23rem 0;
    }
  }
`;

export const Dialog = styled.dialog`
  background-image: linear-gradient(45deg, #3f7971 65%, #8bc9a8);
  border-radius: 0.7rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  > button {
    background-color: #fff;
    align-items: center;
    flex-shrink: 0;
    border-radius: 0.5rem;
    width: 25rem;
    margin: 1rem;
    cursor: pointer;
    user-select: none;

    > p {
      text-align: center;
      width: 100%;
    }

    display: flex;
    height: 4.5rem;

    transition: all 0.05s ease;
    box-shadow: 0px 3px 0px #8bc9a8;

    &:active {
      transform: translateY(2px);
      box-shadow: none;
    }
  }

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
