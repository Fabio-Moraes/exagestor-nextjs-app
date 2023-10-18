'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import add from './assets/svg/add.svg';
import clipboard from './assets/svg/clipboard.svg';
import execution from './assets/svg/execution.svg';
import report from './assets/svg/report.svg';

import { Button, Container, Wrapper } from './styles';

export function MenuBar() {
    const pathname = usePathname();
    const proportion = { width: 25, height: 25 };

    return (
        <Container>
            <Wrapper>
                <div>
                    <Button
                        $path={['/dashboard/new-service', '/'].includes(pathname)}
                        href='/dashboard/new-service'
                    >
                        <Image priority src={add} alt="Add" {...proportion} />
                        <span>Novo Serviço</span>
                    </Button>
                </div>

                <div>
                    <Button
                        $path={['/dashboard/running-service'].includes(pathname)}
                        href='/dashboard/running-service'
                    >
                        <Image priority src={execution} alt="Book" {...proportion} />
                        <span>Em Execução</span>
                    </Button>
                </div>

                <div>
                    <Button
                        $path={['/dashboard/historic-service'].includes(pathname)}
                        href='/dashboard/historic-service'
                    >
                        <Image priority src={report} alt="Report" {...proportion} />
                        <span>Histórico Geral</span>
                    </Button>
                </div>

                <div>
                    <Button
                        href='/'
                    >
                        <Image priority src={clipboard} alt="Clipboard" {...proportion} />
                        <span>Materiais Utilizados</span>
                    </Button>
                </div>
            </Wrapper>
        </Container>
    );
}
