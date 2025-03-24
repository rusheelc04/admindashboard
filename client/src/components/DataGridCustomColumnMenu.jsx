// Overrides the default column menu for MUI's DataGrid.
// Provides built-in filter and hide column options, with room for custom additions.

import React from "react";
import {
  GridColumnMenuContainer,
  GridFilterMenuItem,
  HideGridColMenuItem,
} from "@mui/x-data-grid";

const CustomColumnMenu = (props) => {
  const { hideMenu, currentColumn, open } = props;

  return (
    <GridColumnMenuContainer
      hideMenu={hideMenu}
      currentColumn={currentColumn}
      open={open}
    >
      {/* 
        Allows column-based filtering 
      */}
      <GridFilterMenuItem onClick={hideMenu} column={currentColumn} />

      {/* 
        Allows hiding/showing the current column 
      */}
      <HideGridColMenuItem onClick={hideMenu} column={currentColumn} />

      {/* 
        Add more menu items here if needed 
      */}
    </GridColumnMenuContainer>
  );
};

export default CustomColumnMenu;