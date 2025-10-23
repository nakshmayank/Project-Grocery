import { useEffect } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

export const ProductCard = ({ product }) => {
  const {
    currency,
    navigate,
    addToCart,
    cartItems,
    wishlist,
    addToWishlist,
    removeFromWishlist,
  } = useAppContext();

  // Calculate discount percentage
  const discount = Math.round(
    ((product.price - product.offerPrice) / product.price) * 100
  );

  const addToCartHandler = () => {
    if (!cartItems[product._id]) {
      addToCart(product?._id);
    } else {
      navigate("/cart");
    }
  };

  return (
    product && (
      <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 w-full max-w-sm flex flex-col justify-between transition-shadow hover:shadow-lg duration-300">
        <div>
          {/* Top Section: Discount Badge */}
          <div className="relative">
            {discount > 0 && (
              <div className="absolute top-0 left-0 bg-orange-100 shadow-md text-orange-700 text-xs font-semibold px-2.5 py-1 rounded-2xl">
                {discount}% off
              </div>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevents card navigation
                if (wishlist.includes(product._id)) {
                  removeFromWishlist(product._id);
                } else {
                  addToWishlist(product._id);
                }
              }}
              className="absolute top-0 right-0 bg-white w-10 h-10 flex items-center justify-center border border-gray-200 hover:bg-orange-300/20 shadow-md rounded-full transition-transform duration-200 hover:scale-110 cursor-pointer"
            >
              <img
                src={
                  wishlist.includes(product._id)
                    ? assets.wishlist_icon_filled
                    : assets.wishlist_icon_empty
                }
                alt="Wishlist"
                className="w-4"
              />
            </button>
          </div>

          {/* Image Section */}
          <div
            onClick={() => {
              navigate(
                `/products/${product.category.toLowerCase()}/${product?._id}`
              );
              scrollTo(0, 0);
            }}
            className="h-36 sm:h-40 flex items-center justify-center my-4 cursor-pointer"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="max-h-full max-w-full"
            />
          </div>

          {/* Details Section */}
          <div className="text-left">
            <div className="flex items-center justify-between">
              <p
                onClick={() =>
                  navigate(`/products/${product.category.toLowerCase()}`)
                }
                className="text-sm text-orange-500 hover:text-orange-600/90 transition duration-200 hover:scale-110 cursor-pointer"
              >
                {product.category}
              </p>
              <div className="flex flex-wrap items-center gap-1.5">
                <img src={assets.star} alt="star" className="w-4" />
                <p className="font-semibold text-gray-700">{product.rating}</p>
              </div>
            </div>

            <p className="text-base sm:text-lg text-gray-800 truncate mt-1">
              {product.name}
            </p>
            <p className="text-sm text-gray-500 mt-1">{product.weight}</p>
          </div>

          {/* Boottm Section */}
          <div className="flex flex-wrap sm:flex-row items-center justify-between mt-4 gap-3">
            <div className="flex items-baseline gap-2 min-w-0">
              <p className="text-lg sm:text-xl text-gray-800">
                {currency}
                {product.offerPrice}
              </p>
              <p className="text-sm text-gray-400 line-through">
                {currency}
                {product.price}
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCartHandler();
              }}
              className="flex-wrap flex items-center justify-center w-full shadow-md sm:w-auto gap-2 border border-orange-100/50 text-orange-700 font-medium px-4 py-2 rounded-2xl bg-orange-50 hover:bg-orange-100 transition-transform duration-300 hover:scale-103 cursor-pointer"
            >
              <img src={assets.cart} alt="add" className="w-4" />
              {!cartItems[product._id] ? "Add" : "Cart"}
            </button>
          </div>
        </div>
      </div>
    )
  );
};
