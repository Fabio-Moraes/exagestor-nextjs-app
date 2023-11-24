'use client';

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  white-space: nowrap;

  width: 100%;

  flex-direction: column;
  justify-content: space-between;

  align-items: center;

  > div:first-child {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 10px;
    border-bottom: 2px solid #3f795e;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-image: radial-gradient(350px at center, #ffffff 20%, #8ed0af);
  }

  > div:last-child {
    width: 100%;
    padding: 20px;
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
