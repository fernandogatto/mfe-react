import { Product } from "../types/product.type";

export const products: Product[] = [
  {
    id: 1,
    name: "Macbook Pro",
    price: 12000,
    stock: 8,
    category: "Electronics",
    status: "active",
  },

  {
    id: 2,
    name: "Iphone 15",
    price: 6500,
    stock: 20,
    category: "Mobile",
    status: "active",
  },

  {
    id: 3,
    name: "Dell XPS",
    price: 9000,
    stock: 0,
    category: "Notebook",
    status: "inactive",
  },
];
