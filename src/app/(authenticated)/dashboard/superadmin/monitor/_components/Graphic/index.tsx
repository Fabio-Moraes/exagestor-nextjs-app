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

const statusColor = {
  concluded: '#2ecc71',
  analysis: '#f1c40f',
  active: '#17A2B8',
  paused: '#e67e22',
  canceled: '#e74c3c',
  scheduled: '#95a5a6'
} as const;

type TypeStatusColor = keyof typeof statusColor;

export const ChartComponent = ({ services }: { services: Service[] }) => {
  const openTooltip = useRef<number | null>(null);
  const data = services.map((service) => formatDatePicker(service));
  const router = useRouter();

  const changeBalloon = () => {
    const rects = document.querySelectorAll('.apexcharts-data-labels rect');
    const texts = document.querySelectorAll('.apexcharts-data-labels text');
    const textValues = Array.from(texts).map((text) => String(text.textContent));

    const numbers = textValues
      .map((text) => {
        const match = text.match(/^\d+/);
        return match ? Number(match[0]) : null;
      })
      .filter((num) => num !== null) as Array<number>;

    rects.forEach((rect, index) => {
      const service = services[numbers[index]];
      if (service) {
        rect.setAttribute('fill', statusColor[service.status as TypeStatusColor]);

        const svgNS = 'http://www.w3.org/2000/svg';

        const rectX = parseFloat(rect.getAttribute('x')!);
        const rectY = parseFloat(rect.getAttribute('y')!);
        const rectWidth = parseFloat(rect.getAttribute('width')!);
        const rectHeight = parseFloat(rect.getAttribute('height')!);

        // Adicionar balão de fundo
        const textContent = services[numbers[index]].name_tec;
        const textWidth = textContent.length * 6.5;
        const textHeight = 20;
        const balloonWidth = textWidth + 20;
        const balloonHeight = textHeight + 10;

        const balloonPath = document.createElementNS(svgNS, 'path');
        const balloonX = rectX + rectWidth / 5 - balloonWidth + 15;
        const balloonY = rectY + rectHeight - 25;

        const balloonPathData = `
        M${balloonX + 10},${balloonY}
        h${balloonWidth - 20}
        a10,10 0 0 1 10,10
        v${balloonHeight - 30}
        a10,10 0 0 1 -10,10
        h-${balloonWidth - 20}
        a10,10 0 0 1 -10,-10
        v-${balloonHeight - 30}
        a10,10 0 0 1 10,-10
        Z
        M${balloonX + balloonWidth - 20},${balloonY + balloonHeight - 6} 
        L${balloonX + balloonWidth - 15},${balloonY + balloonHeight}
        L${balloonX + balloonWidth - 10},${balloonY + balloonHeight - 6}
        Z
      `;

        const yourDate = moment(services[numbers[index]].start_service_at);
        const passedScheduledDate = yourDate.isSameOrBefore(moment());
        const statusSelect = passedScheduledDate
          ? (services[index].status as TypeStatusColor)
          : 'scheduled';

        balloonPath.setAttribute('d', balloonPathData);
        balloonPath.setAttribute('opacity', '0.9');
        balloonPath.setAttribute('fill', statusColor[statusSelect]);
        balloonPath.setAttribute('stroke', '#343A40');
        balloonPath.setAttribute('stroke-width', '1.5');

        rect.parentNode?.appendChild(balloonPath);

        // Adicionar texto SVG dentro do balão
        const svgText = document.createElementNS(svgNS, 'text');
        svgText.setAttribute('x', String(balloonX + balloonWidth / 2));
        svgText.setAttribute('y', String(balloonY + balloonHeight / 2));
        svgText.setAttribute('fill', '#ffffff');
        svgText.setAttribute('font-size', '12');
        svgText.setAttribute('text-anchor', 'middle');
        svgText.textContent = textContent;

        rect.parentNode?.appendChild(svgText);
      }
    });

    if (rects.length === 0 || texts.length === 0) {
      setTimeout(changeBalloon, 500);
    }
  };

  const servicesStringify = Array.from(
    new Set(
      services.map((user) => {
        return JSON.stringify({
          employee_id: user.employee_id,
          name: user.name_tec
        });
      })
    )
  );

  const series = servicesStringify.map((user) => {
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

  type DataPointSelectionType = (
    event: { touches: unknown },
    chartContext: unknown,
    config: { dataPointIndex: number }
  ) => void;

  const dataPointSelection: DataPointSelectionType = (event, chartContext, config) => {
    if (event.touches) return;
    const tooltip = document.querySelector('.apexcharts-tooltip') as HTMLElement | null;

    if (openTooltip.current === config.dataPointIndex) {
      const encryptSlug = encryptObject({
        protocol: services[config.dataPointIndex].protocol,
        employeeId: services[config.dataPointIndex].employee_id,
        updateCount: services[config.dataPointIndex].update_count
      });

      router.push(`/dashboard/superadmin/manage/details/${encryptSlug}`, { scroll: false });
    } else if (tooltip) {
      tooltip.style.opacity = '1';
      openTooltip.current = config.dataPointIndex;
    }
  };

  const options = {
    chart: {
      events: {
        dataPointSelection,
        mounted: () => {
          changeBalloon();
        },
        updated: () => {
          changeBalloon();
        },
        click: (event: React.MouseEvent<HTMLElement>) => {
          const target = event.target as HTMLElement;
          const targetClass = target.getAttribute('class');
          const tooltip = document.querySelector('.apexcharts-tooltip') as HTMLElement | null;

          if (tooltip && targetClass) {
            if (targetClass !== 'apexcharts-marker') {
              openTooltip.current = null;
              tooltip.style.opacity = '0';
            }
          }
        }
      },
      animations: { enabled: false },
      zoom: { enabled: false },
      toolbar: { show: false }
    },
    plotOptions: { line: { isSlopeChart: false } },
    grid: {
      row: { colors: ['#fff', '#f2f2f2'], opacity: 0.5 },
      padding: { bottom: 20, right: 10 }
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
      offsetX: 3,
      offsetY: -20,
      textAnchor: 'end',

      formatter: function (timeOfDay: number, props: { dataPointIndex: number }) {
        const { dataPointIndex } = props;
        if (timeOfDay) {
          return dataPointIndex;
        }
      },
      background: {
        borderRadius: 5,
        padding: 1
      }
    },
    markers: {
      strokeColors: ['#343A40'],
      strokeWidth: 1.5,
      offsetX: 15,
      size: 10
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
          </div>`;
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
