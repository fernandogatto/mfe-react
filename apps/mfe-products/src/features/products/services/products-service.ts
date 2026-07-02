import { products } from "../mocks/products.mock";

export async function getProducts() {
  return Promise.resolve(products);
}
