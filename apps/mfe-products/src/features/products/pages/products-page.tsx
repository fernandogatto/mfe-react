import { Button } from "@shared/ui";
import { Input } from "@shared/ui";
import { useEffect, useState } from "react";
import { ProductTable } from "../components/product-table";
import { getProducts } from "../services/products-service";
import { Product } from "../types/product.type";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Products</h1>
        <p className="text-muted-foreground text-xs">
          {products.length} product{products.length !== 1 ? "s" : ""} found
        </p>
      </div>

      <div className="flex justify-between mt-4 mb-4">
        <Input placeholder="Search products..." className="w-1/3" />

        <Button>Add Product</Button>
      </div>

      <ProductTable products={products} />
    </div>
  );
};
export default ProductsPage;
