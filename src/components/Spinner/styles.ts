import styled, { keyframes } from 'styled-components';

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
  min-height: 90px;
  min-width: 200px;
  border-radius: 10px;
  overflow: hidden;

  > div {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    width: 100%;
    left: 0;
    top: 0;
    z-index: 2;
    padding-bottom: 70px;
    border-radius: 10px;
    > div { 
        animation: ${rotateAnimation} 1s linear infinite; 
    };
  }
`