"use client";
import React, { useEffect, useState } from "react";
import NavigationButtons from "./NavigationButtons";
import InputField from "./InputField";
import IntroductionBox from "../animations/IntroductionBox";
import QuestionInput from "./QuestionInput";
import GSAPAnimatedIntroduction from "../animations/GSAPAnimatedIntroduction";

const Introduction = () => {
  const questions = ["Introduce yourself", "Where are you from?"];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(["", ""]);
  const [inputValue, setInputValue] = useState("");
  const [validLocation, setValidLocation] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Initialize input value with existing answer when mounting or changing questions
  useEffect(() => {
    setInputValue(answers[currentQuestionIndex] || "");
  }, [currentQuestionIndex, answers]);

  const handleAnimationComplete = () => {
    setShowIntro(true);
  };

  const validateInput = (
    input: string,
    type: "text" | "location"
  ): string | undefined => {
    const trimmedInput = input.trim();
    if (
      type === "text" &&
      (!trimmedInput || !/^[a-zA-Z\s]*$/.test(trimmedInput))
    ) {
      return "Invalid text pattern.";
    }
    return undefined;
  };

  const isValidInput = (input: string, type: "text" | "location"): boolean => {
    return !validateInput(input, type);
  };

  const canProceed = (): boolean => {
    if (currentQuestionIndex === 0) {
      return isValidInput(inputValue, "text") && inputValue.trim() !== "";
    }
    return validLocation;
  };

  const onBack = () => {
    if (currentQuestionIndex > 0) {
      // Save current answer before going back
      const updatedAnswers = [...answers];
      updatedAnswers[currentQuestionIndex] = inputValue;
      setAnswers(updatedAnswers);

      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitUserData = async (name: string, location: string) => {
    try {
      const response = await fetch("/api/FES_Virtual_Internship_1/level2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          Location: location,
          Image: "https://via.placeholder.com/150",
        }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log(`SUCCESS: Added ${name} from ${location}`);
      } else {
        throw new Error("Failed to add user");
      }
    } catch (error) {
      console.error("Error submitting user data:", error);
      setErrorMessage("Failed to submit user data. Please try again.");
    }
  };

  const onProceed = async () => {
    if (!canProceed()) {
      setErrorMessage("Please correct the input before proceeding.");
      return;
    }

    setErrorMessage(null);

    // Always update the answers array with the current input
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = inputValue;
    setAnswers(updatedAnswers);

    if (currentQuestionIndex === questions.length - 1) {
      // Submit data only after the last question
      await submitUserData(updatedAnswers[0], updatedAnswers[1]);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Handle input changes
  const handleInputChange = (value: string) => {
    setInputValue(value);
    // Update answers in real-time as user types
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = value;
    setAnswers(updatedAnswers);
  };

  const showAnswers = () => {
    console.log(answers);
  };

  return (
    <div className="relative flex h-screen w-full flex-col justify-center items-center">
      {!showIntro && (
        <IntroductionBox onAnimationComplete={handleAnimationComplete} />
      )}
      {showIntro && (
        <GSAPAnimatedIntroduction isVisible={showIntro}>
          <div className="absolute w-full h-full">
            {["475px", "490px", "505px"].map((size, index) => (
              <div
                key={index}
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-dotted border-2 border-black w-[${size}] h-[${size}] slow-rotate-${
                  index + 1
                } opacity-${
                  30 - index * 10
                } overflow-hidden z-0 pointer-events-none`}
              ></div>
            ))}
          </div>

          <div className="flex flex-col items-center">
            {currentQuestionIndex === 0 ? (
              <InputField
                label={questions[currentQuestionIndex]}
                value={inputValue}
                onChange={handleInputChange}
                errorMessage={validateInput(inputValue, "text")}
                currentQuestionIndex={currentQuestionIndex}
              />
            ) : (
              <QuestionInput
                label={questions[currentQuestionIndex]}
                value={inputValue}
                onChange={handleInputChange}
                setValidLocation={setValidLocation}
              />
            )}
            {errorMessage && (
              <p className="text-red-500 mt-2">{errorMessage}</p>
            )}
          </div>

          <NavigationButtons
            onBack={onBack}
            onProceed={onProceed}
            canProceed={canProceed()}
          />
        </GSAPAnimatedIntroduction>
      )}
    </div>
  );
};

export default Introduction;
