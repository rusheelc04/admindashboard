import mongoose from "mongoose";

// TransactionSchema helps store purchases made by a user
// userId => ID of who purchased
// cost => stored as string
// products => array of product IDs
// timestamps => auto "createdAt"/"updatedAt"
const TransactionSchema = new mongoose.Schema(
  {
    userId: String,
    cost: String,
    products: [mongoose.Types.ObjectId], // storing product IDs
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;