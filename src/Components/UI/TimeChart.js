import React from "react";
import { Line, defaults } from "react-chartjs-2";
import msecToTime from '../../Algo/MsecToTime';

const TimeChart = (props) => {

  const options = {
    aspectRatio: 3.25,
    animation: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "No. of solve",
          font: {
            size: 14,
          },
        },
      },
      y: {
        ticks: {
          callback: function(value) {
            return msecToTime(value);
          }
        },
        reverse: true,
        title: {
          display: true,
          text: "Solve time",
          font: {
            size: 14,
          },
        },
      },
    },
  };
  
  // creates array of consecutive integers to represent labels
  const getLabels = (times) => {
    let labels = [];
    for (let i = 0; i < times.length; i++) {
      labels.push(i + 1);
    }
    return labels;
  };

  defaults.font.family = "Roboto Mono";
  const data = {
    labels: getLabels(props.times),
    datasets: [
      {
        label: "Solve time",
        data: props.times,
        backgroundColor: "rgb(255, 99, 132, 0.4)",
        borderColor: "rgba(255, 99, 132, 0.9)",
        fill: "start",
        cubicInterpolationMode: "monotone",
      },
    ],
  };

  return <Line data={data} options={options} />;
};

export default React.memo(TimeChart);
