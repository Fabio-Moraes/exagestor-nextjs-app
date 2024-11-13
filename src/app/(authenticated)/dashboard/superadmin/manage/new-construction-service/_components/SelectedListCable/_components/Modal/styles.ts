import styled from 'styled-components';

export const Dialog = styled.dialog`
  background-image: linear-gradient(
    45deg,
    rgb(var(--color-primary-02)) 65%,
    rgb(var(--color-secondary-02))
  );
  border: 0.2rem solid #8f8f8f;
  border-radius: 0.7rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20rem;
  padding-top: 1rem;

  > div {
    display: flex;
    flex-direction: column;
  }

  > span {
    color: #ffff;
  }
`;

export const ContainerButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  //background-color: hotpink;
  flex-direction: row;
  width: 100%;

  > button {
    background-color: #fff;
    align-items: center;
    flex-shrink: 0;
    border-radius: 0.5rem;
    width: 90%;
    cursor: pointer;
    user-select: none;
    margin: 1rem 0;

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
`;

export const SearchBar = styled.input`
  font-size: 3rem;
  padding: 0 0.5rem;
  margin: 0 0.5rem;
  background-color: #fff;
  border-radius: 0.5rem;
  width: auto;
  outline: none;
  text-align: center;
  &::placeholder {
    color: #333;
  }
`;
