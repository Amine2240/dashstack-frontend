"use client";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import PaintingRobotchart from "@/components/charts/paintingrobotscharts";

import { API_URL } from "@/lib/api";

const Page = () => {
  const [paintingrobotsdata, setpaintingrobotsdata] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/webhook-v1/painting-robot`
      );
      console.log("response : ", response.data);
      setpaintingrobotsdata(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      paintingrobotsmachinepage
      {paintingrobotsdata.length > 0 ? ( // Conditional rendering
        <PaintingRobotchart data={paintingrobotsdata} />
      ) : (
        <p>No paintingrobots data available.</p>
      )}
    </div>
  );
};

export default Page;
