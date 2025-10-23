import React from "react";
import { assets, features } from "../assets/assets";

const BottomBanner = () => {
  return (
    <div className="relative mt-24 transition-shadow duration-300 hover:shadow-xl">
      <img
        src={assets.bottom_banner}
        alt="banner"
        className="w-full hidden md:block rounded-xl"
      />
      <img
        src={assets.bottom_banner_sm}
        alt="banner"
        className="w-full md:hidden rounded-xl"
      />
      <div className="absolute inset-0 flex flex-col justify-start items-center md:items-end md:justify-center pt-10 md:pt-0 md:pr-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold mb-6">
            Why We Are the Best?
          </h1>
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-4 mt-2">
              <img
                src={feature.icon}
                alt={feature.title}
                className='md:w-10 w-9'
              />
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-orange-500/70">
                  {feature.title}
                </h3>
                <p className="text-gray-800/70 text-xs md:text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;
