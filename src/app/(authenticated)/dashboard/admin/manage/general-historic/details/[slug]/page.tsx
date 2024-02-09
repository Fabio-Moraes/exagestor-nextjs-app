'use client';

import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState, useRef } from 'react';

import { FullScreenLoading } from 'components/FullScreenLoading';
import { LineSkaleton } from 'components/LineSkaleton';
import Image from 'components/Vercel/Image';
import { decryptObject } from 'functions';
import apiRoute from 'services/apiRoute';

import iconExa from './assets/svg/exa_logo.svg';

import {
  ErrorContainer,
  Button,
  Container,
  Wrapper,
  Observation,
  Table,
  Title,
  Info,
  ProfileCompany,
  ProfileInfoCompany
} from './styles';

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

  const dataListMaterial = [
    { id: '0', description: 'PARAFUSOS DE AÇO INOXIDÁVEL' },
    { id: '1', description: 'FIOS DE COBRE ESMALTADOS' },
    { id: '4', description: 'BRAÇADEIRA DE AÇO 1P' }, //<<<<<<< 3
    { id: '3', description: 'CONECTORES DE METAL GALVANIZADO' },
    { id: '2', description: 'Barra de PAD 1/4' }, //<<<<<<< 2
    { id: '5', description: 'LÂMPADAS LED DE ALTA EFICIÊNCIA' },
    { id: '6', description: 'PLACAS DE CIRCUITOS ELETRÔNICOS' },
    { id: '7', description: 'TINTAS EPÓXI ANTICORROSIVAS' },
    { id: '8', description: 'ISOLADORES DE PORCELANA PARA ALTA TENSÃO' }
  ];

  const [services, setServices] = useState<Service | null>(null);
  const [connectionError, setConnectionError] = useState(false);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const sleep = async (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const router = useRouter();
  const reconnectDelay = 5000;
  const maxRetries = 4;
  const decryptSlug = decryptObject(params.slug);

  async function fetchServices() {
    setConnectionError(false);

    for (let count = 0; count < maxRetries; count++) {
      try {
        setIsPopupValue(count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando');

        const response = await apiRoute.post('/api/bridge', {
          baseURL: '/api/admin/manage/general-historic/details',
          employeeId: String(decryptSlug.employeeId),
          protocol: String(decryptSlug.protocol),
          updateCount: String(decryptSlug.updateCount)
        });

        count = maxRetries;
        setServices(response.data[0]);
        console.log('data', response.data[0]);
      } catch (error) {
        await sleep(reconnectDelay);
        setConnectionError(true);
      }
    }
    setIsPopupValue(null);
  }

  useEffect(() => {
    fetchServices();

    window.history.pushState(null, '', window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, '', window.location.href);
      router.push(`/dashboard/admin/manage/general-historic`);
    };

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

  const captureImageAndSaveAsPdf = () => {
    const element = elementRef.current;

    if (element) {
      import('html2pdf.js').then(({ default: html2pdf }) => {
        html2pdf(element, {
          margin: 10,
          filename: 'file.pdf',
          image: { type: 'png', quality: 1 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'p' }
        });
      });
    }
  };

  const objListMaterial = JSON.parse(services?.list_material || '{}');
  const objListService = JSON.parse(services?.list_service || '{}');

  return (
    <Container>
      <Title>Relatório</Title>
      {isPopupValue && <FullScreenLoading message={isPopupValue} />}
      {connectionError ? (
        <ErrorContainer>
          <span>
            Não foi possível consultar o histórico devido a instabilidade na conexão. Por
            favor, tente novamente.
          </span>
        </ErrorContainer>
      ) : (
        <Wrapper>
          <Info ref={elementRef}>
            {isLoading || !services ? (
              <>
                <LineSkaleton width="180px" />
                <LineSkaleton width="120px" />
                <LineSkaleton width="100px" />
                <LineSkaleton width="250px" />
                <LineSkaleton width="230px" />
                <LineSkaleton width="150px" />
                <LineSkaleton width="250px" />
                <LineSkaleton width="200px" />
                <LineSkaleton width="210px" />
              </>
            ) : (
              <>
                <ProfileCompany>
                  <Image
                    src={iconExa}
                    priority
                    loading="eager"
                    alt="Axa"
                    style={{ width: '34px', height: 'auto' }}
                  />
                  <ProfileInfoCompany>
                    <h1>EXA TELECOM</h1>
                    <span>Telecomunicações</span>
                  </ProfileInfoCompany>
                </ProfileCompany>
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
                  <Table>
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
                    </div>
                    {objListMaterial &&
                      Object.keys(objListMaterial).map((key: string) => (
                        <div key={key}>
                          <div>
                            <span>
                              {dataListMaterial.find((item) => item.id === key)?.description}
                            </span>
                          </div>
                          <div>
                            <span>{objListMaterial[key]}</span>
                          </div>
                          <div>
                            <span>Unid.</span>
                          </div>
                        </div>
                      ))}
                  </Table>
                )}
                <p />
                {services?.list_service && (
                  <Table>
                    <div>
                      <div>
                        <span>Serviços</span>
                      </div>
                      <div>
                        <span>Qtd</span>
                      </div>
                      <div>
                        <span>Tipo</span>
                      </div>
                    </div>
                    {objListService &&
                      Object.keys(objListService).map((key: string) => (
                        <div key={key}>
                          <div>
                            <span>
                              {dataListService.find((item) => item.id === key)?.description}
                            </span>
                          </div>
                          <div>
                            <span>{objListService[key]}</span>
                          </div>
                          <div>
                            <span>Unid.</span>
                          </div>
                        </div>
                      ))}
                  </Table>
                )}
                <p />
                {services?.observation && (
                  <Observation>
                    <p>Observação</p>
                    <p>{renderTextWithLineBreaks(services?.observation ?? '')}</p>
                  </Observation>
                )}
              </>
            )}
          </Info>
          {!isLoading && services && (
            <Button onClick={captureImageAndSaveAsPdf}>Salvar relatório como PDF</Button>
          )}
        </Wrapper>
      )}
    </Container>
  );
}
