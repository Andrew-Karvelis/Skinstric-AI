import React, { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";

interface GSAPAnimatedIntroductionProps {
  children: ReactNode;
  isVisible: boolean;
}

const GSAPAnimatedIntroduction: React.FC<GSAPAnimatedIntroductionProps> = ({
  children,
  isVisible,
}) => {
  const startTextRef = useRef<HTMLDivElement>(null);
  const skinstricTextRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const skinstricLeftMaskRef = useRef<HTMLDivElement>(null);
  const skinstricRightMaskRef = useRef<HTMLDivElement>(null);
  const inputLeftMaskRef = useRef<HTMLDivElement>(null);
  const inputRightMaskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible) return;

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    // Reset initial states
    gsap.set(startTextRef.current, { opacity: 0, y: 20 });
    gsap.set(skinstricTextRef.current, { opacity: 0 });
    gsap.set([skinstricLeftMaskRef.current, skinstricRightMaskRef.current], {
      width: "50%",
    });
    gsap.set([inputLeftMaskRef.current, inputRightMaskRef.current], {
      width: "50%",
    });
    gsap.set(navRef.current, { opacity: 0 });

    // Animation sequence
    tl.to(startTextRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
    })
      .to(
        skinstricTextRef.current,
        {
          opacity: 1,
          duration: 0.6,
        },
        "-=0.3"
      )
      .to(
        [skinstricLeftMaskRef.current, skinstricRightMaskRef.current],
        {
          width: "0%",
          duration: 0.6,
        },
        "-=0.5"
      )
      .to(
        [inputLeftMaskRef.current, inputRightMaskRef.current],
        {
          width: "0%",
          duration: 0.6,
        },
        "-=0.5"
      )
      .to(navRef.current, {
        opacity: 1,
        duration: 0.6,
      });

    return () => {
      tl.kill();
    };
  }, [isVisible]);

  return (
    <div className="relative flex h-screen w-full flex-col justify-center items-center">
      {/* Background rotating boxes */}
      <div className="absolute w-full h-full z-0">
        {React.Children.toArray(children)[0]}
      </div>

      {/* SKINSTRIC TEXT */}
      <div
        ref={skinstricTextRef}
        className="absolute top-5 left-5 font-bold opacity-0 text-xs"
      >
        <div
          ref={skinstricLeftMaskRef}
          className="absolute top-0 left-0 h-full bg-white z-20"
          style={{ width: "50%" }}
        />
        <div
          ref={skinstricRightMaskRef}
          className="absolute top-0 right-0 h-full bg-white z-20"
          style={{ width: "50%" }}
        />
        SKINSTRIC
      </div>

      {/* Start Analysis Text */}
      <div
        ref={startTextRef}
        className="absolute text-xs top-20 left-5 font-bold opacity-0 z-20"
      >
        TO START ANALYSIS
      </div>

      {/* Input Field with masks */}
      <div ref={inputRef} className="relative z-10">
        <div className="relative overflow-hidden">
          {/* Input content */}
          <div className="relative z-10">
            {React.Children.toArray(children)[1]}
          </div>
          {/* Left mask */}
          <div
            ref={inputLeftMaskRef}
            className="absolute top-0 left-0 h-full bg-white z-20"
            style={{ width: "50%" }}
          />
          {/* Right mask */}
          <div
            ref={inputRightMaskRef}
            className="absolute top-0 right-0 h-full bg-white z-20"
            style={{ width: "50%" }}
          />
        </div>
      </div>

      {/* Navigation */}
      <div
        ref={navRef}
        className="opacity-0 absolute bottom-8 flex justify-between w-full"
      >
        {React.Children.toArray(children)[2]}
      </div>
    </div>
  );
};

export default GSAPAnimatedIntroduction;
