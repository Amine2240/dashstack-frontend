"use client";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Weldingcharts from "@/components/charts/weldingcharts";

import { API_URL } from "@/lib/api";

const Page = () => {
  const [weldingdata, setweldingdata] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/webhook-v1/welding-robot`
      );
      console.log("response : ", response.data);
      setweldingdata(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      weldingmachinepage
      {weldingdata.length > 0 ? ( // Conditional rendering
        <Weldingcharts data={weldingdata} />
      ) : (
        <p>No welding data available.</p>
      )}
    </div>
  );
};

export default Page;
