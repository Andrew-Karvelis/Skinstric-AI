"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useImageStore } from "@/store/imageStore";

function Demographics() {
  const router = useRouter();
  const imageSrc = useImageStore((state) => state.imageSrc);
  const [selectedButton, setSelectedButton] = useState<string>("east-asian");

  // Redirect if imageSrc is not available (e.g. page refreshed or direct URL visit)
  useEffect(() => {
    if (!imageSrc) {
      router.push("/upload");
    }
  }, [imageSrc, router]);

  // Avoid rendering until we know if redirect is needed
  if (!imageSrc) return null;

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

      <div className="flex flex-col md:flex-row w-full p-4 gap-4">
        {/* Buttons */}
        <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible md:mr-4 w-full md:w-auto">
          {[
            { id: "east-asian", label: "EAST ASIAN", sub: "RACE" },
            { id: "age", label: "20-29", sub: "AGE" },
            { id: "sex", label: "FEMALE", sub: "SEX" },
          ].map(({ id, label, sub }) => (
            <button
              key={id}
              onClick={() => handleButtonClick(id)}
              className={`min-w-[150px] h-[80px] md:w-[200px] md:h-[104px] flex flex-col justify-around pl-4 border-t-2 border-black text-left hover:bg-gray-300 ${
                selectedButton === id ? "bg-black text-white" : "bg-gray-100"
              }`}
            >
              <p>{label}</p>
              <p>{sub}</p>
            </button>
          ))}
        </div>

        {/* Main content */}
        <div className="flex flex-col md:flex-row w-full gap-4">
          {/* Big box */}
          <div className="relative w-full md:w-2/3 h-[450px] md:h-[600px] bg-gray-100 p-4 border-t-4 border-gray-500">
            <p className="text-left text-2xl md:text-3xl">East Asian</p>
            <img
              src={imageSrc}
              alt="Captured or Uploaded"
              className="absolute bottom-5 left-5 w-[300px] h-[300px] object-cover"
            />
            <div className="absolute w-[180px] h-[180px] md:w-[300px] md:h-[300px] bottom-6 right-6 md:bottom-10 md:right-10 rounded-full bg-gray-100 flex items-center justify-center">
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
                70<span className="text-xl md:text-2xl absolute">%</span>
              </span>
            </div>
          </div>

          {/* Smaller box */}
          <div className="w-full md:w-1/3 h-[350px] md:h-[600px] bg-gray-100 p-4 border-t-4 border-gray-500">
            <div className="flex justify-between text-sm md:text-lg text-gray-600">
              <p>RACE</p>
              <p>A.I. CONFIDENCE</p>
            </div>
            <div className="flex flex-col mt-2">
              {[
                { label: "East Asian", value: "70%" },
                { label: "Hispanic", value: "20%" },
                { label: "White", value: "10%" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex justify-between items-center h-[48px] hover:bg-[#242424] hover:text-white"
                >
                  <p className="relative pl-4 flex items-center">
                    <span className="absolute left-0 top-1/2 transform -translate-y-1/2">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 11.2929L0.707107 6L6 0.707107L11.2929 6L6 11.2929Z"
                          stroke="currentColor"
                        />
                      </svg>
                    </span>
                    {label}
                  </p>
                  <p>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Demographics;
