'use client';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  Chart,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useGlobalParkingNameState } from '../hooks/glovalParkingName';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

type Item = [string, number, Date];

const ChartPage = () => {
  const { parkingName } = useGlobalParkingNameState();
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: '예측 주차 데이터',
        data: [] as number[],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        pointBackgroundColor: [] as string[], // 포인트 색상 배열 추가
      },
    ],
  });
  Chart.register(ChartDataLabels);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (parkingName !== '') {
          const isMobile = window.innerWidth <= 768;
          const response = await axios.get(
            `http://127.0.0.1:8000/parkingData/?parking_name=${parkingName}`,
          );
          let rawData: Item[] = response.data;
          // 시간 기준으로 정렬
          rawData.sort(
            (a, b) => new Date(a[2]).getTime() - new Date(b[2]).getTime(),
          );
          rawData = rawData.filter(
            (item, index, self) =>
              index ===
              self.findIndex(
                (t) => new Date(t[2]).getTime() === new Date(item[2]).getTime(),
              ),
          );

          const dataToShow = rawData;
          // 데이터 변환
          const labels = dataToShow.map((item: Item) => {
            const test = new Date(item[2]).toLocaleString();
            return '오' + test.split('오')[1];
          });
          const values = dataToShow.map((item: Item) => item[1]);

          const lineColor = isMobile
            ? 'rgba(255, 255, 255, 1)'
            : 'rgba(75, 192, 192, 1)';

          const pointColors = values.map(
            (_, index) =>
              index === values.length - 1
                ? 'rgba(255, 99, 132, 1)' // 마지막 값의 색상
                : lineColor, // 나머지 값의 색상
          );

          setChartData({
            labels,
            datasets: [
              {
                label: '주차 예측 데이터',
                data: values,
                borderColor: lineColor,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                pointBackgroundColor: pointColors, // 각 포인트의 색상을 지정
              },
            ],
          });
        }
      } catch (error) {
        console.error('Error fetching parking data:', error);
      }
    };

    fetchData();
  }, [parkingName]);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${parkingName}`,
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
        offset: 3, // 데이터 레이블을 5px 위로 띄움
        color: '#000', // 레이블 색상
        font: {
          size: 12, // 폰트 크기
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: '시간',
        },
        ticks: {
          autoSkip: true,
          maxRotation: 45,
          minRotation: 0,
          stepSize: 4, // 간격을 조정하여 레이블이 덜 겹치게
          font: {
            size: 10,
          },
          callback: function (value: number, index, ticks) {
            // 긴 레이블을 잘라 표시하기 (필요한 경우)
            const label = this.getLabelForValue(value);
            return label.length > 10 ? label.substr(0, 10) + '...' : label;
          },
        },
      },
      y: {
        title: {
          display: true,
          text: '예측 주차 대수',
        },
      },
    },
  };

  return (
    <div
      style={{
        width: '100%',
        height: '400px',
        maxWidth: '100%',
        margin: '0 auto',
      }}
    >
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ChartPage;
