import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface PieChartProps {
  data: any;
  options?: ChartOptions<'pie'>;
}

const PieChart: React.FC<PieChartProps> = ({ data, options }) => {
  const defaultOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          boxWidth: 6,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.formattedValue;
            const dataset = context.dataset;
            const total = dataset.data.reduce((acc: number, data: number) => acc + data, 0);
            const percentage = Math.round((context.raw as number / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      },
    },
  };

  return <Pie data={data} options={options || defaultOptions} />;
};

export default PieChart;
