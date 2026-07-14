const mongoose = require("mongoose");
const validator = require("validator");

const ProductSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
      },

      desc: {
        type: String,
        required: true,
        maxlength: 3000,
      },

      price: {
        type: Number,
        required: true,
        min: 0,
      },

      count: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
      },

      category: {
        type: String,
        required: true,
        trim: true,
      },

      image: {
        type: String,
        required: true,
        validate: {
          validator: validator.isURL,
          message: "Please enter a valid URL",
        },
      },
    },

);

module.exports = mongoose.model("Product", ProductSchema);