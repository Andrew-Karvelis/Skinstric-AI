"use client";
import React, { useState } from "react";
import { useImageStore } from "@/store/imageStore"; // Assuming you have a store for image management

function Demographics() {
  const [selectedButton, setSelectedButton] = useState<string | null>(
    "east-asian"
  );
  const imageSrc = useImageStore((state) => state.imageSrc);

  const handleButtonClick = (buttonId: string) => {
    setSelectedButton(buttonId);
  };

  return (
    <div className="w-full min-h-screen">
      {/* Header */}
      <div className="p-4 flex gap-4 items-center flex-wrap">
        <p className="font-bold">SKINSTRIC</p>
        <span className="text-gray-500">[ ANALYSIS ]</span>
      </div>

      {/* Top Heading */}
      <div className="p-4 pb-8 md:pb-16">
        <div className="text-lg">A.I. ANALYSIS</div>
        <div className="text-3xl md:text-5xl pt-2 pb-2">DEMOGRAPHICS</div>
        <p className="text-gray-600">PREDICTED RACE &amp; AGE</p>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row w-full p-4 gap-4">
        {/* 3 Demographic Buttons (Top on mobile, Left on desktop) */}
        <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible md:mr-4 w-full md:w-auto">
          <button
            className={`min-w-[150px] h-[80px] md:w-[200px] md:h-[104px] flex flex-col justify-around pl-4 border-t-2 border-black text-left hover:bg-gray-300 ${
              selectedButton === "east-asian"
                ? "bg-black text-white"
                : "bg-gray-100"
            }`}
            onClick={() => handleButtonClick("east-asian")}
          >
            <p>EAST ASIAN</p>
            <p>RACE</p>
          </button>
          <button
            className={`min-w-[150px] h-[80px] md:w-[200px] md:h-[104px] flex flex-col justify-around pl-4 border-t-2 border-black text-left hover:bg-gray-300 ${
              selectedButton === "age" ? "bg-black text-white" : "bg-gray-100"
            }`}
            onClick={() => handleButtonClick("age")}
          >
            <p>20-29</p>
            <p>AGE</p>
          </button>
          <button
            className={`min-w-[150px] h-[80px] md:w-[200px] md:h-[104px] flex flex-col justify-around pl-4 border-t-2 border-black text-left hover:bg-gray-300 ${
              selectedButton === "sex" ? "bg-black text-white" : "bg-gray-100"
            }`}
            onClick={() => handleButtonClick("sex")}
          >
            <p>FEMALE</p>
            <p>SEX</p>
          </button>
        </div>

        {/* Main content containers */}
        <div className="flex flex-col md:flex-row w-full gap-4">
          {/* Big Box */}
          <div className="relative w-full md:w-2/3 h-[450px] md:h-[600px] bg-gray-100 p-4 border-t-4 border-gray-500">
            {/* Content inside the big box */}
            <p className="text-left text-2xl md:text-3xl">East Asian</p>
            {/* Uploaded or Captured Image */}
            <div>
              <img
                src={imageSrc || ""}
                alt="Captured or Uploaded Img"
                className="absolute bottom-5 left-5 w-[300px] h-[300px] object-cover"
              />
            </div>
            <div className="absolute w-[180px] h-[180px] md:w-[300px] md:h-[300px] bottom-6 right-6 md:bottom-10 md:right-10 rounded-full bg-gray-100 flex items-center justify-center">
              {/* Progress circle as border using SVG */}
              <svg className="absolute w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="47"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="4"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="47"
                  fill="none"
                  stroke="#4b5563"
                  strokeWidth="4"
                  strokeDasharray="295.31"
                  strokeDashoffset="88.59"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <span className="text-black text-2xl md:text-4xl z-10">
                70
                <span className="text-xl md:text-2xl absolute">%</span>
              </span>
            </div>
          </div>

          {/* Smaller Box */}
          <div className="w-full md:w-1/3 h-[350px] md:h-[600px] bg-gray-100 p-4 border-t-4 border-gray-500">
            {/* Content inside the smaller box */}
            <div className="flex flex-row justify-between text-sm md:text-lg text-gray-600">
              <p>RACE</p>
              <p>A.I. CONFIDENCE</p>
            </div>
            {/* Race percentages */}
            <div className="flex flex-col mt-2">
              <div className="flex flex-row justify-between items-center h-[48px] hover:bg-[#242424] hover:text-white">
                <p className="relative pl-4 flex items-center">
                  <span className="absolute left-0 top-1/2 transform -translate-y-1/2">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="svg-icon"
                    >
                      <path
                        d="M6 11.2929L0.707107 6L6 0.707107L11.2929 6L6 11.2929Z"
                        stroke="currentColor"
                      />
                    </svg>
                  </span>
                  East Asian
                </p>
                <p>70%</p>
              </div>
              <div className="flex flex-row justify-between items-center h-[48px] hover:bg-[#242424] hover:text-white">
                <p className="relative pl-4 flex items-center">
                  <span className="absolute left-0 top-1/2 transform -translate-y-1/2">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="svg-icon"
                    >
                      <path
                        d="M6 11.2929L0.707107 6L6 0.707107L11.2929 6L6 11.2929Z"
                        stroke="currentColor"
                      />
                    </svg>
                  </span>
                  Hispanic
                </p>
                <p>20%</p>
              </div>
              <div className="flex flex-row justify-between items-center h-[48px] hover:bg-[#242424] hover:text-white">
                <p className="relative pl-4 flex items-center">
                  <span className="absolute left-0 top-1/2 transform -translate-y-1/2">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="svg-icon"
                    >
                      <path
                        d="M6 11.2929L0.707107 6L6 0.707107L11.2929 6L6 11.2929Z"
                        stroke="currentColor"
                      />
                    </svg>
                  </span>
                  White
                </p>
                <p>10%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Demographics;
