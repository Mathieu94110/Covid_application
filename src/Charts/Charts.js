import React, {useState, useEffect } from 'react';
import styles from './Charts.module.css';
import { Line, Bar } from 'react-chartjs-2';
import { fetchDailyData } from '../api';



const Charts = ({ data: {confirmed, recovered, deaths }, country }) => {
    const [fetchData, setFetchData] = useState({});
    

  useEffect(() => {
      const fetchApi = async () => {
          const initialDailyData = await fetchDailyData();
          
      setFetchData(initialDailyData);
    };
    fetchApi();
    console.log(fetchApi);
  }, []);

  const lineChart =( fetchData[0] ? (
    <Line
      data={{
        labels: fetchData.map(({ date }) => date),
        datasets: [
          {
            // on charge les données et on boucle pour avoir toute la periode
            data: fetchData.map((data) => data.confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: fetchData.map((data) => data.deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255,0,0,0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null
  );
    const barChart = (confirmed ? (
        <Bar
            data={{
                labels: ["Infected", "Recovered", "Deaths"],
                datasets: [
                    {
                        label: "People",
                        backgroundColor: [
                            "rgba(0,0,255,0.5)",
                            "rgba(43, 255, 0, 0.5)",
                            "rgba(255, 17, 0, 0.5)",
                        ],
                        data: [confirmed.value, recovered.value, deaths.value],
                    },
                ],
            }}
            options={{
                legend: {
                    display: false,
                },
                title: { display: true, text: `Current state in ${country}` },
            }}
        />
    ) : null
    );
  return (
    // on aaffiche le resultat
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};



export default Charts;

