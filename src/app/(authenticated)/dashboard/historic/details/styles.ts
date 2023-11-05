'use client';

import styled from 'styled-components';

export const Container = styled.div`
    background-color: #fff;
    text-align: center;
    padding: 20px;
`;

export const Title = styled.h1`
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;

    @media (min-width: 550px) {
        height: 40px;
        line-height: 40px;
        background-color: #3c7d5d;
        color: #fff;
    }
`;

export const Wrapper = styled.div`
    font-size: 18px;
    margin-bottom: 30px;
    border: 2px solid #3f795e;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);

    display: flex;
    justify-content: space-between;
    flex-direction: column;

    > div:last-child {
        display: flex;
        margin: 8px;
        padding: 10px;
        background-color: #3f795e;
        border-radius: 5px;

        justify-content: space-between;
        align-items: center;

        > button {
            width: 130px;
        }
    }

    > div {
        width: 100%;

        > p {
            margin-bottom: 10px;
            text-align: start;
            font-size: 15px;
        }

        > p:last-child {
            margin-bottom: 0px;
        }
    }
`;

export const Button = styled.button`
    display: flex;
    height: 30px;
    width: 100%;
    background-color: #3c7d5d;
    align-items: center;
    justify-content: center;
    border-radius: 10px 10px 0 0;

    > p {
        color: #fff;
        text-align: center;
        font-size: 16px;
    }
`;
