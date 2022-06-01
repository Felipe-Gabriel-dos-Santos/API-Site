import { prop } from "@typegoose/typegoose";

class Product {
  @prop()
  public readonly name: string;
  @prop()
  public readonly price: number;
  @prop()
  public readonly description: string;
  @prop()
  public readonly imagesUrl: string[];
  @prop()
  public readonly category: string;
  @prop()
  public readonly sizes: string[];
  @prop()
  public readonly colors: string[];
  @prop()
  public readonly stock: number;
  @prop()
  public readonly searchTags: string[];
  @prop()
  public readonly numberOfLikes: number = 0;
  @prop()
  public readonly numberOfSales: number = 0;

  constructor(
    name: string,
    price: number,
    description: string,
    imagesUrl: string[],
    category: string,
    sizes: string[],
    colors: string[],
    stock: number,
    searchTags: string[]
  ) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.imagesUrl = imagesUrl;
    this.category = category;
    this.sizes = sizes;
    this.colors = colors;
    this.stock = stock;
    this.searchTags = searchTags;
  }
}

export default Product;
