"use client";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import LeakTestchart from "@/components/charts/leaktestscharts";


import { API_URL } from "@/lib/api";

const Page = () => {
  const [leaktestsdata, setleaktestsdata] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/webhook-v1/leak-test`
      );
      console.log("response : ", response.data);
      setleaktestsdata(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      leaktestsmachinepage
      {leaktestsdata.length > 0 ? ( // Conditional rendering
        <LeakTestchart data={leaktestsdata} />
      ) : (
        <p>No leaktests data available.</p>
      )}
    </div>
  );
};

export default Page;
