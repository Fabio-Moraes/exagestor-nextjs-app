import styled from 'styled-components';

export const VideoWrapper = styled.div`
  width: 300px;
  height: 300px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
`;

export const VideoElement = styled.video`
  width: auto;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
`;

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
