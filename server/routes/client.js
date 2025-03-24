// Defines Express routes for client-facing data: products, customers, transactions, etc.

import express from "express";
import {
  getProducts,
  getCustomers,
  getTransactions,
  getGeography,
} from "../controllers/client.js";

const router = express.Router();

// GET /client/products
router.get("/products", getProducts);

// GET /client/customers
router.get("/customers", getCustomers);

// GET /client/transactions (pagination, sorting, search)
router.get("/transactions", getTransactions);

// GET /client/geography
router.get("/geography", getGeography);

export default router;
