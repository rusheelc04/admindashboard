// Tracks sales stats for each product: yearly, monthly, and daily details.

// productId => referencing which product
// yearlySalesTotal => sum of totalSales for the year
// yearlyTotalSoldUnits => sum of totalUnits for the year
// year => which year these stats belong to
// monthlyData => details per month
// dailyData => details per day
import mongoose from "mongoose";

const ProductStatSchema = new mongoose.Schema(
  {
    productId: String,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    dailyData: [
      {
        date: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
  },
  { timestamps: true }
);

const ProductStat = mongoose.model("ProductStat", ProductStatSchema);
export default ProductStat;