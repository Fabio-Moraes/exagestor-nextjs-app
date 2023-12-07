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
  padding: 8px;
  background-color: #8bc9a8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  border-radius: 7px;
  position: sticky;
  top: 40px;

  > div {
    width: 100%;
  }

  > div:not(:last-child) {
    margin-bottom: 5px;
  }

  @media (min-width: 1065px) {
    align-items: flex-start;
  }
`;

export const Button = styled.button<{ $path?: boolean }>`
  align-items: center;
  flex-shrink: 0;
  padding: 10px;
  border-radius: 5px;

  display: flex;
  outline: 0;
  width: 100%;

  > span {
    color: #000;
    display: inline;
    text-align: start;
    font-family: 'OpenSans-SemiBold';
    font-size: 12px;
    margin-left: 5px;
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
        box-shadow: 0px 5px 10px 0px rgba(39, 165, 103, 0.5);
      }
    `;

    return $path ? activeButtonCSS : disabledButtonCSS;
  }};
`;
