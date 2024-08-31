'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Image from 'components/Vercel/Image';
import { encryptObject } from 'functions';
import { HandleLogout } from 'functions/HandleLogout';
import { TimedWait } from 'functions/TimedWait';
import { internalApi } from 'services/apiAxios';

import { useWebsocketConnected } from 'store/websocketConnected';
import { getCurrentBusinessTheme } from 'themes/svg/business';

import * as S from './styles';

interface RunningService {
  id: number;
  employee_id: number;
  client_name: string;
  city: string;
  address: string;
  nomenclature: string;
  classification: string;
  update_count: number;
  status: string;
  created_at: string;
  protocol: string;
  name_creator_leader: string;
  name_tec: string;
  type_operation: string;
}

interface propsImageType {
  priority: boolean;
  loading: 'eager';
  width: number;
  height: number;
}

export function ButtonBar(props: { service: RunningService; passedScheduledDate: boolean }) {
  const business = getCurrentBusinessTheme();

  const checkSvg = business?.running.check;
  const closeSvg = business?.running.close;
  const docSvg = business?.running.doc;
  const pauseSvg = business?.running.pause;
  const playSvg = business?.running.play;
  const refreshSvg = business?.running.refresh;

  const { service, passedScheduledDate } = props;

  const websocketConnected = useWebsocketConnected((status) => status.websocketConnected);
  const [runningLoad, setRunningLoad] = useState(false);

  const { protocol, status, employee_id, update_count } = service;

  const router = useRouter();
  const maxRetries = 5;

  const allButtonsLocked = !(!runningLoad && websocketConnected);

  const onClickButtonCheck = () => {
    if (!passedScheduledDate || allButtonsLocked || status === 'paused') return;

    router.push(`/dashboard/admin/running/finish/service/${encryptSlug}`, { scroll: false });
  };

  async function onClickButtonPlayPause() {
    if (!passedScheduledDate || allButtonsLocked) return;

    setRunningLoad(true);
    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        await internalApi.post('/api/bridge', {
          baseURL: `/api/admin/running/${status === 'active' ? 'pause' : 'start'}`,
          employeeId: String(employee_id),
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

  async function onClickButtonRefresh() {
    if (!passedScheduledDate || allButtonsLocked) return;

    setRunningLoad(true);
    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        await internalApi.post('/api/bridge', {
          baseURL: '/api/admin/running/start',
          employeeId: String(employee_id),
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
    if (allButtonsLocked) return;

    setRunningLoad(true);
    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        await internalApi.post('/api/bridge', {
          baseURL: '/api/admin/running/cancel',
          employeeId: String(employee_id),
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

  const encryptSlug = encryptObject({
    protocol: protocol,
    employeeId: employee_id,
    updateCount: String(Number(update_count || 0) + 1)
  });

  const styleButtonCheck = {
    opacity: !passedScheduledDate || status === 'paused' || allButtonsLocked ? 0.3 : 1
  };

  const styleButtonPlayPause = {
    opacity: !passedScheduledDate || allButtonsLocked ? 0.3 : 1
  };

  const styleButtonDoc = {
    opacity:
      !passedScheduledDate || allButtonsLocked || service.type_operation === 'TIPO_COMUM'
        ? 0.3
        : 1
  };

  const styleButtonClose = { opacity: allButtonsLocked ? 0.3 : 1 };

  const propsImage = {
    priority: true,
    loading: 'eager',
    width: 50,
    height: 50
  } as propsImageType;

  const selectPlayPauseRefresh = () => {
    if (status === 'analysis') return refreshSvg;
    if (status !== 'active') return playSvg;
    return pauseSvg;
  };

  const iconPlayPauseRefresh = selectPlayPauseRefresh();
  const startAnimation = Boolean(runningLoad || !websocketConnected);

  const onClickSelectPlayPauseRefresh =
    status === 'analysis' ? onClickButtonRefresh : onClickButtonPlayPause;

  return (
    <S.Container $animation={startAnimation}>
      <S.Wrapper>
        <button rel="preload" style={styleButtonCheck} onClick={onClickButtonCheck}>
          <Image {...propsImage} src={checkSvg} alt="check" />
        </button>
        <button
          rel="preload"
          style={styleButtonPlayPause}
          onClick={onClickSelectPlayPauseRefresh}
        >
          <Image {...propsImage} src={iconPlayPauseRefresh} alt="play-pause-refres" />
        </button>
        <button rel="preload" style={styleButtonDoc} onClick={() => {}}>
          <Image {...propsImage} src={docSvg} alt="doc" />
        </button>
        <button rel="preload" style={styleButtonClose} onClick={onClickButtonCancel}>
          <Image {...propsImage} src={closeSvg} alt="close" />
        </button>
      </S.Wrapper>
    </S.Container>
  );
}
