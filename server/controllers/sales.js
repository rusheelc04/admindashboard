// Handles sales stats retrieval

import OverallStat from "../models/OverallStat.js";

export const getSales = async (req, res) => {
  try {
    // grab all overall stats docs
    const overallStats = await OverallStat.find();

    // just return the first one (assuming we only need one)
    res.status(200).json(overallStats[0]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};