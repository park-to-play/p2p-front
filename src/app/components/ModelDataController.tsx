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
} from 'chart.js';
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
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (parkingName !== '') {
          const response = await axios.get(
            `http://127.0.0.1:8000/parkingData/?parking_name=${parkingName}`,
          );
          const rawData: Item[] = response.data;

          // 데이터 변환
          const labels = rawData.map((item: Item) => {
            const test = new Date(item[2]).toLocaleString();
            return '오' + test.split('오')[1];
          });
          const values = rawData.map((item: Item) => {
            return item[1];
          });
          const isMobile = window.innerWidth <= 768; // 768px 이하일 경우 모바일 화면으로 간주
          const lineColor = isMobile
            ? 'rgba(0, 0, 0, 1)'
            : 'rgba(75, 192, 192, 1)'; // 모바일이면 검은색, 아니면 기본 색상
          setChartData({
            labels, // x축 레이블 (시간)
            datasets: [
              {
                label: '주차 예측 데이터',
                data: values, // y축 데이터 (예측 주차 값)
                borderColor: lineColor,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
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
    responsive: true, // 반응형으로 설정
    maintainAspectRatio: false, // 비율 유지 해제
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${parkingName}`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: '시간',
        },
        ticks: {
          autoSkip: true, // 레이블 간격 자동 조정
          maxRotation: 45, // 최대 회전 각도
          minRotation: 0, // 최소 회전 각도 (회전이 필요 없을 때는 0)
          font: {
            size: 10, // x축 글자 크기 조절
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
