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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface RawData {
  parking_name: string;
  pred_parking: number;
  pre_parking_time: Date;
}

const ChartPage = () => {
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
        const response = await axios.post('/api/parkingDataChart', {
          body: {
            parking_name: 'Your Parking Name', // 필요 시 업데이트
          },
          header: {
            'Content-Type': 'application/json',
          },
        });

        const rawData: RawData[] = response.data;

        // 데이터 변환
        const labels = rawData.map((item) =>
          new Date(item.pre_parking_time).toLocaleString(),
        );
        const values = rawData.map((item) => item.pred_parking);

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
      } catch (error) {
        console.error('Error fetching parking data:', error);
      }
    };

    fetchData();
  }, []); // 컴포넌트가 처음 렌더링될 때만 실행

  // 차트 옵션 설정
  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '주차 시간별 예측 데이터',
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
          text: '예측 주차 수',
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
