// Manages admin-related endpoints (fetch admins, performance data..).
// Provides a route to get all admins, and a route for user performance by ID.

import express from "express";
import { getAdmins, getUserPerformance } from "../controllers/management.js";

const router = express.Router();

// fetch all admins
router.get("/admins", getAdmins);

// get user affiliate performance by ID
router.get("/performance/:id", getUserPerformance);

export default router;