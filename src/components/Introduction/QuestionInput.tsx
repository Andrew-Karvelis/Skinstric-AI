import React, { useRef, useEffect, useState } from "react";

interface QuestionInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  setValidLocation: (valid: boolean) => void;
}

const QuestionInput: React.FC<QuestionInputProps> = ({
  label,
  value,
  onChange,
  setValidLocation,
}) => {
  const autocompleteRef = useRef<HTMLInputElement | null>(null);
  const autocompleteInstance = useRef<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false)


  const loadGoogleMapsScript = () => {
    return new Promise<void>((resolve, reject) => {
      const existingScript = document.querySelector(
        'script[src*="maps.googleapis.com"]'
      );
      if (existingScript) {
        resolve();
      } else {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;

        script.onload = () => resolve();
        script.onerror = () =>
          reject(new Error("Error loading Google Maps API"));

        document.head.appendChild(script);
      }
    });
  };

  const initAutocomplete = () => {
    if (!window.google || !window.google.maps) {
      console.log("Google Maps API not loaded yet");
      return;
    }

    if (!autocompleteRef.current) return;

    autocompleteInstance.current = new window.google.maps.places.Autocomplete(
      autocompleteRef.current,
      { types: ["(cities)"], fields: ["formatted_address", "place_id"] }
    );

    autocompleteInstance.current.addListener("place_changed", () => {
      const place = autocompleteInstance.current.getPlace();
      if (place?.formatted_address) {
        onChange(place.formatted_address);
        setValidLocation(true);
        setError(null);
      } else {
        setValidLocation(false);
        setError("Please select a valid location from the suggestions.");
      }
    });
  };

  useEffect(() => {
    const loadAndInit = async () => {
      try {
        await loadGoogleMapsScript();
        initAutocomplete();
      } catch (error) {
        console.error(error);
      }
    };

    loadAndInit();
  }, []);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFocused
    const inputValue = e.target.value;
    onChange(inputValue);
    setValidLocation(false); // Reset validity when the user types
    setError(null); // Clear any previous error message
  };

  const renderLabel = () => {
    return isFocused || value !== "" ? (
      <div className="text-gray-500 mb-2">{label}</div>
    ) : (
      <div className="text-gray-500 mb-2">Click to type</div>
    );
  };


  return (
    <>
    {renderLabel()}
      <input
        ref={autocompleteRef}
        type="text"
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={isFocused ? "Enter a location" : "Where are you from?"}
        className="w-full max-w-lg text-5xl text-center border-b-2 border-gray-500 outline-none bg-transparent z-20 placeholder-black focus:placeholder-gray-400"
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </>
  );
};

export default QuestionInput;
