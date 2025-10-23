import React from "react";
import { ProductCard } from "./ProductCard";
import { useAppContext } from "../context/AppContext";

const BestSeller = () => {
  const { products } = useAppContext();

  return (
    <div className="mt-16">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-1">
          Featured <span className="text-orange-500/70">Products</span>
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2 md:gap-2 lg:gap-3 lg:grid-cols-4 xl:grid-cols-5 mt-6">
        {products
          .filter((product) => product.inStock)
          .slice(0, 5)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default BestSeller;
