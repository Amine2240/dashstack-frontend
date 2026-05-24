"use client";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import CNCDatachart from "@/components/charts/cncmachinescharts";
import { API_URL } from "@/lib/api";

const Page = () => {
  const [cncmachinedata, setcncmachinedata] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/webhook-v1/cnc-machine`
      );
      console.log("response : ", response.data);
      setcncmachinedata(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      cncmachinemachinepage
      {cncmachinedata.length > 0 ? ( // Conditional rendering
        <CNCDatachart data={cncmachinedata} />
      ) : (
        <p>No cncmachine data available.</p>
      )}
    </div>
  );
};

export default Page;
