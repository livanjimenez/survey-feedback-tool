"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseClient";
import { Bar } from "react-chartjs-2";
import "chart.js/auto"; // Import all of Chart.js

interface ProcessedData {
  [key: string]: number;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    // add any other properties you need for your chart
  }[];
}

const Analytics = () => {
  const [data, setData] = useState<ChartData | null>(null);

  const processData = (responseData: any[]): ProcessedData => {
    let processedData: ProcessedData = {};

    // Loop through all the responses
    responseData.forEach((response) => {
      // If this surveyId has been seen before, increment the count
      if (processedData[response.surveyId]) {
        processedData[response.surveyId]++;
      }
      // If this is a new surveyId, initialize the count to 1
      else {
        processedData[response.surveyId] = 1;
      }
    });

    return processedData;
  };

  useEffect(() => {
    const fetchData = async () => {
      const responseCollection = collection(db, "responses");
      const responseSnapshot = await getDocs(responseCollection);
      const responseData = responseSnapshot.docs.map((doc) => doc.data());

      // Process your data here to calculate statistics and prepare it for the chart
      const processedData = processData(responseData);

      // Create labels and data arrays for the chart
      const labels = Object.keys(processedData);
      const data = Object.values(processedData);

      // Create the chart data object
      const chartData = {
        labels: labels,
        datasets: [
          {
            label: "Number of responses per survey",
            data: data,
            // Other chart settings go here
          },
        ],
      };

      setData(chartData);
    };

    fetchData();
  }, []);

  return (
    <div>
      {data && (
        <Bar
          data={data}
          // other props for your chart
        />
      )}
    </div>
  );
};

export default Analytics;
