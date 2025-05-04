import React, { useState } from "react";
import Webcam from "react-webcam";
import { useRouter } from "next/router"; // Use `next/router` instead of `next/navigation`

function WebcamCapture() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const router = useRouter();

  const handleCapture = (image: string) => {
    setImageUrl(image);
    // Use as URLObject to ensure type safety
    router.push({
      pathname: "/analysis",
      query: { imageUrl: image },
    } as unknown as string); // Casting to string if required
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Webcam
        audio={false}
        screenshotFormat="image/jpeg"
        width="100%"
        videoConstraints={{
          facingMode: "user",
        }}
      />
      <button
        onClick={() => {
          const videoElement = document.querySelector("video");
          if (videoElement) {
            const imageSrc = (videoElement as any).screenshot(); // Ensure this works properly
            handleCapture(imageSrc);
          }
        }}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
      >
        Capture Image
      </button>
    </div>
  );
}

export default WebcamCapture;
