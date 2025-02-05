import React, { useState, useEffect } from "react";

import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

const Chart = ({ data: { confirmed, deaths, recovered}, country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };

    fetchAPI();
    console.log(dailyData);
  }, []);

  // const lineChart = dailyData.length ? (
  //   <Line
  //     data={{
  //       lables: dailyData.map(({ date }) => date),
  //       datasets: [
  //         {
  //           data: dailyData.map(({ confirmed }) => confirmed),
  //           label: "Infected",
  //           borderColor: "#3333ff",
  //           fill: true,
  //         },
  //         {
  //           data: dailyData.map(({ deaths }) => deaths),
  //           label: "Infected",

  //           borderColor: "rgba(255, 0, ,0, 0.5)",
  //           fill: true,
  //         },
  //       ],
  //     }}
  //   />
  // ) : null;

  console.log(confirmed, recovered, deaths);

  const barChart = (
    confirmed
    ?(
      <Bar
      data={{
        lables:['Infected', 'Recovered', 'Deaths'],
        datasets: [{
          lable: 'people',
          backgroundColor: [ 'rgba(0, 0, 255, 0.5)','rgba(0, 255, 0, 0.5)',' rgba(255, 0, 0, 0.5)'], data:[confirmed.value, recovered.value, deaths.value]
        }]


      }}
      options={{
        legend: { display: false},
        title: {display: true, text: `Current state in ${country}`},
      }}
      />
    ): null 
  )

  return <div className={styles.container}>
    {country ? barChart : null}
  
  </div>;
};

export default Chart;
