const mongoose = require("mongoose");
const roles = require("../constants/roles");

const UserSchema = new mongoose.Schema(
    {
      login: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },

      password: {
        type: String,
        required: true,
      },

      role: {
        type: Number,
        default: roles.USER,
      },

      bag: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
          count: {
            type: Number,
            default: 1,
            min: 1,
          },
        },
      ],
    },

);

module.exports = mongoose.model("User", UserSchema);