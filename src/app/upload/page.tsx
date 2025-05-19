"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CameraModal from "@/components/Webcam/CameraModal";
import { useImageStore } from "@/store/imageStore";

const UploadFace: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const setImageSrc = useImageStore.getState().setImageSrc;

  const handleGalleryUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setImageSrc(reader.result as string);
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        router.push("/analysis");
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    const fileInput = document.getElementById(
      "upload-input"
    ) as HTMLInputElement;
    fileInput?.click();
  };

  const handleCameraClick = () => {
    setShowPermissionModal(true);
  };

  const allowCamera = () => {
    setShowPermissionModal(false);
    setShowCameraModal(true);
  };

  const cancelCamera = () => {
    setShowPermissionModal(false);
  };

  const handleCapture = async (imageSrc: string) => {
    setImageSrc(imageSrc);
    setShowCameraModal(false);
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    router.push("/analysis");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="mb-4">
            <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
          <p className="text-lg">Preparing your analysis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-around items-center min-h-screen p-8">
      {/* Permission Modal */}
      {showPermissionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-medium mb-4">Camera Permission</h2>
            <p className="mb-6">Allow Skinstric A.I. to use your camera?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelCamera}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                CANCEL
              </button>
              <button
                onClick={allowCamera}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                ALLOW
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Camera Modal */}
      {showCameraModal && (
        <CameraModal
          onClose={() => setShowCameraModal(false)}
          onCapture={handleCapture}
        />
      )}

      {/* Scan Face Section */}
      <div
        className="cursor-pointer flex flex-col items-center gap-6"
        onClick={handleCameraClick}
      >
        <div className="relative w-[400px] h-[400px] sm:w-[350px] sm:h-[350px] flex items-center justify-center">
          {/* Rotating Boxes */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 border-black w-[350px] h-[350px] sm:w-[300px] sm:h-[300px] slow-rotate-1 opacity-30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 border-black w-[375px] h-[375px] sm:w-[315px] sm:h-[315px] slow-rotate-2 opacity-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 border-black w-[390px] h-[390px] sm:w-[330px] sm:h-[330px] slow-rotate-3 opacity-10" />
          {/* SVG Icon */}
          <svg
            width="136"
            height="136"
            viewBox="0 0 136 136"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="67.9996" cy="67.9997" r="57.7857" stroke="#1A1B1C" />
            <circle cx="68" cy="68" r="51" fill="#1A1B1C" />
            <path
              d="M100.668 35.412C92.3149 27.0382 80.7627 21.8569 68.0003 21.8569C65.0469 21.8569 62.1583 22.1344 59.3592 22.6647C64.1338 30.5633 81.5795 58.2549 84.9406 63.1803C85.5932 64.1371 86.753 62.2365 93.7783 48.6929L100.668 35.412Z"
              fill="#FCFCFC"
            />
            <path
              d="M25.0882 51.004C30.5815 37.1459 42.5936 26.5816 57.3413 23.0942C59.0872 25.713 62.4221 30.8872 66.0668 36.6493L75.3267 51.2908H48.8858C36.1263 51.2908 28.6691 51.2077 25.0882 51.004Z"
              fill="#FCFCFC"
            />
            <path
              d="M31.8694 96.7032C25.602 88.8246 21.8574 78.8495 21.8574 67.9998C21.8574 62.801 22.7172 57.803 24.3023 53.1402H39.1666C56.552 53.1402 56.9478 53.1674 56.3267 54.3294C55.0953 56.6338 36.8239 88.2621 31.8694 96.7032Z"
              fill="#FCFCFC"
            />
            <path
              d="M76.9643 113.273C74.0646 113.843 71.0674 114.143 68.0003 114.143C54.1917 114.143 41.7998 108.077 33.3436 98.465C35.1707 94.4055 39.9295 85.9319 48.1717 72.0115C48.9468 70.7014 49.7323 69.781 49.917 69.966C50.1016 70.1503 56.6037 80.5196 64.3671 93.0077L76.9643 113.273Z"
              fill="#FCFCFC"
            />
            <path
              d="M111.529 83.348C106.372 97.9733 94.0533 109.22 78.7841 112.876C74.5785 106.389 60.6125 83.9565 60.6125 83.6094C60.6125 83.4658 72.6814 83.348 87.4326 83.348H111.529Z"
              fill="#FCFCFC"
            />
            <path
              d="M101.902 36.6966C109.5 44.922 114.143 55.9187 114.143 67.9998C114.143 72.923 113.372 77.6662 111.944 82.115H96.5965C86.6243 82.115 78.4651 81.9646 78.4651 81.7803C78.4651 81.3997 98.4368 43.0157 101.902 36.6966Z"
              fill="#FCFCFC"
            />
          </svg>
          {/* LEFT POINTER - Positioned at bottom right of icon */}
          <div className="absolute top-20 right-20 transform rotate-[40deg]">
            <svg
              width="67"
              height="60"
              viewBox="0 0 67 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="rotate-[135deg]"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.66917 56.874C1.66917 56.0456 2.34074 55.374 3.16917 55.374C3.9976 55.374 4.66917 56.0456 4.66917 56.874C4.66917 57.7025 3.9976 58.374 3.16917 58.374C2.34074 58.374 1.66917 57.7025 1.66917 56.874ZM0.669174 56.874C0.669174 55.4933 1.78846 54.374 3.16917 54.374C3.68565 54.374 4.16555 54.5306 4.56396 54.799L66.3374 -1.52588e-05L67.001 0.748062L5.26634 55.5127C5.52114 55.9044 5.66917 56.3719 5.66917 56.874C5.66917 58.2547 4.54988 59.374 3.16917 59.374C1.78846 59.374 0.669174 58.2547 0.669174 56.874Z"
                fill="#1A1B1C"
              />
            </svg>
          </div>
          <label className="absolute top-8 -right-10 w-[136px] h-[48px] text-[14px] cursor-pointer">
            ALLOW A.I. <br /> TO SCAN YOUR FACE
          </label>
        </div>
      </div>

      {/* Display Captured Image (if exists) */}
      {capturedImage && (
        <div className="fixed bottom-4 right-4 z-20 overflow-hidden rounded-lg shadow-lg">
          <div className="relative w-24 h-24">
            <img
              src={capturedImage}
              alt="Captured"
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setCapturedImage(null)}
              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Upload via Gallery Section */}
      <div
        onClick={triggerFileInput}
        className="flex flex-col items-center gap-6 cursor-pointer"
      >
        <div className="relative w-[400px] h-[400px] sm:w-[350px] sm:h-[350px] flex items-center justify-center">
          {/* Rotating Boxes */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 border-black w-[350px] h-[350px] sm:w-[300px] sm:h-[300px] slow-rotate-1 opacity-30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 border-black w-[375px] h-[375px] sm:w-[315px] sm:h-[315px] slow-rotate-2 opacity-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 border-black w-[390px] h-[390px] sm:w-[330px] sm:h-[330px] slow-rotate-3 opacity-10" />
          {/* SVG Icon */}
          <svg
            width="136"
            height="136"
            viewBox="0 0 136 136"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="67.9996" cy="67.9997" r="57.7857" stroke="#1A1B1C" />
            <circle
              cx="68"
              cy="68"
              r="50"
              fill="#FCFCFC"
              stroke="#1A1B1C"
              strokeWidth="2"
            />
            <path
              d="M78.3214 68C85.3631 68 91.0714 62.2916 91.0714 55.25C91.0714 48.2084 85.3631 42.5 78.3214 42.5C71.2798 42.5 65.5714 48.2084 65.5714 55.25C65.5714 62.2916 71.2798 68 78.3214 68Z"
              fill="#1A1B1C"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17 68C17 71.9604 17.4514 75.8154 18.3056 79.5163C23.5265 102.136 43.7939 119 68 119C94.8673 119 116.882 98.2244 118.856 71.862C118.951 70.5872 119 69.2993 119 68C119 39.8335 96.1665 17 68 17C39.8335 17 17 39.8335 17 68ZM35.3365 67.7257L19.3825 78.7708C18.6175 75.3024 18.2143 71.6983 18.2143 68C18.2143 40.5041 40.5041 18.2143 68 18.2143C95.4959 18.2143 117.786 40.5041 117.786 68C117.786 69.5412 117.716 71.0661 117.579 72.5716L82.9447 91.8127C80.4324 93.2084 77.3343 92.9968 75.0351 91.2724L43.855 67.8874C41.3462 66.0058 37.9149 65.9406 35.3365 67.7257Z"
              fill="#1A1B1C"
            />
          </svg>
          {/* RIGHT POINTER - Positioned at bottom left of icon */}
          <div className="absolute bottom-20 left-20 transform rotate-[220deg]">
            <svg
              width="67"
              height="60"
              viewBox="0 0 67 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="rotate-[135deg]"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.66917 56.874C1.66917 56.0456 2.34074 55.374 3.16917 55.374C3.9976 55.374 4.66917 56.0456 4.66917 56.874C4.66917 57.7025 3.9976 58.374 3.16917 58.374C2.34074 58.374 1.66917 57.7025 1.66917 56.874ZM0.669174 56.874C0.669174 55.4933 1.78846 54.374 3.16917 54.374C3.68565 54.374 4.16555 54.5306 4.56396 54.799L66.3374 -1.52588e-05L67.001 0.748062L5.26634 55.5127C5.52114 55.9044 5.66917 56.3719 5.66917 56.874C5.66917 58.2547 4.54988 59.374 3.16917 59.374C1.78846 59.374 0.669174 58.2547 0.669174 56.874Z"
                fill="#1A1B1C"
              />
            </svg>
          </div>
          <label
            htmlFor="upload-input"
            className="absolute bottom-8 -left-10 cursor-pointer w-[136px] h-[48px]  text-right text-[14px]"
          >
            ALLOW A.I. TO ACCESS GALLERY
          </label>
        </div>
        <input
          id="upload-input"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleGalleryUpload}
        />
      </div>
    </div>
  );
};

export default UploadFace;
