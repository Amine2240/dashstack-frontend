// /components/CSVTable.js
"use client";
import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import ChartStamp from "./chartvisualization/chartStamp";
import ChartWelding from "./chartvisualization/chartwelding";
import axios from "axios";
import Chartcnc from "./chartvisualization/chartcnc";
import Chartpainting from "./chartvisualization/chartpainting";
import Assembly from "./chartvisualization/assembly";
import Downtime from "./chartvisualization/downtime";
import Energy from "./chartvisualization/energy";
import Invetory from "./chartvisualization/inventory";
import Maintenance from "./chartvisualization/maintenance";
import Materialwaste from "./chartvisualization/materialwaste";
import Operatoreff from "./chartvisualization/operatoreff";
import Production from "./chartvisualization/production";
import Qualitycontrol from "./chartvisualization/qualitycontrol";

const datavisualization = () => {
  interface CSVRow {
    Timestamp: string;
    KPI_Value: string;
    KPI_Name: string;
  }

  return (
    <div>
      <ChartStamp />
      <ChartWelding />
      <Chartcnc />
      <Chartpainting />
      <Assembly />
      <Downtime />
      <Energy />
      <Invetory />
      <Maintenance />
      <Materialwaste />
      <Operatoreff />
      <Production />
      <Qualitycontrol />
    </div>
  );
};

export default datavisualization;
