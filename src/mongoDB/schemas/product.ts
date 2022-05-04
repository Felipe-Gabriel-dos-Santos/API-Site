import { Schema, model } from "mongoose";
import { IProductInput } from "../../types/product";

const productSchema = new Schema<IProductInput>(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    description: {
      type: String,
      required: false,
      maxlength: 500,
    },

    imagesUrl: {
      type: [String],
      required: true,
      maxlength: 10,
    },

    category: {
      type: String,
      required: true,
      maxlength: 40,
    },

    sizes: {
      type: [String],
      required: false,
      maxlength: 20,
    },

    colors: {
      type: [String],
      required: false,
      maxlength: 20,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
    },

    searchTags: {
      type: [String],
      required: true,
      minlength: 1,
    },

    numberOfLikes: {
      type: Number,
      required: false,
      default: 0,
    },

    numberOfSales: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  { timestamps: true }
);

export default model<IProductInput>("Product", productSchema);
