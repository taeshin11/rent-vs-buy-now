'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface BreakevenChartProps {
  yearlyCosts: Array<{
    year: number;
    cumulativeBuy: number;
    cumulativeRent: number;
  }>;
  breakevenYear: number | null;
  cityName?: string;
}

export default function BreakevenChart({ yearlyCosts, breakevenYear, cityName }: BreakevenChartProps) {
  const labels = yearlyCosts.map(d => `Year ${d.year}`);

  const data = {
    labels,
    datasets: [
      {
        label: 'Buy (cumulative cost)',
        data: yearlyCosts.map(d => d.cumulativeBuy),
        borderColor: '#7c3aed',
        backgroundColor: 'rgba(124, 58, 237, 0.1)',
        fill: true,
        tension: 0.3,
        pointRadius: 3,
      },
      {
        label: 'Rent (cumulative cost)',
        data: yearlyCosts.map(d => d.cumulativeRent),
        borderColor: '#ea580c',
        backgroundColor: 'rgba(234, 88, 12, 0.1)',
        fill: true,
        tension: 0.3,
        pointRadius: 3,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: { size: 12 }
        }
      },
      title: {
        display: !!cityName,
        text: cityName ? `Rent vs Buy Cost Comparison — ${cityName}` : '',
        font: { size: 14 }
      },
      tooltip: {
        callbacks: {
          label: (ctx: { dataset: { label?: string }; parsed: { y: number | null } }) => {
            const val = ctx.parsed.y ?? 0;
            return `${ctx.dataset.label}: $${val.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          callback: (value: string | number) => `$${Number(value).toLocaleString()}`,
          font: { size: 11 }
        },
        grid: {
          color: 'rgba(0,0,0,0.05)'
        }
      },
      x: {
        grid: {
          color: 'rgba(0,0,0,0.05)'
        }
      }
    }
  };

  return (
    <div>
      {breakevenYear && (
        <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
          <strong>Breakeven at Year {breakevenYear}</strong> — After this point, cumulative ownership costs are lower than renting.
        </div>
      )}
      {!breakevenYear && (
        <div className="mb-3 p-3 bg-orange-50 border border-orange-200 rounded-lg text-sm text-orange-800">
          <strong>No breakeven within the timeline.</strong> Renting remains cheaper over the analyzed period.
        </div>
      )}
      <div className="h-72">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
