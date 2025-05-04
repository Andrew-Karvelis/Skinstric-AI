"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useImageStore } from "@/store/imageStore";

function Analysis() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const imageSrc = useImageStore((state) => state.imageSrc);

  if (!imageSrc) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-2xl font-bold">No image captured</h1>
        <p className="mt-4">Please capture an image first.</p>
      </div>
    );
  }

  // Use useEffect to ensure the code runs only on the client-side
  useEffect(() => {
    const imageUrlParam = searchParams.get("imageUrl");
    if (imageUrlParam) {
      // If the image URL is in the query, set it to state
      setImageUrl(imageUrlParam);
    }
  }, [searchParams]);

  const onProceed = () => {
    router.push("/demographics");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {/* display captured or uploaded image */}
      <div className="absolute top-5 right-5 border-2 border-gray-300 rounded-lg p-4 mb-4">
        <img
          src={imageSrc}
          alt="Uploaded or Captured"
          className="w-[300px] h-[300px] object-cover"
        />
      </div>

      {/* Analysis */}
      <div className="relative w-[400px] h-[400px] sm:w-[350px] sm:h-[350px] flex items-center justify-center">
        {/* Rotating Boxes */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 border-black w-[350px] h-[350px] sm:w-[475px] sm:h-[475px] slow-rotate-1 opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 border-black w-[375px] h-[375px] sm:w-[490px] sm:h-[490px] slow-rotate-2 opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 border-black w-[390px] h-[390px] sm:w-[505px] sm:h-[505px] slow-rotate-3 opacity-10" />
        {/* FOUR DIAMONDS */}
        <div className="flex flex-wrap gap-1 rotate-45">
          {/* Each diamond container */}
          <div className="relative w-[150px] h-[150px] ">
            <div
              onClick={onProceed}
              className="absolute inset-0 flex items-center justify-center cursor-pointer bg-gray-100 hover:bg-gray-300"
            >
              <span className="text-center text-sm -rotate-45 pointer-events-none">
                DEMOGRAPHICS
              </span>
            </div>
          </div>
          <div className="relative w-[150px] h-[150px]">
            <div className="absolute inset-0 flex items-center justify-center cursor-not-allowed bg-gray-100 hover:bg-gray-300">
              <span className="text-center text-sm -rotate-45">
                COSMETIC CONCERNS
              </span>
            </div>
          </div>
          <div className="relative w-[150px] h-[150px]">
            <div className="absolute inset-0 flex items-center justify-center cursor-not-allowed bg-gray-100 hover:bg-gray-300">
              <span className="text-center text-sm -rotate-45">
                SKIN TYPE DETAILS
              </span>
            </div>
          </div>
          <div className="relative w-[150px] h-[150px]">
            <div className="absolute inset-0 flex items-center justify-center cursor-not-allowed bg-gray-100 hover:bg-gray-300">
              <span className="text-center text-sm -rotate-45 ">WEATHER</span>
            </div>
          </div>
        </div>
      </div>
      {/* Display the captured image if available */}
      {imageUrl && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Captured Image</h2>
          <img
            src={imageUrl}
            alt="Captured Image"
            className="w-[300px] h-[300px] object-cover"
          />
        </div>
      )}
    </div>
  );
}

export default Analysis;
