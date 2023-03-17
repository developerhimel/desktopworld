import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Classic Computer",
    },
  },
};

const labels = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Orders",
      data: [100, 39, 48, 77, 16, 25, 4],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Sold",
      data: [33, 56, 32, 46, 88, 23, 11],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};
function WeeklySales() {
  return (
    <div>
      <Bar className="text-white" options={options} data={data} />
    </div>
  );
}

export default WeeklySales;
