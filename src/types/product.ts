export interface IProductInput {
  name: string;
  price: number;
  description?: string;
  imagesUrl: string[];
  category: string;
  sizes?: string[];
  colors?: string[];
  stock: number;
  searchTags: string[];
  numberOfLikes?: number;
  numberOfSales?: number;
}

export interface IProduct extends IProductInput {
  id: string;
  createdAt: string;
  updatedAt: string;
}
