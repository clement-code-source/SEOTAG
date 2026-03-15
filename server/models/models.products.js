const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },

    aiInfo: {
      primaryCategory: String,
      subCategory: String,
      seoTags: [String],
      sustainabilityFilters: [String]
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", productSchema);