// Manages global app state, such as theme mode and user ID.

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Default theme mode
  mode: "dark",
  // Example user ID for demonstration
  userId: "63701cc1f03239b7f700000e",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    /*
     * Toggles between light and dark mode.
     */
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

// Export actions
export const { setMode } = globalSlice.actions;

// Export reducer
export default globalSlice.reducer;