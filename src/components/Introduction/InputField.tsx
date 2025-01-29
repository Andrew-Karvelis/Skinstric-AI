import React, { useState } from "react";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoCompleteRef?: React.Ref<HTMLInputElement>;
  errorMessage?: string;
  currentQuestionIndex: number;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  autoCompleteRef,
  errorMessage,
  currentQuestionIndex,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const renderLabel = () => {
    return isFocused || value !== "" ? (
      <div className="text-gray-500 mb-2">{label}</div>
    ) : (
      <div className="text-gray-500 mb-2">Click to type</div>
    );
  };

  return (
    <div className="flex flex-col items-center max-w-[300px] sm:max-w-[500px] relative">
      {renderLabel()}
      <input
        ref={autoCompleteRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="relative sm:w-[475px] w-[200px] max-w-lg text-2xl sm:text-5xl text-center text-black outline-none border-b-2 border-gray-500 bg-transparent z-20"
        placeholder={
          isFocused && currentQuestionIndex === 1 ? "Enter a location" : ""
        }
      />
      <span
        className={`absolute max-w-lg text-2xl sm:text-5xl text-center p-8 pointer-events-none whitespace-nowrap ${
          isFocused || value ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300 ease-in-out`}
      >
        {value || label}
      </span>
      {errorMessage && (
        <div className="absolute -bottom-8 text-red-500 mt-2 text-sm">{errorMessage}</div>
      )}
    </div>
  );
};

export default InputField;
