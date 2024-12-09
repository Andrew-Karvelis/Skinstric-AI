"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Introduction = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="relative flex h-screen w-full flex-col justify-center items-center">
      <div className="flex flex-col items-center">
        {/* Custom Placeholder */}
        {isFocused ? (
          <div className="text-gray-500 mb-2">INTRODUCE YOURSELF</div>
        ) : (
          <div className="text-gray-500 b-2">CLICK TO TYPE</div>
        )}

        <input
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          className="relative w-full max-w-lg text-5xl text-center 
                     text-black outline-none border-b-2 border-gray-500"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <span
          className={`absolute w-full max-w-lg  text-5xl text-center p-8 pointer-events-none ${
            isFocused || inputValue ? "opacity-0" : "opacity-100"
          } transition-opacity 300ms ease-in-out`}
        >
          {inputValue || "Introduce Yourself"}
        </span>
      </div>

      {/* Bottom Nav */}
      <div className="absolute bottom-8 flex justify-between bg-yellow-200 w-full">
        <button className="flex ml-8 items-center relative group">
          <div className="relative">
            <div className="absolute border-dotted border-2 border-black w-8 h-8 rotate-45"></div>
            <div className="relative flex justify-center items-center border-2 border-black w-8 h-8 rotate-45 transition-transform duration-500 group-hover:scale-150">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 transition-all duration-500 group-hover:scale-[0.67]">
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="pointer-events-none"
                />
              </div>
            </div>
          </div>
          <p className="ml-3 font-bold transition-transform duration-500 group-hover:translate-x-8">
            BACK
          </p>
        </button>

        <button className="flex mr-8 items-center relative group">
          <p className="mr-3 font-bold transition-transform duration-500 group-hover:-translate-x-8">
            PROCEED
          </p>
          <div className="relative">
            <div className="absolute border-dotted border-2 border-black w-8 h-8 rotate-45"></div>
            <div className="relative flex justify-center items-center border-2 border-black w-8 h-8 rotate-45 transition-transform duration-500 group-hover:scale-150">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 transition-all duration-500 group-hover:scale-[0.67]">
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="pointer-events-none"
                />
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Introduction;
