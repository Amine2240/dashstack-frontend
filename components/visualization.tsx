// /components/Visualization.tsx
"use client";
import React, { useState, useEffect } from "react";
import ChartStamp from "./chartvisualization/chartStamp";
import ChartWelding from "./chartvisualization/chartwelding";
import Chartcnc from "./chartvisualization/chartcnc";
import Chartpainting from "./chartvisualization/chartpainting";
import Assembly from "./chartvisualization/assembly";
import Downtime from "./chartvisualization/downtime";
import Energy from "./chartvisualization/energy";
import Inventory from "./chartvisualization/inventory";
import Maintenance from "./chartvisualization/maintenance";
import Materialwaste from "./chartvisualization/materialwaste";
import Operatoreff from "./chartvisualization/operatoreff";
import Production from "./chartvisualization/production";
import Qualitycontrol from "./chartvisualization/qualitycontrol";

interface ChartSection {
  title: string;
  description: string;
  icon: string;
  charts: React.ComponentType[];
}

const DataVisualization = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const sections: ChartSection[] = [
    {
      title: "Production Metrics",
      description: "Monitor production performance across all lines",
      icon: "📊",
      charts: [
        ChartStamp,
        ChartWelding,
        Chartcnc,
        Chartpainting,
        Assembly,
        Production,
      ],
    },
    {
      title: "Operational Health",
      description: "Track downtime, maintenance, and efficiency metrics",
      icon: "⚙️",
      charts: [Downtime, Maintenance, Operatoreff, Qualitycontrol],
    },
    {
      title: "Resources & Waste",
      description: "Monitor energy consumption, inventory, and waste",
      icon: "♻️",
      charts: [Energy, Inventory, Materialwaste],
    },
  ];

  const renderSection = (section: ChartSection, index: number) => (
    <div key={index} className="space-y-6">
      {/* Section Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{section.icon}</span>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                {section.title}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {section.description}
              </p>
            </div>
          </div>
        </div>
        <div className="h-1 flex-1 max-w-xs ml-16 bg-gradient-to-r from-cyan-400/50 to-transparent rounded-full" />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {section.charts.map((ChartComponent, idx) => (
          <div
            key={idx}
            className="surface overflow-hidden transition-all duration-300 hover:shadow-[0_24px_72px_rgba(15,23,42,0.18)]"
          >
            {isLoading ? (
              <div className="h-96 bg-gradient-to-br from-white to-slate-50 p-6 flex flex-col gap-4">
                <div className="skeleton h-8 w-32 rounded-lg" />
                <div className="flex-1 space-y-3">
                  <div className="skeleton h-full w-full rounded-lg" />
                </div>
                <div className="flex gap-2">
                  <div className="skeleton h-4 w-16 rounded-full" />
                  <div className="skeleton h-4 w-16 rounded-full" />
                </div>
              </div>
            ) : (
              <ChartComponent />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="content-shell space-y-12 pb-12">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-700 px-8 py-10 text-white shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.24),transparent_30%)]" />
        <div className="relative space-y-3">
          <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/90">
            Analytics & Insights
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            Data Visualization
          </h1>
          <p className="text-base text-white/75 max-w-2xl">
            Real-time insights into your factory operations, production metrics,
            and resource utilization
          </p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Active Machines", value: "12", unit: "running" },
          { label: "Avg Efficiency", value: "94.2", unit: "%" },
          { label: "Total Production", value: "1,247", unit: "units" },
        ].map((stat, idx) => (
          <div key={idx} className="surface p-6">
            <p className="text-sm font-medium uppercase tracking-[0.08em] text-slate-500">
              {stat.label}
            </p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">
              {stat.value}
              <span className="text-sm font-normal text-slate-500 ml-2">
                {stat.unit}
              </span>
            </p>
          </div>
        ))}
      </div>

      {/* Content Sections */}
      <div className="space-y-16">
        {sections.map((section, idx) => renderSection(section, idx))}
      </div>

      {/* Footer Info */}
      <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-cyan-100 p-3 text-cyan-600 flex-shrink-0">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 15h-2v-2h2v2m0-4h-2V7h2v6z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Real-time Updates</h3>
            <p className="mt-1 text-sm text-slate-600">
              All charts are updated in real-time. Data is refreshed every 30
              seconds to reflect the latest factory metrics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataVisualization;
