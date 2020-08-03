import React, { useState, useEffect } from "react";
import styles from "./Charts.module.css";
import { Line, Bar } from "react-chartjs-2";
import { fetchDailyData } from "../api";

const Charts = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [fetchData, setFetchData] = useState({});

  useEffect(() => {
    const fetchApi = async () => {
      const initialDailyData = await fetchDailyData();
      console.log(initialDailyData);
      setFetchData(initialDailyData);
    };
    fetchApi();
  }, []);

  const lineChart = fetchData[0] ? (
    <Line
      data={{
        labels: fetchData.map(({ date }) => date),
        datasets: [
          {
            data: fetchData.map((data) => data.confirmed),
            label: "Contaminés",
            borderColor: "#3333ff",
            fill: true,
          },

          {
            data: fetchData.map((data) => data.death),
            label: "Décédés",
            borderColor: "#ff5733",
            backgroundColor: "rgba(255,0,0,0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;
  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Contaminés", "Soignés", "Décédés"],
        datasets: [
          {
            label: "Individus",
            backgroundColor: ["purple", "green", "#ff5733"],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: {
          display: false,
        },
        title: { display: true, text: `Situation en ${country}` },
      }}
    />
  ) : null;
  return (
    // on aaffiche le resultat
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Charts;
