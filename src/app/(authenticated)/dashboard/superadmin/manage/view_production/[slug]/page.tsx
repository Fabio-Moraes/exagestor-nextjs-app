'use client';

import React, { useEffect, useState } from 'react';

import { FullScreenLoading } from 'components/FullScreenLoading';
import { SelectedDataCalendar } from 'components/SelectedDataCalendar';
import Image from 'components/Vercel/Image';
import { decryptObject } from 'functions';
import { TimedWait } from 'functions/TimedWait';
import { internalApi } from 'services/apiAxios';

import moment, { Moment } from 'moment';

import refresh from './_assets/svg/refresh.svg';

import * as S from './styles';

interface SlugType {
  params: {
    slug: string;
  };
}

interface DecryptObjectType {
  userId?: number;
  userName?: string;
}

interface ServiceData {
  currentOperation: {
    list_service: string;
  }[];
  serviceList: {
    id: number;
    description: string;
    status: string;
  }[];
}

type ProductionType = { [key: string]: number };

export default function ViewProduction({ params }: SlugType) {
  const [connectionError, setConnectionError] = useState(false);
  const [isPopupValue, setIsPopupValue] = useState<string | null>(null);
  const [selectedLastDate, setSelectedLastDate] = useState<string | Moment>(moment());
  const [selectedFirstDate, setSelectedFirstDate] = useState<string | Moment>(
    moment().startOf('day').subtract(59, 'days')
  );
  const [production, setProduction] = useState(
    {} as {
      serviceList: ServiceData['serviceList'];
      totalProduction: ProductionType;
    }
  );

  const { userId, userName } = decryptObject(params.slug) as DecryptObjectType;

  const maxRetries = 4;

  function generateConnectingMessage(count: number): string {
    return count > 0 ? `Conectando<br>Tentativa (${count + 1})` : 'Conectando';
  }

  const maxDate = moment(selectedFirstDate).endOf('day').add(60, 'days');
  const todayEndOfDay = moment().endOf('day').add(1, 'days');

  const diffDays = moment(selectedLastDate)
    .startOf('day')
    .diff(moment(selectedFirstDate).startOf('day'), 'days');

  const validDateRange =
    moment(selectedLastDate)
      .startOf('day')
      .isSameOrAfter(moment(selectedFirstDate).startOf('day')) && diffDays <= 60;

  async function fetchServices() {
    if (!validDateRange) return;

    setConnectionError(false);

    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        setIsPopupValue(generateConnectingMessage(retryCount));

        const responseStock: { data: ServiceData } = await internalApi.post('/api/bridge', {
          baseURL: '/api/superadmin/manage/view_production',
          employee_id: Number(userId),
          selectedFirstDate: selectedFirstDate,
          selectedLastDate: selectedLastDate
        });

        const totalProduction = {} as ProductionType;

        responseStock.data.currentOperation.forEach(({ list_service }) => {
          const objListMaterial = JSON.parse(list_service || '{}');

          for (const key in objListMaterial) {
            if (objListMaterial.hasOwnProperty(key)) {
              const quantity = objListMaterial[key];
              if (totalProduction[key]) {
                totalProduction[key] += quantity;
              } else {
                totalProduction[key] = quantity;
              }
            }
          }
        });

        const serviceList = responseStock.data.serviceList;

        setProduction({ serviceList, totalProduction });
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
  }

  useEffect(() => {
    fetchServices();
  }, []);

  const minDate = moment('01/01/2023', 'DD/MM/YYYY').startOf('day');

  return (
    <S.Container>
      <S.Title>Produção - {userName}</S.Title>
      {isPopupValue && <FullScreenLoading message={isPopupValue} />}
      {connectionError ? (
        <S.ErrorContainer>
          <span>
            Não foi possível carregar os dados da página devido a instabilidade na conexão. Por
            favor, tente novamente.
          </span>
        </S.ErrorContainer>
      ) : (
        <>
          <S.ContainerSelecteddataCalendar>
            <S.WrapperSelectedDataCalendar>
              <SelectedDataCalendar
                onChange={(data) => {
                  setSelectedFirstDate(moment(data).startOf('day'));
                  console.log('data server', moment(data).startOf('day').format('DD/MM/YYYY'));
                }}
                value={selectedFirstDate}
                range={{ min: minDate, max: moment().add(1, 'days') }}
                active
              />
              <span>à</span>
              <SelectedDataCalendar
                onChange={(data) => {
                  setSelectedLastDate(moment(data).startOf('day'));
                }}
                value={selectedLastDate}
                range={{
                  min: moment(selectedFirstDate).startOf('day'),
                  max: maxDate.isAfter(todayEndOfDay) ? todayEndOfDay : maxDate
                }}
                active={validDateRange}
              />
            </S.WrapperSelectedDataCalendar>
            <S.WrapperButton
              style={{ opacity: validDateRange ? 1 : 0.3 }}
              onClick={fetchServices}
            >
              <Image priority loading="eager" src={refresh} alt="Add" width="45" height="45" />
            </S.WrapperButton>
          </S.ContainerSelecteddataCalendar>

          <S.Table>
            <div>
              <div>
                <span>Serviços</span>
              </div>
              <div>
                <span>Qtd</span>
              </div>
            </div>
            {production?.totalProduction &&
              Object.keys(production.totalProduction)
                .map((key: string) => (
                  <div key={key}>
                    <div>
                      <span>
                        {
                          production?.serviceList.find((item) => String(item.id) === key)
                            ?.description
                        }
                      </span>
                    </div>
                    <div>
                      <span>{production.totalProduction[key]}</span>
                    </div>
                  </div>
                ))
                .filter((item) => production.totalProduction[String(item.key)] > 0)}
          </S.Table>
        </>
      )}
    </S.Container>
  );
}
