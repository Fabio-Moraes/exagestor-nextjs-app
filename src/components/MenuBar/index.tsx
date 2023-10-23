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
                        $path={['/dashboard/new', '/'].includes(pathname)}
                        href='/dashboard/new'
                    >
                        <Image priority loading="eager" src={add} alt="Add" {...proportion} />
                        <span>Novo Serviço</span>
                    </Button>
                </div>

                <div>
                    <Button
                        $path={['/dashboard/running'].includes(pathname)}
                        href='/dashboard/running'
                    >
                        <Image priority loading="eager" src={execution} alt="Book" {...proportion} />
                        <span>Em Execução</span>
                    </Button>
                </div>

                <div>
                    <Button
                        $path={['/dashboard/historic'].includes(pathname)}
                        href='/dashboard/historic'
                    >
                        <Image priority loading="eager" src={report} alt="Report" {...proportion} />
                        <span>Histórico Geral</span>
                    </Button>
                </div>

                <div>
                    <Button
                        href='/'
                    >
                        <Image priority loading="eager" src={clipboard} alt="Clipboard" {...proportion} />
                        <span>Materiais Utilizados</span>
                    </Button>
                </div>
            </Wrapper>
        </Container>
    );
}
