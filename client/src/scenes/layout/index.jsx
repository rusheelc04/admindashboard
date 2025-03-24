// Main layout wrapper with a sidebar, navbar, and content area for child routes.

import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useGetUserQuery } from "state/api";

const Layout = () => {
  // Determine if non-mobile viewport
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  // State for toggling sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // Retrieve user ID from global Redux store
  const userId = useSelector((state) => state.global.userId);
  // Fetch user data from the server
  const { data } = useGetUserQuery(userId);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      {/* Sidebar */}
      <Sidebar
        user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Content area */}
      <Box flexGrow={1}>
        <Navbar
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        {/* Renders child routes */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;