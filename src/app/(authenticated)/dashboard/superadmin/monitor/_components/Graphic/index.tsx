import dynamic from 'next/dynamic';
import React from 'react';
import { Props as ApexchartsPropsTypes } from 'react-apexcharts/types/react-apexcharts';

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

export const ChartComponent = ({ services }: { services: Service[] }) => {
  function formatDatePicker(service: Service) {
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

    if (service?.finished_at) return formatDate(service?.finished_at);
    if (service?.modification_at) return formatDate(service?.modification_at);
    return formatDate(service?.created_at);
  }

  function formatHourPicker(service: Service) {
    function formatDate(date: string) {
      const now = new Date(date);
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');

      return `${hours}:${minutes}`;
    }

    if (service?.finished_at) return formatDate(service?.finished_at);
    if (service?.modification_at) return formatDate(service?.modification_at);
    return formatDate(service?.created_at);
  }

  const dataPush = [];

  for (let i = 0; i < services.length; i++) {
    dataPush.push({
      day: formatDatePicker(services[i]),
      hour: formatHourPicker(services[i])
    });
  }

  const dataIndex = dataPush.map((i) => i.day);

  const series = [
    {
      name: 'Serviço',
      color: '#27A567',
      data: dataPush.map(({ day, hour }) => {
        const dayIndex = dataIndex.indexOf(day);
        const [hourPart, minutePart] = hour.split(':');
        const minutes = parseInt(hourPart, 10) * 60 + parseInt(minutePart, 10);
        return [dayIndex, minutes];
      })
    }
  ];

  const uniqueKeys: string[] = [];

  dataPush.forEach((obj) => {
    if (!uniqueKeys.includes(obj.day.slice(0, -8))) {
      uniqueKeys.push(obj.day.slice(0, -8));
    } else {
      uniqueKeys.push('');
    }
  });

  const options = {
    chart: {
      stacked: true,
      height: 350,
      type: 'area',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      }
    },
    grid: {
      row: {
        colors: ['#fff', '#f2f2f2'],
        opacity: 0.5
      },
      padding: {
        bottom: 20
      }
    },
    xaxis: {
      labels: {
        rotate: -45,
        rotateAlways: true,

        style: {
          fontSize: '12px',
          fontFamily: 'Arial, sans-serif',
          color: '#333',
          fontWeight: 'bold',
          fontStyle: 'italic'
        },
        formatter: function (value: string) {
          return uniqueKeys[Number(value)];
        }
      },
      min: 0,
      max: services.length - 1,
      tickAmount: services.length - 1
    },
    yaxis: {
      reversed: false,
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: 'Arial, sans-serif',
          color: '#333',
          fontWeight: 'bold',
          fontStyle: 'italic'
        },
        formatter: function (value: number) {
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
      tickAmount: 24
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'stepline',
      width: 3
    },
    markers: {
      size: 6
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
    }
  };

  return (
    <div style={{ paddingBottom: '30px' }}>
      <ApexChart
        key="apex-chart"
        height="500rem"
        options={options as ApexchartsPropsTypes}
        series={series}
      />
    </div>
  );
};
