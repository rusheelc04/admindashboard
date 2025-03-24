// Displays a page title and an optional subtitle below it.
// Used for any page that needs a heading. Takes "title" & "subtitle" props.

import { Typography, Box, useTheme } from "@mui/material";
import React from "react";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();

  return (
    <Box>
      {/* Primary heading */}
      <Typography
        variant="h2"
        color={theme.palette.secondary[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>

      {/* Subheading or subtext */}
      <Typography variant="h5" color={theme.palette.secondary[300]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;