import React, { useState, useRef, useEffect } from "react";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [location, setLocation] = useState("");
  const autocompleteRef = useRef<HTMLInputElement | null>(null);

  // Function to load Google Maps API script dynamically
  const loadGoogleMapsScript = () => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&v=weekly`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (typeof window !== "undefined" && window.google) {
        const autocomplete = new window.google.maps.places.Autocomplete(
          autocompleteRef.current!,
          { types: ["geocode"] }
        );

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          setLocation(place.formatted_address || "");
          onChange(place.formatted_address || "");  // Update parent component state with the selected location
        });
      }
    };
  };

  useEffect(() => {
    loadGoogleMapsScript(); // Load the Google Maps script when the component mounts
  }, []);  // Empty dependency array ensures this runs once

  return (
    <div className="flex flex-col items-center">
      {isFocused || value !== "" ? (
        <div className="text-gray-500 mb-2">{label}</div>
      ) : (
        <div className="text-gray-500 mb-2">CLICK TO TYPE</div>
      )}

      <input
        ref={autocompleteRef}
        type="text"
        className="relative w-full max-w-lg text-5xl text-center text-black outline-none border-b-2 border-gray-500"
        value={value}
        onChange={(e) => onChange(e.target.value)} // Handle typing in the input field
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <span
        className={`absolute w-full max-w-lg text-5xl text-center p-8 pointer-events-none whitespace-nowrap ${
          isFocused || value ? "opacity-0" : "opacity-100"
        } transition-opacity 300ms ease-in-out`}
      >
        {value || label}
      </span>
    </div>
  );
};

export default InputField;
