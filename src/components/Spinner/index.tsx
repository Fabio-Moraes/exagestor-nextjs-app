import { Player } from '@lottiefiles/react-lottie-player';
import * as animationData from './assets/lottie/animation.json';

import { Container } from './styles';

export function Spinner({ active = true }: { active?: boolean }) {
    return (
        <Container>
            <div>
                <div>
                    {active && <Player
                        src={animationData}
                        loop
                        autoplay
                        speed={1.5}
                        style={{ height: '100px', width: '100px' }}
                    />}
                </div>
            </div>
        </Container>
    );
}