'use client';

import { usePathname, useRouter } from 'next/navigation';

import Image from 'components/Vercel/Image';

import home from './assets/svg/add.svg';
import execution from './assets/svg/execution.svg';

import { Button, Container, Wrapper } from './styles';

export function RightMenu() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Container>
      <Wrapper>
        <div>
          <Button
            $path={['/dashboard/almox/historic'].includes(pathname)}
            onClick={() => router.push(`/dashboard/almox/historic`)}
            rel="preload"
          >
            <Image
              priority
              loading="eager"
              src={execution}
              alt="Book"
              width="25"
              height="25"
            />
            <span>Histórico GeraL</span>
          </Button>
        </div>

        <div>
          <Button
            $path={['/dashboard/almox/register', '/'].includes(pathname)}
            onClick={() => router.push('/dashboard/almox/register')}
            rel="preload"
          >
            <Image priority loading="eager" src={home} alt="Add" width="25" height="25" />
            <span>Novo Produto</span>
          </Button>
        </div>
      </Wrapper>
    </Container>
  );
}
