import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface NavigationButtonsProps {
  onBack: () => void;
  onProceed: () => void;
  canProceed: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ onBack, onProceed, canProceed }) => (
  <div className="absolute bottom-8 flex justify-between w-full">
    <button onClick={onBack} className="flex ml-8 items-center relative group">
      <div className="relative">
        <div className="absolute border-dotted border-1 border-black sm:w-8 sm:h-8 w-5 h-5 rotate-45 transition-transform duration-500 group-hover:scale-125"></div>
        <div className="relative flex justify-center items-center border-1 border-black sm:w-8 sm:h-8 w-5 h-5 rotate-45 transition-transform duration-500 group-hover:scale-150">
          <FontAwesomeIcon className="-rotate-45" icon={faArrowLeft} />
        </div>
      </div>
      <p className="text-xs ml-6 font-bold transition-transform duration-500 group-hover:translate-x-8">
        BACK
      </p>
    </button>

    {canProceed && (
      <button onClick={onProceed} className="flex mr-8 items-center relative group sm:right-12">
        <p className="text-xs mr-6 font-bold transition-transform duration-500 group-hover:-translate-x-8">
          PROCEED
        </p>
        <div className="relative">
          <div className="absolute border-dotted border-1 border-black sm:w-8 sm:h-8 w-5 h-5 rotate-45 transition-transform duration-500 group-hover:scale-125"></div>
          <div className="relative flex justify-center items-center border-1 border-black sm:w-8 sm:h-8 w-5 h-5 rotate-45 transition-transform duration-500 group-hover:scale-150">
            <FontAwesomeIcon className="-rotate-45" icon={faArrowRight} />
          </div>
        </div>
      </button>
    )}
  </div>
);

export default NavigationButtons;
