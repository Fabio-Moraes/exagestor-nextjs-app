'use client';

import { Fragment, useEffect, useState, useRef } from 'react';

import { FullScreenLoading } from 'components/FullScreenLoading';
import { LineSkaleton } from 'components/LineSkaleton';
import Image from 'components/Vercel/Image';
import { decryptObject } from 'functions';
import { HandleLogout } from 'functions/HandleLogout';
import { TimedWait } from 'functions/TimedWait';
import { useHandlePrint } from 'hooks/useHandlePrint';
import { internalApi } from 'services/apiAxios';

import * as animationData from './_assets/lottie/animation.json';

import { Player } from '@lottiefiles/react-lottie-player';
import { getCurrentBusinessTheme } from 'themes/svg/business';

import * as S from './styles';

interface ServiceData {
  currentOperation: {
    id: number;
    client_name: string;
    employee_id: string;
    city: string;
    address: string;
    nomenclature: string;
    classification: string;
    status: string;
    update_count: number;
    start_service_at: string;
    created_at: string;
    modification_at: string;
    finished_at: string;
    list_material: string;
    list_service: string;
    observation: string;
    protocol: string;
    name_tec: string;
    name_creator_leader: string;
    role_creator_leader: string;
  }[];
  serviceList: {
    id: number;
    description: string;
    status: string;
  }[];
}

interface Materials {
  id: number;
  product_name: string;
  unit_type: string;
  product_code: string;
  quantity_value: string;
  created_at: string;
}

interface SlugType {
  params: {
    slug: string;
  };
}

function formatDate(date: string) {
  const now = new Date(date);
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export default function Details({ params }: SlugType) {
  const [service, setService] = useState({} as ServiceData);
  const [connectionError, setConnectionError] = useState(false);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [materials, setMaterials] = useState<Materials[]>([]);
  const [processPrint, setProcessPrint] = useState(false);

  const decryptSlug = decryptObject(params.slug);
  const business = getCurrentBusinessTheme();
  const businessLogo = business?.logo.brand_logo;
  const maxRetries = 4;

  async function fetchServices() {
    setConnectionError(false);

    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        const paramDataStock = {
          baseURL: '/api/tec/stock',
          employee_id: Number(decryptSlug.employeeId)
        };

        const responseDataStock = await internalApi.post('/api/bridge', paramDataStock);

        const response = await internalApi.post('/api/bridge', {
          baseURL: '/api/admin/manage/historic/details',
          employeeId: String(decryptSlug.employeeId),
          protocol: String(decryptSlug.protocol),
          updateCount: String(decryptSlug.updateCount)
        });

        setMaterials(responseDataStock.data);
        setService(response.data);
        setIsPopupValue(null);

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
            }

            if (retryCount === maxRetries) {
              setConnectionError(true);
              setIsPopupValue(null);
            } else {
              await TimedWait(3000);
            }
          }
        }
      }
    }
    setIsPopupValue(null);
  }

  useEffect(() => {
    fetchServices();

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const status = {
    concluded: '✅ Finalizado',
    analysis: '🔍 Em análise',
    active: '🚧 Em andamento',
    paused: '⏸️ Pausado',
    canceled: '❌ Cancelado'
  } as { [key: string]: string };

  const renderTextWithLineBreaks = (text: string) => {
    const lines = text.split('\n');

    return lines.map((line: string, index: number) => (
      <Fragment key={String(index)}>
        {line ? <p key={String(index)}>{line}</p> : <div key={`extra-div-${index}`} />}
      </Fragment>
    ));
  };

  const modificationFilter = () => {
    if (
      service?.currentOperation[0]?.modification_at &&
      service?.currentOperation[0]?.update_count > 0 &&
      service?.currentOperation[0]?.status !== 'concluded'
    ) {
      if (service?.currentOperation[0]?.status === 'paused') {
        return <p>Pausado em: {formatDate(service?.currentOperation[0]?.modification_at)}</p>;
      }

      if (service?.currentOperation[0]?.status === 'active') {
        return <p>Retomado em: {formatDate(service?.currentOperation[0]?.modification_at)}</p>;
      }
    }
  };

  const elementRef = useRef<HTMLDivElement>(null);

  const objListMaterial = JSON.parse(service?.currentOperation?.[0]?.list_material || '{}');
  const objListService = JSON.parse(service?.currentOperation?.[0]?.list_service || '{}');

  const [handleToPrinter] = useHandlePrint({
    elementRef: elementRef,
    onBeforePrint: () => setProcessPrint(true),
    onAfterPrint: () => setProcessPrint(false)
  });

  const [handleToSavePdf] = useHandlePrint({
    download: true,
    elementRef: elementRef,
    onBeforePrint: () => setProcessPrint(true),
    onAfterPrint: () => setProcessPrint(false)
  });

  return (
    <S.Container>
      <S.Title>Relatório</S.Title>
      {isPopupValue && <FullScreenLoading message={isPopupValue} />}
      {connectionError ? (
        <S.ErrorContainer>
          <span>
            Não foi possível consultar o histórico devido a instabilidade na conexão. Por favor, tente
            novamente.
          </span>
        </S.ErrorContainer>
      ) : (
        <S.Wrapper>
          <S.Info ref={elementRef}>
            {isLoading || !service ? (
              <>
                <LineSkaleton width="18rem" />
                <LineSkaleton width="12rem" />
                <LineSkaleton width="10rem" />
                <LineSkaleton width="25rem" />
                <LineSkaleton width="23rem" />
                <LineSkaleton width="15rem" />
                <LineSkaleton width="25rem" />
                <LineSkaleton width="20rem" />
                <LineSkaleton width="21rem" />
              </>
            ) : (
              <>
                <S.ProfileCompany>
                  <Image
                    src={businessLogo}
                    priority
                    loading="eager"
                    alt="Axa"
                    style={{ width: '3.4rem', height: 'auto' }}
                  />
                  <S.ProfileInfoCompany>
                    <h1>EXATELECOM</h1>
                    <span>Soluções em Telecom</span>
                  </S.ProfileInfoCompany>
                </S.ProfileCompany>
                <p>Endereço: {service?.currentOperation?.[0]?.address}</p>
                <p>Cidade: {service?.currentOperation?.[0]?.city}</p>
                <p>Classificação: {service?.currentOperation?.[0]?.classification}</p>
                <p>Solicitante: {service?.currentOperation?.[0]?.client_name}</p>
                <p>
                  iniciado por:
                  {service?.currentOperation?.[0]?.name_creator_leader
                    ? ` ${service?.currentOperation?.[0]?.name_creator_leader.concat(
                        ` (${service?.currentOperation?.[0]?.role_creator_leader.toUpperCase()})`
                      )}`
                    : ` ${service?.currentOperation?.[0]?.name_tec.concat(' (TEC)')}`}
                </p>
                <p>Emissão: {formatDate(service?.currentOperation?.[0]?.created_at)}</p>
                <p>Para: {formatDate(service?.currentOperation?.[0]?.start_service_at)}</p>
                {service?.currentOperation?.[0]?.finished_at && (
                  <p>Concluído em: {formatDate(service?.currentOperation?.[0]?.finished_at)}</p>
                )}
                {service?.currentOperation?.[0]?.modification_at && modificationFilter()}
                <p>Nomenclatura: {service?.currentOperation?.[0]?.nomenclature}</p>
                <p>Protocolo: {service?.currentOperation?.[0]?.protocol}</p>
                <p>Serviço: {status[service?.currentOperation?.[0]?.status]}</p>
                <p>Contador de Atualização: {service?.currentOperation?.[0]?.update_count}</p>
                {service?.currentOperation?.[0]?.list_material && (
                  <S.Table>
                    <div>
                      <div>
                        <span>Materiais</span>
                      </div>
                      <div>
                        <span>Qtd</span>
                      </div>
                      <div>
                        <span>Tipo</span>
                      </div>
                      <div>
                        <span>Código</span>
                      </div>
                    </div>
                    {objListMaterial &&
                      Object.keys(objListMaterial)
                        .map((key: string) => (
                          <div key={key}>
                            <div>
                              <span>
                                {materials.find((item) => String(item.id) === key)?.product_name}
                              </span>
                            </div>
                            <div>
                              <span>{objListMaterial[key]}</span>
                            </div>
                            <div>
                              <span>{materials.find((item) => String(item.id) === key)?.unit_type}</span>
                            </div>
                            <div>
                              <span>
                                {materials.find((item) => String(item.id) === key)?.product_code}
                              </span>
                            </div>
                          </div>
                        ))
                        .filter((item) => objListMaterial[String(item.key)] > 0)}
                  </S.Table>
                )}
                <p />
                {service?.currentOperation?.[0]?.list_service && (
                  <S.Table>
                    <div>
                      <div>
                        <span>Serviços</span>
                      </div>
                      <div>
                        <span>Qtd</span>
                      </div>
                    </div>
                    {objListService &&
                      Object.keys(objListService)
                        .map((key: string) => (
                          <div key={key}>
                            <div>
                              <span>
                                {
                                  service?.serviceList.find((item) => String(item.id) === key)
                                    ?.description
                                }
                              </span>
                            </div>
                            <div>
                              <span>{objListService[key]}</span>
                            </div>
                          </div>
                        ))
                        .filter((item) => objListService[String(item.key)] > 0)}
                  </S.Table>
                )}
                <p />
                {service?.currentOperation?.[0]?.observation && (
                  <S.Observation>
                    <p>Observação</p>
                    {renderTextWithLineBreaks(service?.currentOperation?.[0]?.observation ?? '')}
                  </S.Observation>
                )}
              </>
            )}
          </S.Info>
          {!isLoading &&
            service &&
            (!processPrint ? (
              <S.WrapperButton>
                <S.Button onClick={handleToPrinter}>Imprimir</S.Button>
                <S.Button onClick={handleToSavePdf}>Salvar como PDF</S.Button>
              </S.WrapperButton>
            ) : (
              <S.WrapperSpinner>
                <div>
                  <Player
                    src={animationData}
                    loop
                    autoplay
                    speed={1.5}
                    style={{ height: '10rem', width: '10rem' }}
                  />
                </div>
                <p>Aguarde um instante enquanto geramos o relatório.</p>
              </S.WrapperSpinner>
            ))}
        </S.Wrapper>
      )}
    </S.Container>
  );
}
