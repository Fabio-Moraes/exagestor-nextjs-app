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
  padding: 0.5rem 0.7rem;
  background-color: #8bc9a8;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.5);
  border-radius: 0.7rem;
  position: sticky;
  top: 12.3rem;
  margin-top: 12.3rem;

  > div:not(:last-child) {
    margin-bottom: 0.5rem;
  }

  @media (min-width: 1065px) {
    align-items: flex-start;
  }
`;

export const WrapperLink = styled.div<{ $path?: boolean }>`
  align-items: center;
  display: flex;
  flex-shrink: 0;
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 0.3rem 0;
  outline: 0;
  height: 4.5rem;
  width: 20rem;

  > span {
    color: #000;
    width: 100%;
    display: inline;
    text-align: start;
    font-family: 'OpenSans-SemiBold';
    font-size: 1.2rem;
    margin-left: 0.5rem;
  }

  @media (max-width: 1065px) {
    display: block;
    width: auto;
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
