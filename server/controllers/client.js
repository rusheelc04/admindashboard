// controllers/client.js

import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";

export const getTransactions = async (req, res) => {
  try {
    // The frontend typically sends page=0 for the first page
    // We default to 0 if not provided
    const {
      page = 0,
      pageSize = 20,
      sort = null,
      search = "",
    } = req.query;

    // Convert page/pageSize to numbers
    const pageNumber = Number(page);
    const pageSizeNumber = Number(pageSize);

    // Convert sort to { <field>: 1/-1 }
    let sortFormatted = {};
    if (sort) {
      const sortObj = JSON.parse(sort); // e.g. { field: "cost", sort: "asc" }
      const sortDir = sortObj.sort === "asc" ? 1 : -1;
      sortFormatted = { [sortObj.field]: sortDir };
    }

    // Build a filter using cost or userId
    const filter = {
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    };

    // 1) Get the total # of documents matching the filter
    const total = await Transaction.countDocuments(filter);

    // 2) Get only the subset of docs for this page
    //    skip = pageNumber * pageSizeNumber
    const transactions = await Transaction.find(filter)
      .sort(sortFormatted)
      .skip(pageNumber * pageSizeNumber)
      .limit(pageSizeNumber);

    // Return both the limited transactions and total count
    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(404).json({ message: error.message });
  }
};

// The rest of your existing controller code remains unchanged
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({ productId: product._id });
        return { ...product._doc, stat };
      })
    );
    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getGeography = async (req, res) => {
  try {
    const users = await User.find();
    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);
      if (!acc[countryISO3]) acc[countryISO3] = 0;
      acc[countryISO3]++;
      return acc;
    }, {});
    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => ({ id: country, value: count })
    );
    res.status(200).json(formattedLocations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};