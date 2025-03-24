// Tracks each user's affiliate stats. 
// Has userId reference and an array of Transaction references.

import mongoose from "mongoose";

const AffiliateStatSchema = new mongoose.Schema(
  {
    // link to the user document
    userId: { type: mongoose.Types.ObjectId, ref: "User" },

    // list of transaction IDs
    affiliateSales: {
      type: [mongoose.Types.ObjectId],
      ref: "Transaction",
    },
  },
  { timestamps: true }
);

const AffiliateStat = mongoose.model("AffiliateStat", AffiliateStatSchema);
export default AffiliateStat;