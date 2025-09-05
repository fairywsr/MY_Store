import React from "react";
import { Link } from "react-router-dom";
import HeroImg from "../assets/bg.png"; // Assuming bg.png might have its own background or shadow

function Hero() {
  return (
    <section className="max-padd-container max-w-7xl mx-auto px-4 py-20 flex flex-col lg:flex-row items-center justify-between">
      {/* Left Side - Text Content */}
      <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 max-w-lg lg:max-w-2xl">
        <h3 className="text-xl sm:text-2xl font-paci text-secondary font-thin">
          Fresh fits for frosty Days
        </h3>

        <h2 className="text-3xl sm:text-4xl uppercase tracking-wider font-bold">
          Get more for Less - 40% Off
        </h2>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
          On Coats & Jackets
        </h1>

        {/* Pricing & Call to Action */}
        <div className="flex flex-col items-center lg:items-start space-y-4">
          <p className="flex items-center text-lg sm:text-xl font-medium">
            <span className="mr-2">Starting at</span>
            <span className="bg-white px-3 py-1 -rotate-2 transform h-12 flex items-center shadow-lg">
              <span className="text-2xl">$</span>
              <span className="text-4xl font-extrabold">99</span>
              <span className="text-2xl">.99</span>
            </span>
          </p>
          <Link
            to="/collection"
            className="inline-flex bg-tertiary text-white items-center justify-center px-8 py-4 w-52 mt-4 text-xl font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="flex justify-center items-center mt-10 lg:mt-0 lg:w-1/2">
        <img
          src={HeroImg}
          alt="A stylish woman modeling a sleek winter coat, perfect for the cold weather."
          className="w-full max-w-sm md:max-w-md lg:max-w-lg max-h-[500px] object-contain rounded-xl"
        />
      </div>
    </section>
  );
}

export default Hero;
