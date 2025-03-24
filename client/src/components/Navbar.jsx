// Displays sidebar toggle, search bar, and basic user info (no theme toggling).

import React from "react";
import { Menu as MenuIcon, Search } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import profileImage from "assets/profile.jpeg";
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  useTheme,
} from "@mui/material";

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  // Access MUI theme for styling/colors
  const theme = useTheme();

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left side: sidebar toggle + search bar */}
        <FlexBetween>
          {/* Sidebar toggle */}
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>

          {/* Search bar */}
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* Right side: user info */}
        <FlexBetween gap="1.5rem">
          <FlexBetween>
            <Button
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              {/* Profile image */}
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              {/* Name & occupation */}
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
            </Button>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;