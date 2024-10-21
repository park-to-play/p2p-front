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
            return new Date(item[2]).toLocaleString();
          });
          const values = rawData.map((item: Item) => {
            return item[1];
          });
          setChartData({
            labels, // x축 레이블 (시간)
            datasets: [
              {
                label: '주차 예측 데이터',
                data: values, // y축 데이터 (예측 주차 값)
                borderColor: 'rgba(75, 192, 192, 1)',
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
    responsive: true,
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
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ChartPage;
