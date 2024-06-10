'use client';

import styled, { css } from 'styled-components';

import { lighten } from 'polished';

export const Container = styled.div<{ $color: string }>`
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  ${({ $color }) => css`
    background: linear-gradient(
      45deg,
      var(${$color}) 20%,
      ${() => {
          const computedStyle = window.getComputedStyle(document.documentElement);
          const textBackground = computedStyle.getPropertyValue($color);
          return lighten(0.2, textBackground);
        }}
        50%,
      ${() => {
        const computedStyle = window.getComputedStyle(document.documentElement);
        const textBackground = computedStyle.getPropertyValue($color);
        return lighten(0.2, textBackground);
      }},
      var(${$color})
    );
  `}

  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;

    > div {
      display: flex;
      margin: 0 0 1rem 0;
      background-color: #f2f2f0;
      padding: 0.5rem 0;
      flex-direction: column;
      min-width: 16rem;
      border-radius: 0 0 0.7rem 0;

      > div {
        display: flex;
        flex-direction: row;
        padding: 0.5rem 1rem 0rem 1rem;

        > p {
          margin-left: 0.5rem;
          font-family: 'OpenSans-SemiBold';
          font-size: 1.5rem;
        }
      }
    }

    > button {
      padding: 0.4rem 0.5rem;
      max-height: 3rem;
    }
  }
`;
