// Handles general data endpoints (user lookups, dashboard stats..).
// Provides user info by ID, plus a summary endpoint for the dashboard.

import express from "express";
import { getUser, getDashboardStats } from "../controllers/general.js";

const router = express.Router();

// fetch single user by ID
router.get("/user/:id", getUser);

// aggregated dashboard stats
router.get("/dashboard", getDashboardStats);

export default router;