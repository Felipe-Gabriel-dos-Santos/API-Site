export interface IProductCreateInput {
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

export interface IProduct extends IProductCreateInput {
  id: string;
  createdAt: string;
  updatedAt: string;
  numberOfLikes: number;
  numberOfSales: number;
}
