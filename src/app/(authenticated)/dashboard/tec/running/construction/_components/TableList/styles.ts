import styled from 'styled-components';

export const TableRow = styled.div<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
  background-color: rgb(var(--color-primary-05));
  padding: 1rem 0;
  width: 100%;
  border-radius: 1rem;

  > span:first-child {
    color: #ffffff;
    padding-bottom: 1rem;
  }

  > span:last-child {
    color: #ffffff;
    padding-top: 1rem;
  }

  > div {
    width: 100%;
    display: flex;
    flex-direction: row;
    background-color: #ccc;
    padding-top: 1rem;
    > div {
      min-width: 6.7rem;
      border-left: 0.2rem solid #000;
      display: flex;
      justify-content: center;
      align-items: center;

      > span {
        width: 100%;
        font-family: 'OpenSans-SemiBold';
        font-size: 1.3rem;
      }
    }

    > div:first-child {
      width: 100%;
      padding: 0.5rem 1rem;
      border-left: 0;
      text-align: start;
    }

    > div:last-child {
      align-items: center;
      text-align: end;
      padding: 0.5rem 1rem;
    }
  }
`;

export const Dialog = styled.dialog`
  background-image: linear-gradient(
    45deg,
    rgb(var(--color-primary-02)) 65%,
    rgb(var(--color-secondary-02))
  );
  border-radius: 0.7rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  > button {
    background-color: #fff;
    align-items: center;
    flex-shrink: 0;
    border-radius: 0.5rem;
    width: 25rem;
    margin: 1rem;
    cursor: pointer;
    user-select: none;

    > p {
      text-align: center;
      font-size: 1.4rem;
      color: #000;
      width: 100%;
    }

    display: flex;
    height: 4.5rem;

    transition: all 0.05s ease;
    box-shadow: 0px 3px 0px rgb(var(--color-secondary-02));

    &:active {
      transform: translateY(2px);
      box-shadow: none;
    }
  }

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

export const WrapperLink = styled.div`
  background-color: #fff;
  align-items: center;
  flex-shrink: 0;
  border-radius: 0.5rem;
  width: 25rem;
  margin: 1rem;
  cursor: pointer;
  user-select: none;

  > p {
    text-align: center;
    font-size: 1.4rem;
    color: #000;
    width: 100%;
  }

  display: flex;
  height: 4.5rem;

  transition: all 0.05s ease;
  box-shadow: 0px 3px 0px rgb(var(--color-secondary-02));

  &:active {
    transform: translateY(2px);
    box-shadow: none;
  }
`;
