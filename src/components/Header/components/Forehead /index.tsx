'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useDecodeToken } from 'hooks/useDecodeToken';
import Cookie from 'js-cookie';

import exa from './assets/svg/exa_logo.svg';
import { Container, ProfileInfo } from './styles';

export function Forehead() {
  const decoderToken = useDecodeToken<{ name: string }>('auth_token');
  const router = useRouter();

  return (
    <Container>
      <Image
        alt="Axa"
        src={exa}
        width={73}
        height={73}
        priority
      />
      <ProfileInfo>
        <strong>EXA TELECOM</strong>
        <span>Telecomunicações</span>
      </ProfileInfo>
      <div>
        <span>
          {decoderToken?.name || 'Carregando...'}
        </span>
        <button
          onClick={() => {
            Cookie.remove('auth_token');
            router.refresh();
          }}
        >
          <span>Sair</span>
        </button>
      </div>
    </Container>
  );
}
