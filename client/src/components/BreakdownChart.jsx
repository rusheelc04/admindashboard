// Displays a donut chart showing sales by category, with optional smaller format on the dashboard.

import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box, Typography, useTheme } from "@mui/material";
import { useGetSalesQuery } from "state/api";

const BreakdownChart = ({ isDashboard = false }) => {
  // Fetch sales data
  const { data, isLoading } = useGetSalesQuery();
  const theme = useTheme();

  // Exit if data is missing or still loading
  if (!data || isLoading) return "Loading...";

  // Define color array for contrast
  const colors = [
    "#FF3B30",
    "#34C759",
    "#FFA500",
    "#AF52DE",
    "#FF9500",
  ];

  // Transform data into format suitable for Nivo Pie
  const pieData = Object.entries(data.salesByCategory).map(([key, val], i) => ({
    id: key,
    label: key.charAt(0).toUpperCase() + key.slice(1),
    value: val,
    color: colors[i % colors.length],
  }));

  return (
    <Box
      height={isDashboard ? "400px" : "100%"}
      minHeight={isDashboard ? "325px" : undefined}
      minWidth={isDashboard ? "325px" : undefined}
      position="relative"
    >
      <ResponsivePie
        data={pieData}
        // Apply custom theme colors
        theme={{
          axis: { domain: { line: { stroke: theme.palette.secondary[200] } } },
          legends: { text: { fill: theme.palette.secondary[200] } },
          tooltip: { container: { color: theme.palette.primary.main } },
        }}
        // Use colors from datum
        colors={{ datum: "data.color" }}
        // Layout settings
        margin={
          isDashboard
            ? { top: 40, right: 80, bottom: 100, left: 50 }
            : { top: 40, right: 80, bottom: 80, left: 80 }
        }
        sortByValue
        innerRadius={0.45}
        padAngle={1}
        cornerRadius={5}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        // Label settings
        enableArcLinkLabels={!isDashboard}
        arcLinkLabelsTextColor={theme.palette.secondary[200]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        // Value formatting
        valueFormat={(val) => `$${Number(val).toLocaleString()}`}
        // Animations
        animate
        motionConfig="gentle"
        // Legend settings
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            translateX: isDashboard ? 20 : 0,
            translateY: isDashboard ? 50 : 56,
            itemWidth: 85,
            itemHeight: 18,
            itemTextColor: theme.palette.secondary[200],
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: { itemTextColor: theme.palette.primary[500] },
              },
            ],
          },
        ]}
        // Custom tooltip box
        tooltip={({ datum: { data } }) => (
          <Box
            p="6px 10px"
            borderRadius="4px"
            bgcolor={theme.palette.background.alt}
            boxShadow="0 0 4px rgba(0,0,0,0.3)"
          >
            <Typography variant="h6" color={theme.palette.secondary[100]}>
              {data.label}: ${Number(data.value).toLocaleString()}
            </Typography>
          </Box>
        )}
      />
      {/* Center text shows total sales */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        textAlign="center"
        pointerEvents="none"
        sx={{
          transform: isDashboard
            ? "translate(-75%, -170%)"
            : "translate(-50%, -100%)",
          color: theme.palette.secondary[400],
        }}
      >
        <Typography variant="h6">
          {!isDashboard && "Total: "}$
          {Number(data.yearlySalesTotal).toLocaleString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default BreakdownChart;