// app/page.tsx (Next.js 14+ 버전)
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
  label: string;
  value: number;
  timestamp: string;
}

const ChartPage = () => {
  // 원시 데이터
  const rawData: RawData[] = [
    { label: '금융투자협회', value: 92, timestamp: '2024-10-20T10:52:11' },
    { label: '금융투자협회', value: 18, timestamp: '2024-10-20T12:32:11' },
    { label: '금융투자협회', value: 35, timestamp: '2024-10-20T14:12:11' },
    { label: '금융투자협회', value: 42, timestamp: '2024-10-20T15:52:11' },
    { label: '금융투자협회', value: 30, timestamp: '2024-10-20T17:32:11' },
    { label: '금융투자협회', value: 47, timestamp: '2024-10-20T19:12:11' },
    { label: '금융투자협회', value: 93, timestamp: '2024-10-20T20:52:11' },
    { label: '금융투자협회', value: 10, timestamp: '2024-10-20T22:32:11' },
    { label: '금융투자협회', value: 18, timestamp: '2024-10-21T00:12:11' },
    { label: '금융투자협회', value: 72, timestamp: '2024-10-21T01:52:11' },
  ];

  // 차트 데이터를 위한 상태 정의
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: '',
        data: [] as number[],
        borderColor: '',
        backgroundColor: '',
        fill: true,
      },
    ],
  });

  useEffect(() => {
    // 데이터를 차트 형식에 맞게 변환
    const labels = rawData.map((item) =>
      new Date(item.timestamp).toLocaleString(),
    );
    const values = rawData.map((item) => item.value);

    setChartData({
      labels: labels, // x축 레이블 (시간)
      datasets: [
        {
          label: '금융투자협회 데이터',
          data: values, // y축 데이터 (값)
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        },
      ],
    });
  }, []); // 빈 배열로 의존성 지정, 첫 렌더링 때만 실행

  // 차트 옵션 설정 (타입 추가)
  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '금융투자협회 시간별 예측 데이터',
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
          text: '값',
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
