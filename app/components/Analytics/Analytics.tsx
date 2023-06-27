"use client";
import { useEffect, useState, useContext } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseClient";
import { Bar } from "react-chartjs-2";
import { AuthContext } from "@/app/context/AuthContext";
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
  // use the AuthContext to get the current user
  const { user } = useContext(AuthContext);

  const processData = (responseData: any[]): ProcessedData => {
    let processedData: ProcessedData = {};

    // Loop through all the responses
    responseData.forEach((response) => {
      const surveyId = response.surveyId;

      // Check if response.responses is an object
      if (response.responses && typeof response.responses === "object") {
        // Loop through the keys in the responses object and process the data
        Object.keys(response.responses).forEach((key) => {
          const answer = response.responses[key];
          // Your aggregation logic here
          // For now, you can simply log the answer to see what data you have
          console.log("answer:", answer);
        });
      } else {
        // Log the issue to see what response.responses contains
        console.error(
          "Expected responses to be an object, but got:",
          response.responses
        );
      }

      // Increment the count for this surveyId
      if (processedData[surveyId]) {
        processedData[surveyId]++;
      } else {
        processedData[surveyId] = 1;
      }
    });

    return processedData;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return; // exit if there is no user logged in

      // Query to get responses for surveys created by the logged-in user
      const responseQuery = query(
        collection(db, "responses"),
        where("userId", "==", user.uid)
      );

      const responseSnapshot = await getDocs(responseQuery);
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
  }, [user]); // dependency array includes the user

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
