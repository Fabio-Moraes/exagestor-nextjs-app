import styled from 'styled-components';

export const VideoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35rem;
  height: 35rem;

  > div {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  > p {
    bottom: 4rem;
    margin-inline: 2rem;
    position: absolute;
    font-size: 2rem;
    color: #fafafa;
    text-align: center;
  }
`;

export const QrVideo = styled.video`
  object-fit: cover;
  width: 35rem;
  height: 35rem;
`;
