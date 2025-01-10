"use client"
import React, { useEffect, useState } from "react";
import NavigationButtons from "./NavigationButtons";
import InputField from "./InputField";
import IntroductionBox from "../animations/IntroductionBox";
import QuestionInput from "./QuestionInput";
import GSAPAnimatedIntroduction from "../animations/GSAPAnimatedIntroduction";

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

  const onProceed = async () => {
    if (!canProceed) {
      // Show an error message if the input is invalid
      alert("Please correct the input before proceeding.");
      return;
    }

    // Proceed to the next question
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setInputValue(""); // Optionally reset the input field when moving to the next step

    // When reaching the second question ("Where are you from?"), ping the API with entered data
    if (currentQuestionIndex === 0) {
      const userName = answers[0] || inputValue;
      const userLocation = inputValue;

      try {
        const response = await fetch(
          "https://wk7wmfz7x8.execute-api.us-east-2.amazonaws.com/live/FES_Virtual_Internship_1/level2",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: userName,
              Location: userLocation,
            }),
          }
        );

        const result = await response.json();
        console.log(result); // Log the response from the API

        // Handle success (e.g., show a success message)
        if (response.ok) {
          alert(`SUCCESS: Added ${userName} from ${userLocation}`);
        } else {
          alert("Failed to add user. Please try again.");
        }
      } catch (error) {
        console.error("Error pinging the API:", error);
        alert("Error occurred while sending data.");
      }
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col justify-center items-center">
      {!showIntro && (
        <IntroductionBox onAnimationComplete={handleAnimationComplete} />
      )}

      {showIntro && (
        <GSAPAnimatedIntroduction isVisible={showIntro}>
          {/* 1. Rotating boxes background */}
          <div className="absolute w-full h-full">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-dotted border-2 border-black w-[475px] h-[475px] slow-rotate-1 opacity-30 overflow-hidden z-0 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-dotted border-2 border-black w-[490px] h-[490px] slow-rotate-2 opacity-20 overflow-hidden z-0 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-dotted border-2 border-black w-[505px] h-[505px] slow-rotate-3 opacity-10 overflow-hidden z-0 pointer-events-none"></div>
          </div>

          {/* 2. Input Field */}
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
                setValidLocation={setValidLocation}
              />
            )}
          </div>

          {/* 3. Navigation Buttons */}
          <NavigationButtons
            onBack={onBack}
            onProceed={onProceed}
            canProceed={canProceed}
          />
        </GSAPAnimatedIntroduction>
      )}
    </div>
  );
};

export default Introduction;
