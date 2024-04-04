import React, { useEffect, useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function App() {
  const [dataX, setDataX] = useState([]);
  const [dataY, setDataY] = useState([]);
  const [matchedData, setMatchedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the URLs
        const responseX = await fetch('https://retoolapi.dev/o5zMs5/data');
        const responseY = await fetch('https://retoolapi.dev/gDa8uC/data');
        const dataX = await responseX.json();
        const dataY = await responseY.json();

        // Update state with fetched data
        setDataX(dataX);
        setDataY(dataY);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Match IDs and create objects
    const matched = [];
    dataX.forEach((itemX) => {
      const correspondingY = dataY.find((itemY) => itemY.id === itemX.id);
      if (correspondingY) {
        matched.push({
          x: parseFloat(itemX.RandomNumber),
          y: parseFloat(correspondingY.RandomNumber),
        });
      }
    });
    setMatchedData(matched);
  }, [dataX, dataY]);

  // Extract x and y values from matchedData
  const chartData = {
    datasets: [
      {
        label: 'Data Points',
        data: matchedData,
        fill: false,
        showLine: false,
        pointRadius: 5,
        pointBackgroundColor: 'rgba(75,192,192,1)',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointHoverRadius: 8,
      },
    ],
  };
  const options = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
      },
      y: {
        type: 'linear',
        position: 'left',
      },
    },
  };


  return (
    <div>
      <Scatter data={chartData} options={options} />
    </div>
  );
}

export default App;
