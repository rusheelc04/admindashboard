// Shows key metrics, a sales overview chart, a transactions table, and a sales-by-category donut chart.

import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import { useGetDashboardQuery } from "state/api";
import StatBox from "components/StatBox";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetDashboardQuery();

  // Helper to format integers with commas
  const formatNumber = (num) => (num ? Number(num).toLocaleString() : "0");
  // Helper to format currency with commas
  const formatMoney = (num) => (num ? `$${Number(num).toLocaleString()}` : "$0");

  // DataGrid columns
  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "userId", headerName: "User ID", flex: 1 },
    { field: "createdAt", headerName: "Created At", flex: 1 },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => {
        const cost = Number(params.value).toFixed(2);
        return `$${Number(cost).toLocaleString()}`;
      },
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </FlexBetween>

      {/* Main layout grid */}
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": {
            gridColumn: isNonMediumScreens ? undefined : "span 12",
          },
        }}
      >
        {/* Row 1: Stat boxes */}
        <StatBox
          title="Total Customers"
          value={data ? formatNumber(data.totalCustomers) : "0"}
          increase="+ or - %"
          description="Since last month"
          icon={
            <Email sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />
          }
        />

        <StatBox
          title="Sales Today"
          value={data ? formatMoney(data.todayStats.totalSales) : "$0"}
          increase="+ or - %"
          description="Since last month"
          icon={
            <PointOfSale sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />
          }
        />

        {/* Large chart for overall sales */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="sales" isDashboard />
        </Box>

        <StatBox
          title="Monthly Sales"
          value={data ? formatMoney(data.thisMonthStats.totalSales) : "$0"}
          increase="+ or - %"
          description="Since last month"
          icon={
            <PersonAdd sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />
          }
        />

        <StatBox
          title="Yearly Sales"
          value={data ? formatMoney(data.yearlySalesTotal) : "$0"}
          increase="+ or - %"
          description="Since last month"
          icon={
            <Traffic sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />
          }
        />

        {/* Row 2: Transactions table */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={(data && data.transactions) || []}
            columns={columns}
          />
        </Box>

        {/* Sales by Category chart */}
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Sales By Category
          </Typography>
          <BreakdownChart isDashboard />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.secondary[200] }}
          >
            Breakdown of real states and information via category for revenue made
            this year and total sales.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;