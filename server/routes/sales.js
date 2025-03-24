// Sales routes for fetching overall sales stats.
// Currently provides a single endpoint that returns combined sales data.

import express from "express";
import { getSales } from "../controllers/sales.js";

const router = express.Router();

// get overall sales stats
router.get("/sales", getSales);

export default router;