// Manages admin info and user performance stats

import mongoose from "mongoose";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const getAdmins = async (req, res) => {
  try {
    // fetch all admins without passwords
    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserPerformance = async (req, res) => {
  try {
    // get user & affiliate data by user id
    const { id } = req.params;

    // match user with affiliate stats
    const userWithStats = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      { $unwind: "$affiliateStats" },
    ]);

    // find all transaction docs for this user
    const saleTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((saleId) => {
        return Transaction.findById(saleId);
      })
    );

    // filter out missing transactions
    const filteredSaleTransactions = saleTransactions.filter(
      (transaction) => transaction !== null
    );

    // send user & performance data
    res
      .status(200)
      .json({ user: userWithStats[0], sales: filteredSaleTransactions });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};