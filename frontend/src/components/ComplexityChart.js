import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ComplexityChart = ({ functions }) => {
  if (!functions || functions.length === 0) {
    return <p className="text-center">No functions to display</p>;
  }

  const getComplexityColor = (complexity) => {
    if (complexity < 5) return 'rgba(40, 167, 69, 0.7)'; // Green
    if (complexity < 10) return 'rgba(255, 193, 7, 0.7)'; // Yellow
    return 'rgba(220, 53, 69, 0.7)'; // Red
  };

  const data = {
    labels: functions.map(func => func.name),
    datasets: [
      {
        label: 'Cyclomatic Complexity',
        data: functions.map(func => func.complexity),
        backgroundColor: functions.map(func => getComplexityColor(func.complexity)),
        borderWidth: 1,
      },
      {
        label: 'Lines of Code',
        data: functions.map(func => func.loc),
        backgroundColor: 'rgba(13, 110, 253, 0.5)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ComplexityChart;