import React, {useState, useEffect } from 'react';
import styles from './Charts.module.css';
import { Line, Bar } from 'react-chartjs-2';
import { fetchDailyData } from '../api';



const Charts = ()=> {
    const [fetchData, setFetchData] = useState([]);
useEffect(() => {
    const fetchApi = async () => { setFetchData(await fetchDailyData()) };
    fetchApi();
    console.log(fetchApi)
}, [])
    
const lineChart = (
  <Line
    data={{
      labels: fetchData.map(({ date }) => date),
      datasets: [
        {
          // on charge les données et on boucle pour avoir toute la periode
          data: fetchData.map((data) => data.confirmed),
          label: "Infected",
          borderColor: "purple",
          fill: true,
        },
        {
          data: fetchData.map((data) => data.death),
          label: "Deaths",
          borderColor: "red",
          backgroundColor: "rgba(255,0,0,0.5)",
          fill: true,
        },
      ],
    }}
  />
);

    return (
      <div>
        <h1>Chart</h1>

        {lineChart}
      </div>
    );
}


export default Charts;

