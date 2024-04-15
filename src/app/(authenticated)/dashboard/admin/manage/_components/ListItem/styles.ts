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
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
  min-height: 18rem;
`;

export const ItemContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: start;
  flex-direction: column;

  > div:first-child {
    background-color: #ffffff;
    border-radius: 0 0 0.5rem 0;
    padding: 0.5rem 0;
    min-width: 17rem;
    line-height: 1.2;
    height: 4.6rem;

    > p {
      font-family: 'OpenSans-SemiBold';
      font-size: 1.5rem;
      padding: 0 0.5rem;
    }
  }

  > div:last-child {
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

export const OnlineText = styled.p`
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  color: #00b37e;

  &::before {
    content: '';
    width: 0.8rem;
    height: 0.8rem;
    display: block;
    background-color: #00b37e;
    border-radius: 50%;
  }
`;

export const HiddenText = styled.p`
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  color: #d4903b;
  margin-right: 0.5rem;

  &::before {
    content: '';
    width: 0.8rem;
    height: 0.8rem;
    display: block;
    background-color: #d4903b;
    border-radius: 50%;
  }
`;

export const OfflineText = styled.p`
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  color: #424242;
  margin-right: 0.5rem;

  &::before {
    content: '';
    width: 0.8rem;
    height: 0.8rem;
    display: block;
    background-color: #424242;
    border-radius: 50%;
  }
`;

export const ConnectedText = styled.p`
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  color: #1976d2;
  margin-right: 0.5rem;

  &::before {
    content: '';
    width: 0.8rem;
    height: 0.8rem;
    display: block;
    background-color: #1976d2;
    border-radius: 50%;
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
