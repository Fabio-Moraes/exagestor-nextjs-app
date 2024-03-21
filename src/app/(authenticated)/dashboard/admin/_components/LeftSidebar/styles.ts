'use client';

import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: none;

  @media (min-width: 550px) {
    display: flex;
    flex-direction: column;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.8rem;
  background-color: #8bc9a8;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.5);
  border-radius: 0.7rem;
  position: sticky;
  top: 4.5rem;
  margin-top: 4.5rem;

  > div {
    width: 100%;
  }

  > div:not(:last-child) {
    margin-bottom: 0.5rem;
  }

  @media (min-width: 1065px) {
    align-items: flex-start;
  }
`;

export const Button = styled.button<{ $path?: boolean }>`
  align-items: center;
  flex-shrink: 0;
  padding: 1rem;
  border-radius: 0.5rem;

  display: flex;
  outline: 0;
  width: 100%;
  height: 4.5rem;

  > span {
    color: #000;
    display: inline;
    text-align: start;
    font-family: 'OpenSans-SemiBold';
    font-size: 1.2rem;
    margin-left: 0.5rem;
  }

  @media (max-width: 1065px) {
    display: block;
    > span {
      display: none;
    }
  }

  ${({ $path = '' }) => {
    const activeButtonCSS = css`
      background-color: #27a567;
      > span {
        color: #fff;
      }
    `;

    const disabledButtonCSS = css`
      background-color: #fff;
      &:hover {
        background-image: radial-gradient(circle, #27a567, #dce6dc);
        box-shadow: 0 0.5rem 1rem 0 rgba(39, 165, 103, 0.5);
      }
    `;

    return $path ? activeButtonCSS : disabledButtonCSS;
  }};
`;
