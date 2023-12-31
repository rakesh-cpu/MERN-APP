
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import { BarElement, LinearScale,PointElement,LineElement} from 'chart.js';
import {
  Chart as ChartJS,
  CategoryScale,
  
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  console.log(coinHistory)
  const coinPrice = [];
  const coinTimestamp = [];
  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  console.log(coinPrice[1])
  // for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
  //   coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
  // }
  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    const unixTimestampSeconds = coinHistory?.data?.history[i].timestamp; // Assuming this is in seconds
    const dateObject = new Date(unixTimestampSeconds * 1000); // Convert seconds to milliseconds
  
    const dateString = dateObject.toLocaleDateString(); // Convert to readable date format
    coinTimestamp.push(dateString);
  }
  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In Rupees',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">{coinName} Price Chart </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title>
          <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;