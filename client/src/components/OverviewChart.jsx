// Displays cumulative monthly data (revenue or units), color-coded for totalSales (red) and totalUnits (green).

import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useGetSalesQuery } from "state/api";

const OverviewChart = ({ isDashboard = false, view }) => {
  const theme = useTheme();
  const { data, isLoading } = useGetSalesQuery();

  // Convert raw sales data into chart-friendly format
  const [totalSalesLine, totalUnitsLine] = useMemo(() => {
    if (!data) return [];

    const { monthlyData } = data;
    const salesLine = {
      id: "totalSales",
      color: "#FF3B30",
      data: [],
    };
    const unitsLine = {
      id: "totalUnits",
      color: "#34C759",
      data: [],
    };

    // Accumulate each month's values
    Object.values(monthlyData).reduce(
      (acc, { month, totalSales, totalUnits }) => {
        const curSales = acc.sales + totalSales;
        const curUnits = acc.units + totalUnits;
        salesLine.data.push({ x: month, y: curSales });
        unitsLine.data.push({ x: month, y: curUnits });
        return { sales: curSales, units: curUnits };
      },
      { sales: 0, units: 0 }
    );

    return [[salesLine], [unitsLine]];
  }, [data]);

  // Early exit if no data
  if (!data || isLoading) return "Loading...";

  // Decide which data to show
  const chartData = view === "sales" ? totalSalesLine : totalUnitsLine;

  // Custom tooltip
  const CustomTooltip = ({ point }) => {
    const isSales = point.serieId === "totalSales";
    const rawVal = Number(point.data.y).toLocaleString("en-US");
    const displayVal = isSales ? `$${rawVal}` : rawVal;

    return (
      <div
        style={{
          background: theme.palette.background.alt,
          padding: "0.5rem",
          border: `1px solid ${theme.palette.secondary[200]}`,
          borderRadius: "0.25rem",
        }}
      >
        <strong>{point.serieId}</strong> | {point.data.x}: {displayVal}
      </div>
    );
  };

  return (
    <ResponsiveLine
      data={chartData}
      theme={{
        axis: {
          domain: { line: { stroke: theme.palette.secondary[200] } },
          legend: { text: { fill: theme.palette.secondary[200] } },
          ticks: {
            line: {
              stroke: theme.palette.secondary[200],
              strokeWidth: 1,
            },
            text: {
              fill: theme.palette.secondary[200],
            },
          },
        },
        legends: {
          text: {
            fill: theme.palette.secondary[200],
          },
        },
        tooltip: {
          container: {
            color: theme.palette.primary.main,
          },
        },
      }}
      // Use data color
      colors={{ datum: "color" }}
      margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
      xScale={{ type: "point" }}
      yScale={{ type: "linear", stacked: false, min: "auto", max: "auto" }}
      // Format y-axis values with commas
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        legend: isDashboard
          ? ""
          : `Total ${view === "sales" ? "Revenue" : "Units"} for Year`,
        legendOffset: -60,
        legendPosition: "middle",
        format: (value) => Number(value).toLocaleString("en-US"),
      }}
      axisBottom={{
        format: (v) => (isDashboard ? v.slice(0, 3) : v),
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        legend: isDashboard ? "" : "Month",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh
      tooltip={CustomTooltip}
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-right",
                direction: "column",
                translateX: 30,
                translateY: -40,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: { itemBackground: "rgba(0, 0, 0, .03)", itemOpacity: 1 },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  );
};

export default OverviewChart;