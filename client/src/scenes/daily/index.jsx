// Shows daily revenue & units sold in a line chart, with date pickers to choose a custom date range.

import React, { useMemo, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Header from "components/Header";
import { ResponsiveLine } from "@nivo/line";
import { useGetSalesQuery } from "state/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Daily = () => {
  const [startDate, setStartDate] = useState(new Date("2021-02-01"));
  const [endDate, setEndDate] = useState(new Date("2021-03-01"));

  // Fetch daily sales data
  const { data } = useGetSalesQuery();
  const theme = useTheme();

  // Format data for chart usage
  const [formattedData] = useMemo(() => {
    if (!data) return [];
    const { dailyData } = data;

    const totalSalesLine = {
      id: "totalSales",
      color: "#FF3B30",
      data: [],
    };
    const totalUnitsLine = {
      id: "totalUnits",
      color: "#34C759",
      data: [],
    };

    Object.values(dailyData).forEach(({ date, totalSales, totalUnits }) => {
      const dateObject = new Date(date);
      if (dateObject >= startDate && dateObject <= endDate) {
        // label as "MM-DD"
        const label = date.substring(5);
        totalSalesLine.data.push({ x: label, y: totalSales });
        totalUnitsLine.data.push({ x: label, y: totalUnits });
      }
    });

    return [[totalSalesLine, totalUnitsLine]];
  }, [data, startDate, endDate]);

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
    <Box m="1.5rem 2.5rem">
      <Header title="DAILY SALES" subtitle="Daily totals for revenue and units sold" />

      <Box height="75vh">
        {/* Date Pickers */}
        <Box display="flex" justifyContent="flex-end" alignItems="center" gap="0.5rem">
          <Box>
            <Typography variant="body2" sx={{ mb: "0.2rem" }}>
              Start Date
            </Typography>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          </Box>
          <Box>
            <Typography variant="body2" sx={{ mb: "0.2rem" }}>
              End Date
            </Typography>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </Box>
        </Box>

        <Typography
          variant="body2"
          sx={{ mt: "1rem", color: theme.palette.secondary[300] }}
        >
          Select a date range to view daily revenue and units sold. Hover over points
          in the chart for exact daily values.
        </Typography>

        {/* Chart */}
        {data ? (
          <Box mt="2rem" height="65vh">
            <ResponsiveLine
              data={formattedData}
              theme={{
                axis: {
                  domain: { line: { stroke: theme.palette.secondary[200] } },
                  legend: { text: { fill: theme.palette.secondary[200] } },
                  ticks: {
                    line: { stroke: theme.palette.secondary[200], strokeWidth: 1 },
                    text: { fill: theme.palette.secondary[200] },
                  },
                },
                legends: {
                  text: { fill: theme.palette.secondary[200] },
                },
                tooltip: {
                  container: { color: theme.palette.primary.main },
                },
              }}
              colors={{ datum: "color" }}
              margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
              xScale={{ type: "point" }}
              yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: false,
                reverse: false,
              }}
              axisLeft={{
                orient: "left",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Totals",
                legendOffset: -50,
                legendPosition: "middle",
                format: (value) => Number(value).toLocaleString("en-US"),
              }}
              axisBottom={{
                orient: "bottom",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 45,
                legend: "Date (MM-DD)",
                legendOffset: 50,
                legendPosition: "middle",
              }}
              curve="catmullRom"
              enableGridX={false}
              enableGridY={false}
              pointSize={10}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              pointLabelYOffset={-12}
              useMesh
              tooltip={CustomTooltip}
              legends={[
                {
                  anchor: "top-right",
                  direction: "column",
                  translateX: 50,
                  translateY: 0,
                  itemWidth: 80,
                  itemHeight: 20,
                  symbolSize: 12,
                  symbolShape: "circle",
                  symbolBorderColor: "rgba(0, 0, 0, .5)",
                  itemsSpacing: 0,
                  itemDirection: "left-to-right",
                  itemOpacity: 0.75,
                  effects: [
                    {
                      on: "hover",
                      style: { itemBackground: "rgba(0, 0, 0, .03)", itemOpacity: 1 },
                    },
                  ],
                },
              ]}
            />
          </Box>
        ) : (
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
};

export default Daily;