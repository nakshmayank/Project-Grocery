import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { Link, useParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";

const ProductDetails = () => {
  const {
    products,
    navigate,
    currency,
    addToCart,
    cartItems,
    updateCartItems,
    removeFromCart,
    wishlist,
    addToWishlist,
    removeFromWishlist,
    setWishlist
  } = useAppContext();

  const { id } = useParams();

  const product = products.find((item) => item._id === id);

  const cartCount = cartItems[product?._id] || 0;

  const [thumbnail, setThumbnail] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter(
        (item) => product.category === item.category
      );
      setRelatedProducts(productsCopy.slice(0, 5));
    }
  }, [products]);

  useEffect(() => {
    setThumbnail(product?.images[0] ? product.images[0] : null);
  }, [product]);

  return (
    product && (
      <div className="mt-12">
        <p>
          <Link to={"/"}>Home</Link> /<Link to={"/products"}> Products</Link> /
          <Link to={`/products/${product.category.toLowerCase()}`}>
            {" "}
            {product.category}{" "}
          </Link>{" "}
          /<span className="text-orange-500/70"> {product.name}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-16 mt-4">
          <div className="flex gap-3 cursor-pointer">
            <div className="flex flex-col gap-3">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className="border max-w-24 border-gray-500/30 overflow-hidden cursor-pointer rounded-xl"
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>

            <div className="relative border border-gray-500/30 max-w-100 overflow-hidden rounded-xl">
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevents card navigation
                  if(wishlist.includes(product._id)){
                    removeFromWishlist(product._id);
                  }else{
                    addToWishlist(product._id);
                  }
                }}
                className="absolute top-3 right-3 z-10 bg-white w-10 h-10 flex items-center justify-center border border-gray-200 hover:bg-orange-300/20 shadow-md rounded-full transition-transform duration-200 hover:scale-110 cursor-pointer"
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
              <img
                src={thumbnail}
                alt="Selected product"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="text-sm w-full md:w-1/2">
            <h1 className="text-3xl font-medium">{product.name}</h1>

            <div className="flex items-center gap-0.5 mt-1">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <img
                    key={i}
                    src={i < 4 ? assets.star : assets.star_dull}
                    alt=""
                    className="w-3.5 md:w-4"
                  />
                ))}
              <p className="text-base ml-2">{product.rating}</p>
            </div>

            <div className="mt-6">
              <p className="text-gray-500/70 line-through">
                MRP: {currency}
                {product.price}
              </p>
              <p className="text-2xl font-medium">
                MRP: {currency}
                {product.offerPrice}
              </p>
              <span className="text-gray-500/70">(inclusive of all taxes)</span>
            </div>

            <p className="text-base font-medium mt-6">About Product</p>
            <ul className="list-disc ml-4 text-gray-500/70">
              {product.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>

            <div className="flex items-center mt-10 gap-5 text-base">
              {cartCount === 0 ? (
                <button
                  onClick={() => addToCart(product._id)}
                  className="w-full py-3.5 shadow-md cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition rounded-xl"
                >
                  Add to Cart
                </button>
              ) : (
                <div className="w-full py-3.5 flex shadow-md flex-row items-center justify-center bg-gray-100 hover:bg-gray-200/70 transition rounded-xl cursor-pointer">
                  {/* Minus Button */}
                  <button
                    onClick={() => {
                      const currentQty = cartItems[product._id];
                      if (currentQty === 1) {
                        removeFromCart(product._id); // Remove item if quantity is 1
                        navigate(
                          `/products/${product.category.toLowerCase()}/${
                            product?._id
                          }`
                        );
                      } else {
                        updateCartItems(product._id, currentQty - 1); // Otherwise, decrement
                      }
                    }}
                    className="w-full items-center justify-center text-xl font-medium text-gray-500 hover:text-gray-700/80 transition-transform duration-200 hover:scale-130 cursor-pointer"
                  >
                    -
                  </button>

                  {/* Quantity Display */}
                  <span className="w-full text-lg text-center">
                    {cartItems[product._id]}
                  </span>

                  {/* Plus Button */}
                  <button
                    onClick={() =>
                      updateCartItems(product._id, cartItems[product._id] + 1)
                    }
                    className="w-full items-center justify-center text-xl font-medium text-orange-500 hover:text-orange-700/80 transition-transform duration-200 hover:scale-130 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              )}
              <button
                onClick={() => {
                  if (cartCount === 0) {
                    addToCart(product._id);
                  }
                  navigate("/cart");
                }}
                className="w-full py-3.5 shadow-md cursor-pointer font-medium bg-orange-500/70 text-white hover:bg-orange-600/70 transition rounded-xl"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
        {/* Related Products */}
        <div className="flex flex-col items-center mt-20">
          <div className="flex flex-col items-center w-max">
            <p className="text-3xl font-medium">Related Products</p>
            <div className="w-20 h-0.5 bg-orange-500/70 rounded-full mt-2"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6 w-full">
            {relatedProducts
              .filter((product) => product.inStock)
              .map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
          </div>
          <button
            onClick={() => {
              navigate(`/products/${product.category.toLowerCase()}`);
              scrollTo(0, 0);
            }}
            className="mx-auto cursor-pointer px-12 my-16 py-2.5 border text-orange-500/70 hover:bg-orange-500/70/10 transition rounded-xl"
          >
            See More
          </button>
        </div>
      </div>
    )
  );
};

export default ProductDetails;
