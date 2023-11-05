'use client';

import Link from 'next/link';
import styled, { css } from 'styled-components';

export const Container = styled.div`
    border: 2px solid #3f795e;
    position: sticky;
    display: flex;
    padding: 3px min(20px, max(10vw, 10px));
    background-image: radial-gradient(
        350px at center,
        rgba(255, 255, 255, 0.94) 20%,
        #27a567
    );
    justify-content: space-between;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 2;
    white-space: nowrap;

    @media (min-width: 550px) {
        display: none;
    }
`;

export const Button = styled(Link)<{ $path?: boolean }>`
    display: flex;
    position: static;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    user-select: none;
    outline: 0;
    border-radius: 5px;
    padding: 5px 10px 5px 10px;
    cursor: pointer;

    > span {
        text-align: center;
        font-weight: bold;
        font-size: 12px;
        overflow-wrap: break-word;
    }

    ${({ $path = '' }) => {
        const activeButtonCSS = css`
            border: 2px solid #000000;
            background-color: #27a567;
            > span {
                color: #fff;
            }
        `;

        return $path && activeButtonCSS;
    }};
`;
