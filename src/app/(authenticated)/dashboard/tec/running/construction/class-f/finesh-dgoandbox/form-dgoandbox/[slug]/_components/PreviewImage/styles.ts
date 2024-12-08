'use client';

import styled from 'styled-components';

export const ContainerImagePreview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  width: 500px;
  height: 500px;
  align-items: end;
  border-radius: 10px;
  position: relative;

  > h1 {
    color: #ffffff;
  }

  > p {
    color: #ffffff;
  }
`;

export const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20rem;
  background-color: rgb(var(--color-secondary-04));
  flex-shrink: 0;
  color: #fff;
  padding: 0.7rem;
  margin: 1rem 0 2rem 0;
  border-radius: 3rem;
  font-size: 1.6rem;
  user-select: none;

  > div {
    display: flex;
    flex-direction: row;
    width: 100%;
    > p {
      text-align: center;
      width: 100%;
    }
  }

  transition: all 0.05s ease;
  box-shadow: 0px 3px 0px rgb(var(--color-secondary-02));

  &:active {
    transform: translateY(2px);
    box-shadow: none;
  }
`;
