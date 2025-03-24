// A reusable Box component with space-between alignment in flexbox.
// Helps keep consistent styling across the app.

const { Box } = require("@mui/material");
const { styled } = require("@mui/system");

const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;