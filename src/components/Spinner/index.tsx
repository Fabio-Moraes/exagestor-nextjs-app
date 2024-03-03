import * as animationData from './assets/lottie/animation.json';

import { Player } from '@lottiefiles/react-lottie-player';

import { Container } from './styles';

export function Spinner({ active = true }: { active?: boolean }) {
  return (
    <Container>
      <div>
        <div>
          {active && (
            <Player
              src={animationData}
              loop
              autoplay
              speed={1.5}
              style={{ height: '10rem', width: '10rem' }}
            />
          )}
        </div>
      </div>
    </Container>
  );
}
