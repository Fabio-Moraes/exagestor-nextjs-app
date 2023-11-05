import Image from 'next/image';

import code from './assets/svg/code.svg';
import coffee from './assets/svg/coffee.svg';
import { Container } from './styles';

export function Footer() {
    return (
        <Container>
            <div>
                <h1>Construído com</h1>
                <Image
                    priority
                    src={coffee}
                    alt="Coffee"
                    width={22}
                    height={25}
                />
                <h1>e</h1>
                <Image priority src={code} alt="Code" width={20} height={20} />
                <h1>por Fabio Moraes</h1>
            </div>
            <span>TODOS OS DIREITOS RESERVADOS.</span>
        </Container>
    );
}
