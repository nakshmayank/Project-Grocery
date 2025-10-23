import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const MainBanner = () => {
  return (
    <div className="relative transition-shadow duration-300 hover:shadow-xl" >
      <img
        src={assets.main_banner}
        alt="banner"
        className="w-full hidden md:block rounded-xl"
      />
      <img
        src={assets.main_banner_sm}
        alt="banner"
        className="w-full md:hidden rounded-xl"
      />
      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-8 md:pb-0 px-4 md:pl-10 lg:pl-13 xl:pl-25">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15">
          Freshness You Can Crave, Time You Will Save!
        </h1>
        <div className="flex items-center mt-6 font-medium">
          <Link
            to="/products"
            className="group flex items-center shadow-lg gap-2 px-7 md:px-9 py-3 bg-orange-500/80 hover:bg-orange-600/80 transition-transform rounded-lg text-white cursor-pointer font-semibold duration-200 hover:scale-103"
          >
            Shop Now
            <img
              className="md:hidden transition group-focus:translate-x-1"
              src={assets.white_arrow_icon}
              alt="arrow"
            />
          </Link>
          <Link
            to="/products"
            className="group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer font-semibold transition-transform duration-200 hover:scale-103"
          >
            Explore Deals
            <img
              className="transition group-hover:translate-x-1"
              src={assets.black_arrow_icon}
              alt="arrow"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
