import * as animationData from './_assets/lottie/animation.json';

import { Player } from '@lottiefiles/react-lottie-player';

import * as S from './styles';

export function Spinner({ active = true }: { active?: boolean }) {
  return (
    <S.Container>
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
    </S.Container>
  );
}
