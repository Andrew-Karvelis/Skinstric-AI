"use client";
import React, { useEffect, useState } from "react";
import NavigationButtons from "./NavigationButtons";
import InputField from "./InputField";
import IntroductionBox from "../animations/IntroductionBox";
import QuestionInput from "./QuestionInput";

const Introduction = () => {
  const questions = ["Introduce yourself", "Where are you from?"];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [validLocation, setValidLocation] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  const handleAnimationComplete = () => {
    setShowIntro(true);
  };

  const validateInput = (input: string): string | undefined => {
    const trimmedInput = input.trim();
    if (trimmedInput && !/^[a-zA-Z\s]*$/.test(trimmedInput)) {
      return "Invalid input pattern."; // Invalid input pattern
    }
    return undefined; // No error if input is valid
  };

  const isValidInput = (input: string): boolean => {
    return !validateInput(input); // Return true if no error message is returned
  };

  const canProceed =
    currentQuestionIndex === 0
      ? isValidInput(inputValue) && inputValue.trim() !== "" // "Introduce yourself" validation
      : validLocation; // "Where are you from?" validation based on Google Autocomplete

  const onBack = () => {
    // Decrease the index to go to the previous question or step
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    setInputValue(""); // Optionally reset the input value when going back
  };

  const onProceed = () => {
    if (!canProceed) {
      // Show an error message if the input is invalid
      alert("Please correct the input before proceeding.");
      return;
    }

    // Proceed to the next question
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setInputValue(""); // Optionally reset the input field when moving to the next step
  };


  return (
    <div className="relative flex h-screen w-full flex-col justify-center items-center">
      {/* ROTATING BOXES */}
      {!showIntro && (
        <IntroductionBox onAnimationComplete={handleAnimationComplete} />
      )}

      {showIntro && (
        <>
          <div className="absolute w-full h-full">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-dotted border-2 border-black w-[475px] h-[475px] slow-rotate-1 opacity-5 overflow-hidden z-0 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-dotted border-2 border-black w-[490px] h-[490px] slow-rotate-2 opacity-15 overflow-hidden z-0 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-dotted border-2 border-black w-[505px] h-[505px] slow-rotate-3 opacity-25 overflow-hidden z-0 pointer-events-none "></div>
          </div>

          <span className="absolute text-xs top-20 left-5 font-bold">
            TO START ANALYSIS
          </span>

          {/* DYNAMIC INPUT FIELD */}
          <div className="flex flex-col items-center">
            {currentQuestionIndex === 0 ? (
              <InputField
                label={questions[currentQuestionIndex]}
                value={inputValue}
                onChange={setInputValue}
                errorMessage={validateInput(inputValue)}
                currentQuestionIndex={currentQuestionIndex}
              />
            ) : (
              <QuestionInput
                label={questions[currentQuestionIndex]}
                value={inputValue}
                onChange={setInputValue}
                setValidLocation={setValidLocation} // Pass function to set location validity
              />
            )}
          </div>

          {/* Bottom Nav */}
          <NavigationButtons
            onBack={onBack}
            onProceed={onProceed}
            canProceed={canProceed} // Allow proceed only if input is valid
          />
        </>
      )}
    </div>
  );
};

export default Introduction;
