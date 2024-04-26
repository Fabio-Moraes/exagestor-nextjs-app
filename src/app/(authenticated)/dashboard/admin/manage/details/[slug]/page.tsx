'use client';

import { Fragment, useEffect, useState, useRef } from 'react';

import { FullScreenLoading } from 'components/FullScreenLoading';
import { LineSkaleton } from 'components/LineSkaleton';
import Image from 'components/Vercel/Image';
import { decryptObject } from 'functions';
import { TimedWait } from 'functions/TimedWait';
import { useHandlePrint } from 'hooks/useHandlePrint';
import { internalApi } from 'services/apiAxios';

import iconExa from './_assets/svg/exa_logo.svg';

import * as S from './styles';

interface Service {
  id: number;
  client_name: string;
  city: string;
  address: string;
  nomenclature: string;
  classification: string;
  status: string;
  update_count: number;
  created_at: string;
  modification_at: string;
  finished_at: string;
  list_material: string;
  list_service: string;
  observation: string;
  protocol: string;
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

export default function Details({ params }: SlugType) {
  const dataListService = [
    { id: '0', description: 'ADQ DE POSTES (EQPTOS MEC NO POSTE)' },
    { id: '1', description: 'READQ DE POSTES (EQPTOS MEC NO POSTE)' },
    { id: '2', description: 'INSTALAÇÃO DE PADS PARA PROTEÇÃO DE REDE' }, //<<<<<
    { id: '3', description: 'RETENC CORD/ CBS' },
    { id: '4', description: 'RET CORD DO POSTE' },
    { id: '5', description: 'MANUT PODA DE GALHOS COM REMOCAO-F' },
    { id: '6', description: 'MANUT CAPINA LIMPZ SOBRE TAMP DE C' },
    { id: '7', description: 'MANUT CAPINA DE POSTE RAIO = 2,0M-' },
    { id: '8', description: 'MANUT CAPINA DE MARCO DIÂMTR DE 2.0M' }
  ];

  const [services, setServices] = useState<Service | null>(null);
  const [connectionError, setConnectionError] = useState(false);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [materials, setMaterials] = useState<Materials[]>([]);
  const [processPrint, setProcessPrint] = useState(false);

  const maxRetries = 4;
  const decryptSlug = decryptObject(params.slug);

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
        setServices(response.data[0]);
        setIsPopupValue(null);

        break;
      } catch (error: unknown) {
        if (error instanceof Error) {
          const customError = error as CustomError;
          if (customError.response) {
            const statusCode = customError.response.status;
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

  const status = {
    concluded: '✅ Finalizado',
    analysis: '🔍 Em análise',
    active: '🚧 Em andamento',
    paused: '⏸️ Pausado',
    canceled: '❌ Cancelado'
  } as { [key: string]: string };

  const renderTextWithLineBreaks = (text: string) => {
    const lines = text.split('\n');

    return lines.map((line: string, index: number) => {
      return (
        <Fragment key={String(index)}>
          {line ? <p key={String(index)}>{line}</p> : <div key={`extra-div-${index}`} />}
        </Fragment>
      );
    });
  };

  const modificationFilter = () => {
    if (
      services?.modification_at &&
      services?.update_count > 0 &&
      services?.status !== 'concluded'
    ) {
      if (services?.status === 'paused') {
        return <p>Pausado em: {formatDate(services?.modification_at)}</p>;
      }

      if (services?.status === 'active') {
        return <p>Retomado em: {formatDate(services?.modification_at)}</p>;
      }
    }
  };

  const elementRef = useRef<HTMLDivElement>(null);

  const objListMaterial = JSON.parse(services?.list_material || '{}');
  const objListService = JSON.parse(services?.list_service || '{}');

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
            Não foi possível consultar o histórico devido a instabilidade na conexão. Por
            favor, tente novamente.
          </span>
        </S.ErrorContainer>
      ) : (
        <S.Wrapper>
          <S.Info ref={elementRef}>
            {isLoading || !services ? (
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
                    src={iconExa}
                    priority
                    loading="eager"
                    alt="Axa"
                    style={{ width: '3.4rem', height: 'auto' }}
                  />
                  <S.ProfileInfoCompany>
                    <h1>EXA TELECOM</h1>
                    <span>Telecomunicações</span>
                  </S.ProfileInfoCompany>
                </S.ProfileCompany>
                <p>Endereço: {services?.address}</p>
                <p>Cidade: {services?.city}</p>
                <p>Classificação: {services?.classification}</p>
                <p>Solicitante: {services?.client_name}</p>
                <p>Iniciado em: {formatDate(services?.created_at)}</p>
                {services?.finished_at && (
                  <p>Concluído em: {formatDate(services?.finished_at)}</p>
                )}
                {services?.modification_at && modificationFilter()}
                <p>Nomenclatura: {services?.nomenclature}</p>
                <p>Protocolo: {services?.protocol}</p>
                <p>Serviço: {status[services?.status]}</p>
                <p>Contador de Atualização: {services?.update_count}</p>
                {services?.list_material && (
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
                                {
                                  materials.find((item) => String(item.id) === key)
                                    ?.product_name
                                }
                              </span>
                            </div>
                            <div>
                              <span>{objListMaterial[key]}</span>
                            </div>
                            <div>
                              <span>
                                {materials.find((item) => String(item.id) === key)?.unit_type}
                              </span>
                            </div>
                            <div>
                              <span>
                                {
                                  materials.find((item) => String(item.id) === key)
                                    ?.product_code
                                }
                              </span>
                            </div>
                          </div>
                        ))
                        .filter((item) => objListMaterial[String(item.key)] > 0)}
                  </S.Table>
                )}
                <p />
                {services?.list_service && (
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
                                {dataListService.find((item) => item.id === key)?.description}
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
                {services?.observation && (
                  <S.Observation>
                    <p>Observação</p>
                    {renderTextWithLineBreaks(services?.observation ?? '')}
                  </S.Observation>
                )}
              </>
            )}
          </S.Info>
          {!isLoading && services && !processPrint && (
            <S.WrapperButton>
              <S.Button onClick={handleToPrinter}>Imprimir</S.Button>
              <S.Button onClick={handleToSavePdf}>Salvar como PDF</S.Button>
            </S.WrapperButton>
          )}
        </S.Wrapper>
      )}
    </S.Container>
  );
}

//Print to PDF!
