import styled from 'styled-components';

export const Container = styled.dialog`
  background-color: rgb(63, 121, 113, 0.3);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50rem;
  justify-content: center;
  padding: 1.5rem;

  > h1 {
    font-size: 2rem;
    color: #fafafa;
  }

  > p {
    font-size: 1.5rem;
    margin: 1rem 0;
    color: #fafafa;
  }

  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;

    > button {
      background-color: var(--color-palette-vibrant-100);
      align-items: center;
      flex-shrink: 0;
      border-radius: 0.5rem;
      width: 15rem;
      margin: 1rem;
      cursor: pointer;
      user-select: none;

      display: flex;
      height: 4.5rem;

      > p {
        width: 100%;
        color: #ffffff;
      }

      transition: all 0.05s ease;
      box-shadow: 0px 3px 0px var(--color-palette-primary-200);

      &:active {
        transform: translateY(2px);
        box-shadow: none;
      }
    }

    > button:last-child {
      background-color: #333333;
      box-shadow: 0px 3px 0px #999999;
    }

    > div:first-child {
      @media (max-height: 550px) {
        display: none;
      }
    }
  }

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;
