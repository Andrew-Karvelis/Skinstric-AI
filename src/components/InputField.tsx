import React, { useState, useRef, useEffect } from "react";

declare global {
  interface Window {
    google: any;
  }
}

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  currentQuestionIndex: number;
}

const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  value, 
  onChange, 
  currentQuestionIndex 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const autocompleteRef = useRef<HTMLInputElement | null>(null);
  const autocompleteInstance = useRef<any>(null);

  const initAutocomplete = () => {
    if (!autocompleteRef.current || !window.google) return;

    try {
      autocompleteInstance.current = new window.google.maps.places.Autocomplete(
        autocompleteRef.current,
        {
          types: ["(cities)"], // Restrict to cities only
          fields: ["formatted_address"], // Only get the address
        }
      );

      autocompleteInstance.current.addListener("place_changed", () => {
        const place = autocompleteInstance.current.getPlace();
        if (place?.formatted_address) {
          onChange(place.formatted_address);
        }
      });
    } catch (error) {
      console.error("Error initializing autocomplete:", error);
    }
  };

  const loadGoogleMapsScript = () => {
    if (document.querySelector('script[src*="maps.googleapis.com/maps/api"]')) {
      initAutocomplete();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      initAutocomplete();
    };

    document.head.appendChild(script);
  };

  const cleanupAutocomplete = () => {
    if (autocompleteInstance.current) {
      window.google.maps.event.clearInstanceListeners(autocompleteInstance.current);
      autocompleteInstance.current = null;
    }
  };

  useEffect(() => {
    if (currentQuestionIndex === 1) {
      loadGoogleMapsScript();
    } else {
      cleanupAutocomplete();
    }

    return () => {
      cleanupAutocomplete(); // Cleanup on unmount or when question changes
    };
  }, [currentQuestionIndex]);

  return (
    <div className="flex flex-col items-center">
      {isFocused || value !== "" ? (
        <div className="text-gray-500 mb-2">{label}</div>
      ) : (
        <div className="text-gray-500 mb-2">CLICK TO TYPE</div>
      )}
      <input
        // Only apply ref for question 2
        ref={currentQuestionIndex === 1 ? autocompleteRef : undefined}
        type="text"
        className="relative w-full max-w-lg text-5xl text-center text-black outline-none border-b-2 border-gray-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={isFocused && currentQuestionIndex === 1? "Enter a location": ""}
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
