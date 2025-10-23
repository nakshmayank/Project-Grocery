import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { ProductCard } from "../components/ProductCard";

const Wishlist = () => {
  const { products, wishlist } = useAppContext();
  const [wishlistArray, setWishlistArray] = useState([]);

  useEffect(() => {
    if (products.length > 0 && wishlist) {
      const tempArray = wishlist
        .map((id) => products.find((item) => item._id === id))
        .filter(Boolean);
      setWishlistArray(tempArray);
    } else if (!wishlist || wishlist.length === 0) {
      setWishlistArray([]);
    }
  }, [products, wishlist]);

  return (
    <div className="mt-16">
      <div className="flex flex-col items-end w-max">
        <p className="text-3xl font-medium">Wishlist</p>
        <div className="w-16 h-0.5 bg-orange-500/70 rounded-full"></div>
      </div>
      {wishlistArray.length > 0 ? (
        <div className="grid max-w-7xl grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2 xl:gap-4 lg:grid-cols-4 xl:grid-cols-5 mt-6">
          {wishlistArray.map(
            (product) =>
              product && <ProductCard key={product._id} product={product} />
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[60vh]">
          <p className="text-2xl font-medium text-orange-500/70">
            No products found in wishlist.
          </p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
