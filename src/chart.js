import React, { useState } from 'react';
import {Line} from 'react-chartjs-2';

function ChartContainer(props){
    const data = {
        labels: props.date,
        datasets: [
          {
            label: 'Weather Info',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data:props.weather
          }
        ]
      };
    return (
        <div>
          <h2>Next 7 days of data</h2>
          <Line data={data} />
        </div>
      );
}

export default ChartContainer