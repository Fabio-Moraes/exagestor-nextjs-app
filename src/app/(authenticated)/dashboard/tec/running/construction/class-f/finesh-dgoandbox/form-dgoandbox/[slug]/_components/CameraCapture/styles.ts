import styled from 'styled-components';

export const CameraContainer = styled.div`
  width: 30rem;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  //height: 100%;
  justify-content: center;
  flex-direction: column;
  background-color: hotpink;
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
  margin: 1.2rem 0;

  &:before {
    content: '';
    position: absolute;
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    background-color: #fff;
  }
`;
