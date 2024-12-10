"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import InputField from "./InputField";

const Introduction = () => {
  const questions = ["Introduce yourself", "Where are you from?"];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);

  const handleProceed = () => {
    // save current input value
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = inputValue;
    setAnswers(updatedAnswers);

    // clear input and move to next question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    setInputValue("");
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setInputValue(answers[currentQuestionIndex - 1] || "");
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col justify-center items-center">
      {/* ROTATING BOXES */}
      <div className="absolute w-full h-full">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-dotted border-2 border-black w-[500px] h-[500px] slow-rotate-1 opacity-5 overflow-hidden z-10 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-dotted border-2 border-black w-[525px] h-[525px] slow-rotate-2 opacity-15 overflow-hidden z-10 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-dotted border-2 border-black w-[550px] h-[550px] slow-rotate-3 opacity-25 overflow-hidden z-10 pointer-events-none "></div>
      </div>

      <span className="absolute text-xs top-20 left-5 font-bold">
        TO START ANALYSIS
      </span>

      {/* DYNAMIC INPUT FIELD */}
      <div className="flex flex-col items-center">
        <InputField
          label={questions[currentQuestionIndex]}
          value={inputValue}
          onChange={setInputValue}
        />
      </div>

      {/* Bottom Nav */}
      <div className="absolute bottom-8 flex justify-between w-full">
        {/* LEFT BUTTON */}
        <button
          onClick={handleBack}
          className="flex ml-8 items-center relative group"
        >
          <div className="relative">
            <div className="absolute border-dotted border-1 border-black w-8 h-8 rotate-45 transition-transform duration-500 group-hover:scale-125"></div>
            <div className="relative flex justify-center items-center border-1 border-black w-8 h-8 rotate-45 transition-transform duration-500 group-hover:scale-150">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 transition-all duration-500 group-hover:scale-[0.67]">
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="pointer-events-none"
                />
              </div>
            </div>
          </div>
          <p className="text-xs ml-6 font-bold transition-transform duration-500 group-hover:translate-x-8">
            BACK
          </p>
        </button>

        {/* RIGHT BUTTON */}
        <button
          onClick={handleProceed}
          className={`${
            !inputValue && `hidden`
          } flex mr-8 items-center relative group`}
        >
          <p className="text-xs mr-6 font-bold transition-transform duration-500 group-hover:-translate-x-8">
            PROCEED
          </p>
          <div className="relative">
            <div className="absolute border-dotted border-1 border-black w-8 h-8 rotate-45 transition-transform duration-500 group-hover:scale-125"></div>
            <div className="relative flex justify-center items-center border-1 border-black w-8 h-8 rotate-45 transition-transform duration-500 group-hover:scale-150">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 transition-all duration-500 group-hover:scale-[0.67]">
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="pointer-events-none"
                />
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Introduction;
