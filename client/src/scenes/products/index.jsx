// Displays a grid of product cards fetched from the backend, with name, description, price, rating, and supply info.

import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "components/Header";
import { useGetProductsQuery } from "state/api";

// Single Product Card
const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        {/* Category */}
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>

        {/* Product name */}
        <Typography variant="h5" component="div">
          {name}
        </Typography>

        {/* Price */}
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>

        {/* Rating */}
        <Rating value={rating} readOnly />

        {/* Description */}
        <Typography variant="body2">{description}</Typography>
      </CardContent>

      {/* Expand / Collapse button */}
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>

      {/* Expanded section */}
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{ color: theme.palette.neutral[300] }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          {/* Skipped yearly sales and units info */}
        </CardContent>
      </Collapse>
    </Card>
  );
};

// Main Products component
const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box m="1.5rem 2.5rem">
      {/* Header */}
      <Header title="PRODUCTS" subtitle="See your list of products." />

      {/* Grid of product cards */}
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data.map(
            ({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Products;