'use client';
import { useRouter } from 'next/navigation';

import styled from 'styled-components';

import * as animationData from './_assets/lottie/animation.json';

import { Player } from '@lottiefiles/react-lottie-player';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;

  > div {
    width: 50rem;
    height: auto;

    @media (max-height: 550px) {
      width: 25rem;
    }
  }

  > div:last-child {
    padding: 0 1rem;
    width: 100%;
    height: auto;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    top: 41rem;
    background-color: rgba(215, 249, 242, 0.8);
    padding: 1rem 2rem;

    > p {
      font-family: 'OpenSans-SemiBold';
      padding-inline: 2rem;
      margin-bottom: 1rem;
      color: #0857a0;
      font-family: 'OpenSans-Bold';
    }

    @media (max-height: 550px) {
      top: 22rem;
    }

    > button {
      width: 20rem;
      background-color: var(--color-palette-vibrant-100);
      flex-shrink: 0;
      color: #fff;
      padding: 0.7rem;
      margin: 1rem 0 2rem 0;
      border-radius: 3rem;
      font-size: 1.6rem;
      user-select: none;

      transition: all 0.05s ease;
      box-shadow: 0px 3px 0px var(--color-palette-primary-200);

      &:active {
        transform: translateY(2px);
        box-shadow: none;
      }
    }
  }

  > p {
    z-index: 1;
    top: 2rem;
    position: absolute;
    background-color: rgba(215, 249, 242, 0.8);
    color: #0857a0;
    border-radius: 2rem;
    padding: 1rem 2rem;
    font-family: 'OpenSans-Bold';
  }
`;

export default function NotFound() {
  const router = useRouter();

  return (
    <Container>
      <p>
        Ops! Algo de errado, a página que você <br /> procura não existe ou foi movida.
      </p>
      <div>
        <Player
          src={animationData}
          loop
          autoplay
          speed={1.5}
          style={{ top: 0, height: 'auto', width: 'auto' }}
        />
      </div>
      <div>
        <p>Por favor, tente novamente ou acesse a página inicial.</p>
        <button
          onClick={() => {
            router.push('/', { scroll: false });
          }}
        >
          Página inicial
        </button>
      </div>
    </Container>
  );
}
