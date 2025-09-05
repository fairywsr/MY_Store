import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
amount: {
  type: Number,
  required: true,
},

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        size: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],

    address: {
      firstName: String,
      lastName: String,
      email: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
      phone: String,
    },

    paymentMethod: { type: String, enum: ["COD", "stripe"], default: "COD" },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
