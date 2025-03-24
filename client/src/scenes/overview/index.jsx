// Displays a toggle to view either cumulative monthly sales revenue or units sold.

import React, { useState } from "react";
import {
  FormControl,
  MenuItem,
  InputLabel,
  Box,
  Select,
  Typography,
} from "@mui/material";
import Header from "components/Header";
import OverviewChart from "components/OverviewChart";

const Overview = () => {
  // Default chart metric
  const [view, setView] = useState("sales");

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="DATA OVERVIEW"
        subtitle="Detailed look at your revenue and profit metrics"
      />

      <Box height="75vh">
        {/* Dropdown to switch between sales and units */}
        <FormControl sx={{ mt: "1rem" }}>
          <InputLabel>Select Metric</InputLabel>
          <Select
            value={view}
            label="Select Metric"
            onChange={(e) => setView(e.target.value)}
            sx={{ width: 140 }}
          >
            <MenuItem value="sales">Total Revenue</MenuItem>
            <MenuItem value="units">Units Sold</MenuItem>
          </Select>
        </FormControl>

        <Typography variant="body2" sx={{ mt: "1rem", color: "secondary.300" }}>
          This chart shows cumulative monthly data for
          {view === "sales" ? " total revenue" : " units sold"}.
          Toggle the dropdown above to switch metrics.
        </Typography>

        {/* Chart container */}
        <Box mt="2rem" height="65vh">
          <OverviewChart view={view} />
        </Box>
      </Box>
    </Box>
  );
};

export default Overview;