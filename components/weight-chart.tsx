'use client'

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { PetHistory } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Scale } from "lucide-react"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface WeightChartProps {
  history: PetHistory[];
}

export function WeightChart({ history }: WeightChartProps) {
  const weightData = history
    .filter(h => h.weight != null && h.weight > 0)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const lastEntry = weightData[weightData.length - 1];
  const prevEntry = weightData.length > 1 ? weightData[weightData.length - 2] : null;

  const currentWeight = lastEntry?.weight || 0;
  const previousWeight = prevEntry?.weight || currentWeight;
  const weightDiff = currentWeight - previousWeight;

  const data = {
    labels: weightData.map(h => new Date(h.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: '2-digit' })),
    datasets: [
      {
        label: 'Peso (kg)',
        data: weightData.map(h => h.weight),
        fill: true,
        backgroundColor: 'rgba(45, 212, 191, 0.1)', // Primary teal with low opacity
        borderColor: '#2DD4BF', // Primary teal
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#2DD4BF',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4, // Smooths the line
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
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 13 },
        bodyFont: { size: 13, weight: 700 as const },
        padding: 10,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context: any) => `${context.parsed.y} kg`
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          font: { size: 11 },
          color: '#64748b' // slate-500
        }
      },
      y: {
        beginAtZero: false,
        grid: {
          color: '#e2e8f0', // slate-200
          borderDash: [5, 5],
        },
        border: { display: false },
        ticks: {
          font: { size: 11 },
          color: '#64748b',
          callback: (value: any) => `${value} kg`
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  return (
    <Card className="h-full border-border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Activity className="h-4 w-4 text-primary" />
          Evolución de Peso
        </CardTitle>
        {weightData.length > 0 && (
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold">{currentWeight} <span className="text-sm font-normal text-muted-foreground">kg</span></span>
            {weightData.length > 1 && (
              <span className={`text-xs font-medium mb-1 ${weightDiff > 0 ? 'text-green-600' : weightDiff < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                {weightDiff > 0 ? '+' : ''}{weightDiff.toFixed(1)} kg
              </span>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent>
        {weightData.length < 2 ? (
          <div className="h-[200px] flex flex-col items-center justify-center text-center p-4">
            <div className="bg-muted/30 p-4 rounded-full mb-3">
              <Scale className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <p className="text-sm font-medium text-foreground">Sin datos suficientes</p>
            <p className="text-xs text-muted-foreground max-w-[180px]">
              Registre al menos dos pesajes para ver la gráfica de evolución.
            </p>
          </div>
        ) : (
          <div className="h-[200px] w-full">
            <Line options={options} data={data} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
