import { categories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Category = () => {
  const { navigate } = useAppContext();
  return (
    <div className="my-16 px-4 md:px-12 lg:px-24">
      {/* Titles */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-1">
          Featured <span className="text-orange-500/70">Categories</span>
        </h2>
      </div>

      {/* Categories List - Horizontally scrollable */}
      <div className="flex justify-center">
        <div className="flex items-start gap-4 md:gap-8 mt-8 pb-4 overflow-x-auto no-scrollbar">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group cursor-pointer text-center flex-shrink-0"
              onClick={() => {
                navigate(`/products/${category.path.toLowerCase()}`);
                scrollTo(0, 0);
              }}
            >
              {/* Circular Background for Image */}
              <div className="w-32 h-32 md:w-36 md:h-36 bg-orange-300/10 rounded-full flex items-center justify-center p-5 group-hover:shadow-lg transition-shadow duration-300">
                <img
                  src={category.image}
                  alt={category.text}
                  className="w-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Text Content */}
              <p className="text-gray-800 mt-4 transition-transform duration-300 group-hover:scale-105">
                {category.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
