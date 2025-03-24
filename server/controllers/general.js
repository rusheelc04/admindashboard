// Handles user info and dashboard statistics for the admin panel

import User from "../models/User.js";
import OverallStat from "../models/OverallStat.js";
import Transaction from "../models/Transaction.js";

export const getUser = async (req, res) => {
  try {
    // Grabs user info by ID
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    // Hardcoded dates for demo
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-15";

    // Recent transactions, limit = 50
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });

    // Overall yearly stats
    const overallStat = await OverallStat.find({ year: currentYear });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = overallStat[0];

    // Data for this current month
    const thisMonthStats = monthlyData.find(({ month }) => month === currentMonth);

    // Data for this specific day
    const todayStats = overallStat[0].dailyData.find(({ date }) => date === currentDay);

    // Return all relevant stats
    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};