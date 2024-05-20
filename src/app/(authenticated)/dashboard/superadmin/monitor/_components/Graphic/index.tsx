'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { Props as ApexchartsPropsTypes } from 'react-apexcharts/types/react-apexcharts';

import { encryptObject } from 'functions';

import moment from 'moment';

import * as S from './styles';

interface Service {
  id: number;
  employee_id: number;
  client_name: string;
  name_tec: string;
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
  observation: string;
  protocol: string;
}

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

function formatDate(date: string) {
  const now = new Date(date);
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function formatDatePicker(service: Service) {
  if (service.finished_at) return formatDate(service.finished_at);
  if (service.modification_at) return formatDate(service.modification_at);
  return formatDate(service.start_service_at);
}

const status = {
  concluded: '✅ Finalizado',
  analysis: '🔍 Em análise',
  active: '🚧 Em andamento',
  paused: '⏸️ Pausado',
  canceled: '❌ Cancelado'
} as { [key: string]: string };

export const ChartComponent = ({ services }: { services: Service[] }) => {
  const openTooltip = useRef<number | null>(null);
  const data = services.map((service) => formatDatePicker(service));

  const router = useRouter();

  const employees = Array.from(
    new Set(
      services.map((user) => {
        return JSON.stringify({
          employee_id: user.employee_id,
          name: user.name_tec
        });
      })
    )
  );

  const statusColor = {
    concluded: '#2ecc71',
    analysis: '#f1c40f',
    active: '#3498db',
    paused: '#e67e22',
    canceled: '#e74c3c',
    scheduled: '#95a5a6'
  } as const;

  type TypeStatusColor = keyof typeof statusColor;

  const series = employees.map((user) => {
    const data = services.map((service) => {
      if (service.employee_id === JSON.parse(user).employee_id) {
        return formatDatePicker(service);
      }
      return '';
    });

    return {
      name: String(JSON.parse(user).name),
      color: 'rgba(40, 40, 40, 0.8)',
      data: data.map((day, index) => {
        const time = day?.substring(day.length - 5);
        const [hourPart, minutePart] = time.split(':');
        const minutes = parseInt(hourPart, 10) * 60 + parseInt(minutePart, 10);

        const yourDate = moment(services[index].start_service_at);
        const passedScheduledDate = yourDate.isSameOrBefore(moment());

        return {
          x: index,
          y: minutes,
          fillColor:
            statusColor[
              passedScheduledDate ? (services[index].status as TypeStatusColor) : 'scheduled'
            ]
        };
      })
    };
  });

  const xAxisValues: string[] = [];

  data.forEach((day) => {
    if (!xAxisValues.includes(day.slice(0, -6))) {
      xAxisValues.push(day.slice(0, -6));
    } else {
      xAxisValues.push('');
    }
  });

  type FuncType = (
    event: { touches: unknown },
    chartContext: unknown,
    config: { dataPointIndex: number; seriesIndex: number; w: unknown }
  ) => void;

  const dataPointSelection: FuncType = (event, chartContext, config) => {
    if (openTooltip.current === config.dataPointIndex && event.touches) {
      console.log(event.touches);

      const encryptSlug = encryptObject({
        protocol: services[config.dataPointIndex].protocol,
        employeeId: services[config.dataPointIndex].employee_id,
        updateCount: services[config.dataPointIndex].update_count
      });

      router.push(`/dashboard/superadmin/manage/details/${encryptSlug}`, { scroll: false });
    }

    const tooltip = document.querySelector('.apexcharts-tooltip') as HTMLElement | null;
    if (tooltip) tooltip.style.opacity = '1';
    openTooltip.current = config.dataPointIndex;
  };

  const options = {
    chart: {
      events: {
        dataPointMouseLeave: function () {
          const elemento = document.querySelector('.apexcharts-tooltip') as HTMLElement | null;
          if (elemento && openTooltip.current) {
            openTooltip.current = null;
            elemento.style.opacity = '0';
          }
        },
        dataPointSelection
      },
      animations: {
        enabled: false
      },
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      line: {
        isSlopeChart: false
      }
    },
    grid: {
      row: {
        colors: ['#fff', '#f2f2f2'],
        opacity: 0.5
      },
      padding: {
        bottom: 20,
        right: 10
      }
    },
    xaxis: {
      labels: {
        rotate: -45,
        rotateAlways: true,

        offsetX: 7,
        style: {
          fontSize: '12px',
          fontFamily: 'Arial, sans-serif',
          colors: '#000',
          fontWeight: 'bold',
          fontStyle: 'italic'
        },
        formatter: (value: string) => xAxisValues[Number(value)]
      },
      tooltip: {
        formatter: function (index: number) {
          return formatDatePicker(services[index]);
        }
      },
      min: 0,
      max: services.length,
      tickAmount: services.length * 2
    },
    yaxis: {
      reversed: false,
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: 'Arial, sans-serif',
          colors: '#000',
          fontWeight: 'bold',
          fontStyle: 'italic'
        },
        offsetY: 0,
        offsetX: -9,
        formatter: (value: number) => {
          if (value === 24 * 60) {
            return '00:00';
          } else {
            const hours = Math.floor(value / 60);
            const minutes = value % 60;
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
          }
        }
      },
      min: 0,
      max: 24 * 60,
      tickAmount: 12
    },
    dataLabels: {
      enabled: true,
      offsetX: 5,
      offsetY: -15,
      textAnchor: 'end',
      formatter: function (
        timeOfDay: number,
        props: { dataPointIndex: number; seriesIndex: number; w: unknown }
      ) {
        const { dataPointIndex } = props;
        if (timeOfDay) {
          return services[dataPointIndex].name_tec;
        }
      },
      background: {
        borderRadius: 5,
        padding: 5
      },
      style: {
        cssClass: 'custom-data-label',
        colors: ['#3498db'],
        fontSize: '1.3rem'
      }
    },
    markers: {
      strokeColors: ['#000000'],
      strokeWidth: 1.5,
      offsetX: 15,
      size: 10,
      onItemClick: {
        toggleDataSeries: true
      }
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      position: 'top',
      horizontalAlign: 'left',
      offsetY: 10,
      markers: {
        width: 0,
        height: 0
      },
      labels: {
        colors: '#fff',
        useSeriesColors: false
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'horizontal',
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [50, 0, 100]
      }
    },
    tooltip: {
      custom: ({ dataPointIndex }: { dataPointIndex: number }) => {
        return `<div class="tooltip">
          <span>Funcionário: ${services[dataPointIndex].name_tec}</span><br>
          <span>Solicitante: ${services[dataPointIndex].client_name}</span><br>
          <span>Cidade: ${services[dataPointIndex].city}</span><br>
          <span>Protocolo: ${services[dataPointIndex].protocol}</span><br>
          <span>Serviço: ${status[services[dataPointIndex].status]}</span>
          </div>
        `;
      }
    }
  };

  return (
    <S.Table>
      <ApexChart
        key="apex-chart"
        height="400rem"
        type="scatter"
        options={options as ApexchartsPropsTypes}
        series={series}
      />
    </S.Table>
  );
};
