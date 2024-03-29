import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);
interface TimeChartProps {
  times: number[];
}

const TimeChart = ({ times }: TimeChartProps) => {
  const chartData = {
    labels: times.map((_, i) => i + 1),
    datasets: [
      {
        label: "Time",
        data: times,
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  return <Line width={1000} height={200} data={chartData} />;
};

export default TimeChart;
