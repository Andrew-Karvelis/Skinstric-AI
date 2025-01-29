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

  // Add resize handler
  useEffect(() => {
    const handleResize = () => {
      // Force a re-render by updating a state
      setShowIntro((prev) => prev);
    };

    // Add event listener with debounce
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

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
      trimmedInput &&
      !/^[a-zA-Z\s]*$/.test(trimmedInput)
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
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = inputValue;
    setAnswers(updatedAnswers);

    if (currentQuestionIndex === questions.length - 1) {
      await submitUserData(updatedAnswers[0], updatedAnswers[1]);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = value;
    setAnswers(updatedAnswers);
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      {!showIntro ? (
        <div className="w-full h-full flex items-center justify-center">
          <IntroductionBox onAnimationComplete={handleAnimationComplete} />
        </div>
      ) : (
        <GSAPAnimatedIntroduction isVisible={showIntro}>
          <div className="w-full h-full flex items-center justify-center">
            {/* Rotating boxes with more stable positioning */}
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 border-black w-[350px] h-[350px] sm:w-[475px] sm:h-[475px] slow-rotate-1 opacity-30" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 border-black w-[375px] h-[375px] sm:w-[490px] sm:h-[490px] slow-rotate-2 opacity-20" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 border-black w-[390px] h-[390px] sm:w-[505px] sm:h-[505px] slow-rotate-3 opacity-10" />
              </div>
            </div>

            {/* Content wrapper with improved stability */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-between">
              {/* Spacer for top alignment */}
              <div className="flex-1" />

              {/* Input field - centered */}
              <div className="fixed inset-0 w-full px-4 sm:px-8 flex justify-center items-center">
                <div className="w-full max-w-[240px] ">
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
                    <p className="text-red-500 text-center mt-4 ">
                      {errorMessage}
                    </p>
                  )}
                </div>
              </div>

              {/* Navigation buttons - bottom */}
              <div className="w-full sm:px-8 mb-8 mt-auto">
                <NavigationButtons
                  onBack={onBack}
                  onProceed={onProceed}
                  canProceed={canProceed()}
                />
              </div>
            </div>
          </div>
        </GSAPAnimatedIntroduction>
      )}
    </div>
  );
};

export default Introduction;
