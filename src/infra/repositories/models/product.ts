import { getModelForClass } from "@typegoose/typegoose";
import Product from "../../../domain/product";

const ProductModel = getModelForClass(Product);

export default ProductModel;
