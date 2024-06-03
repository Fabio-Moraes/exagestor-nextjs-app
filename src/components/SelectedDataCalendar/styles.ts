'use client';

import DateTime from 'react-datetime';

import styled, { css } from 'styled-components';

export const StyledDateTime = styled(DateTime)<{ $active?: boolean }>`
  input {
    width: 11rem;
    padding: 1rem;
    font-size: 1.6rem;

    ${({ $active }) => {
      const activeCSS = css`
        background-color: #fafafa;
      `;

      const disabledCSS = css`
        background-image: linear-gradient(to top, #ed2f2f, #dce6dc);
      `;

      return $active ? activeCSS : disabledCSS;
    }};

    border-radius: 0.5rem;
    outline: 0.1rem solid #ccc;
    font-family: 'OpenSans-Regular';

    &:focus {
      outline: 0.2rem solid #27a567;
    }

    &::placeholder {
      color: #666;
    }
  }
`;
