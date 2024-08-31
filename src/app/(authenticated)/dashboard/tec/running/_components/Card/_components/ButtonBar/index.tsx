'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

import Image from 'components/Vercel/Image';
import { encryptObject } from 'functions';
import { HandleLogout } from 'functions/HandleLogout';
import { TimedWait } from 'functions/TimedWait';
import { internalApi } from 'services/apiAxios';

import { useWebsocketConnected } from 'store/websocketConnected';
import { getCurrentBusinessTheme } from 'themes/svg/business';

import * as S from './styles';

type RunningService = {
  id: number;
  employee_id: number;
  client_name: string;
  city: string;
  address: string;
  nomenclature: string;
  classification: string;
  update_count: number;
  status: string;
  start_service_at: string;
  created_at: string;
  protocol: string;
  name_creator_leader: string;
  name_tec: string;
  type_operation: string;
};

type ButtonBarTypes = {
  service: RunningService;
  passedScheduledDate: boolean;
  shared?: boolean;
};

interface propsImageType {
  priority: boolean;
  loading: 'eager';
  width: number;
  height: number;
}

export function ButtonBar(props: ButtonBarTypes) {
  const business = getCurrentBusinessTheme();

  const checkSvg = business?.running.check;
  const closeSvg = business?.running.close;
  const docSvg = business?.running.doc;
  const pauseSvg = business?.running.pause;
  const playSvg = business?.running.play;

  const { service, shared, passedScheduledDate } = props;

  const websocketConnected = useWebsocketConnected((status) => status.websocketConnected);
  const [runningLoad, setRunningLoad] = useState(false);

  const { protocol, status } = service;
  const encryptSlug = encryptObject({ protocol: protocol });

  const router = useRouter();
  const maxRetries = 4;

  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleOpenDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  type EventTypes = React.MouseEvent<HTMLDialogElement, MouseEvent>;

  const handleClickOutsideDialog = (event: EventTypes) => {
    const { clientX, clientY } = event.nativeEvent;
    if (dialogRef.current) {
      const rect = dialogRef.current.getBoundingClientRect();
      if (
        rect.left > clientX ||
        rect.right < clientX ||
        rect.top > clientY ||
        rect.bottom < clientY
      ) {
        dialogRef.current.close();
      }
    }
  };

  const allButtonsLocked = !(!runningLoad && websocketConnected && status !== 'analysis');

  const onClickButtonCheck = () => {
    if (!passedScheduledDate || allButtonsLocked || status === 'paused' || shared) return;

    router.push(`/dashboard/tec/running/finish/service/${encryptSlug}`, { scroll: false });
  };

  async function onClickButtonPlayPause() {
    if (!passedScheduledDate || allButtonsLocked || shared) return;

    setRunningLoad(true);
    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        await internalApi.post('/api/bridge', {
          baseURL: `/api/tec/running/${status === 'active' ? 'pause' : 'start'}`,
          protocol: protocol
        });

        break;
      } catch (error: unknown) {
        if (error instanceof Error) {
          const customError = error as CustomError;
          if (customError.response) {
            const statusCode = customError.response.status;

            if (statusCode === 403) {
              HandleLogout();
              break;
            }

            if (statusCode === 409) {
              break;
            } else {
              await TimedWait(3000);
            }
          }
        }
      } finally {
        setRunningLoad(false);
      }
    }
  }

  async function onClickButtonCancel() {
    if (allButtonsLocked || shared) return;

    setRunningLoad(true);
    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        await internalApi.post('/api/bridge', {
          baseURL: '/api/tec/running/cancel',
          protocol: protocol
        });
        break;
      } catch (error: unknown) {
        if (error instanceof Error) {
          const customError = error as CustomError;
          if (customError.response) {
            const statusCode = customError.response.status;

            if (statusCode === 403) {
              HandleLogout();
              break;
            }

            if (statusCode === 409) {
              break;
            } else {
              await TimedWait(3000);
            }
          }
        }
      } finally {
        setRunningLoad(false);
      }
    }
  }

  function onClickModalConstruction() {
    if (service.type_operation !== 'TIPO_COMUM') handleOpenDialog();
  }

  const styleButtonCheck = {
    opacity:
      !passedScheduledDate || status === 'paused' || allButtonsLocked || shared ? 0.3 : 1
  };

  const styleButtonPlayPause = {
    opacity: !passedScheduledDate || allButtonsLocked || shared ? 0.3 : 1
  };

  const styleButtonDoc = {
    opacity:
      !passedScheduledDate || allButtonsLocked || service.type_operation === 'TIPO_COMUM'
        ? 0.3
        : 1
  };

  const styleButtonClose = { opacity: allButtonsLocked || shared ? 0.3 : 1 };

  const propsImage = {
    priority: true,
    loading: 'eager',
    width: 50,
    height: 50
  } as propsImageType;

  const iconPlayPause = status !== 'active' ? playSvg : pauseSvg;
  const startAnimation = Boolean(runningLoad || !websocketConnected);

  return (
    <>
      <S.Container $animation={startAnimation}>
        <S.Wrapper>
          <button rel="preload" style={styleButtonCheck} onClick={onClickButtonCheck}>
            <Image {...propsImage} src={checkSvg} alt="check" />
          </button>
          <button rel="preload" style={styleButtonPlayPause} onClick={onClickButtonPlayPause}>
            <Image {...propsImage} src={iconPlayPause} alt="play-pause" />
          </button>
          <button rel="preload" style={styleButtonDoc} onClick={onClickModalConstruction}>
            <Image {...propsImage} src={docSvg} alt="doc" />
          </button>
          <button rel="preload" style={styleButtonClose} onClick={onClickButtonCancel}>
            <Image {...propsImage} src={closeSvg} alt="close" />
          </button>
        </S.Wrapper>
      </S.Container>
      <S.Dialog ref={dialogRef} onClick={handleClickOutsideDialog}>
        <>
          <button
            onClick={() => {
              router.push(`/dashboard/tec/running/construction/class-l/${encryptSlug}`, {
                scroll: false
              });
            }}
          >
            <p>CLASSE L</p>
          </button>
          <button onClick={() => {}}>
            <p>CLASSE F</p>
          </button>
        </>
      </S.Dialog>
    </>
  );
}
