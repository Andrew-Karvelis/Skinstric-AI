import React from "react";

function Analysis() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="relative w-[400px] h-[400px] sm:w-[350px] sm:h-[350px] flex items-center justify-center">
        {/* Rotating Boxes */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 border-black w-[350px] h-[350px] sm:w-[475px] sm:h-[475px] slow-rotate-1 opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 border-black w-[375px] h-[375px] sm:w-[490px] sm:h-[490px] slow-rotate-2 opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 border-black w-[390px] h-[390px] sm:w-[505px] sm:h-[505px] slow-rotate-3 opacity-10" />
        {/* FOUR DIAMONDS */}
        <div className="flex flex-wrap gap-1 rotate-45 ">
          {/* Each diamond container */}
          <div className="relative w-[150px] h-[150px] ">
            <div className="absolute inset-0 bg-gray-100 hover:bg-gray-300"></div>
            <div className="absolute inset-0 flex items-center justify-center -rotate-45 pointer-events-none">
              <span className="text-center text-sm ">DEMOGRAPHICS</span>
            </div>
          </div>
          
          <div className="relative w-[150px] h-[150px]">
            <div className="absolute inset-0 bg-gray-100 hover:bg-gray-300"></div>
            <div className="absolute inset-0 flex items-center justify-center -rotate-45 pointer-events-none">
              <span className="text-center text-sm hover:bg-gray-400">COSMETIC CONCERNS</span>
            </div>
          </div>
          
          <div className="relative w-[150px] h-[150px]">
            <div className="absolute inset-0 bg-gray-100 hover:bg-gray-300"></div>
            <div className="absolute inset-0 flex items-center justify-center -rotate-45 pointer-events-none">
              <span className="text-center text-sm hover:bg-gray-400">SKIN TYPE DETAILS</span>
            </div>
          </div>
          
          <div className="relative w-[150px] h-[150px]">
            <div className="absolute inset-0 bg-gray-100 hover:bg-gray-300"></div>
            <div className="absolute inset-0 flex items-center justify-center -rotate-45 pointer-events-none">
              <span className="text-center text-sm hover:bg-gray-400 ">WEATHER</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analysis;