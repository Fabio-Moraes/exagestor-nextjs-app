'use client';

import Link from 'next/link';
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
    padding: 7px;
    background-color: #8bc9a8;
    border: 2px solid #3f795e;
    border-radius: 15px;

    position: sticky;
    top: 30px;

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

export const Button = styled(Link)<{ $path?: boolean }>`
    align-items: center;
    flex-shrink: 0;
    padding: 10px;
    border-radius: 5px;

    display: flex;
    outline: 0;
    width: 100%;

    > span {
        display: inline;
        text-align: start;
        font-weight: bold;
        font-size: 12px;
    }

    @media (max-width: 1065px) {
        display: block;
        > span {
            display: none;
        }
    }

    border: 2px solid #3f795e;

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
                border: 2px solid #27a567;
                background-image: radial-gradient(circle, #27a567, #dce6dc);
                box-shadow: 0px 5px 10px 0px rgba(39, 165, 103, 0.5);
            }
        `;

        return $path ? activeButtonCSS : disabledButtonCSS;
    }};
`;
