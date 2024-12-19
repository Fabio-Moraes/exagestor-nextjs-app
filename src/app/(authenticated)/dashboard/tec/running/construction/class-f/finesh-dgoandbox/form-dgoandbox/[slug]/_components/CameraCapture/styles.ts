import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const ButtonCapture = styled.button`
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  background-color: transparent;
  border: 0.5rem solid #fff;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.2rem;

  &:before {
    content: '';
    position: absolute;
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    background-color: #fff;
  }
`;
