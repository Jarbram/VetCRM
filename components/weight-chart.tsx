
'use client'

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { PetHistory } from '@/lib/types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface WeightChartProps {
  history: PetHistory[];
}

export function WeightChart({ history }: WeightChartProps) {
  const weightData = history
    .filter(h => h.weight != null && h.weight > 0)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (weightData.length < 2) {
    return <p className="text-center text-sm text-gray-500">No hay suficientes datos para mostrar la gráfica de peso.</p>;
  }

  const data = {
    labels: weightData.map(h => new Date(h.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Peso (kg)',
        data: weightData.map(h => h.weight),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Evolución del Peso',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      }
    }
  };

  return <Line options={options} data={data} />;
}
