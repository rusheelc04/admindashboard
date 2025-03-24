// Displays a pie/donut chart showing sales breakdown by category.

import React from "react";
import { Box } from "@mui/material";
import Header from "components/Header";
import BreakdownChart from "components/BreakdownChart";

const Breakdown = () => {
  return (
    <Box m="1.5rem 2.5rem">
      {/* Page header */}
      <Header title="BREAKDOWN" subtitle="Breakdown of Sales By Category" />

      {/* Chart area */}
      <Box mt="40px" height="75vh">
        <BreakdownChart />
      </Box>
    </Box>
  );
};

export default Breakdown;