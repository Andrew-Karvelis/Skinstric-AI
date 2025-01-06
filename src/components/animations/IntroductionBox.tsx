import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const IntroductionBox = ({
  onAnimationComplete,
}: {
  onAnimationComplete: () => void;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const context = gsap.context(() => {
      // Timeline for box-drawing animation
      const tl = gsap.timeline({
        defaults: { duration: 1, ease: "ease" },
        onComplete: () => {
          // Fade out box when animation completes
          gsap.to(boxRef.current, {
            opacity: 0,
            duration: 1,
            delay: 0.3,
            onComplete: onAnimationComplete,
          });
        },
      });

      // Set initial hidden state
      gsap.set(boxRef.current, {
        clipPath: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)", // Fully hidden
      });

      // Step 1: Draw the top side (left to right)
      tl.to(boxRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", // Top edge
      });

      // Step 2: Draw the right side (top to bottom)
      tl.to(boxRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 100% 100%)", // Right edge
      });

      // Step 3: Draw the bottom side (right to left)
      tl.to(boxRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Bottom edge
      });

      // Step 4: Draw the left side (bottom to top)
      tl.to(boxRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Full box
      });
    }, containerRef);

    // Cleanup on unmount
    return () => context.revert();
  }, [onAnimationComplete]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
    >
      <div
        ref={boxRef}
        style={{
          clipPath: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)", // Initial hidden state
        }}
        className="w-[550px] h-[550px] border-2 border-dotted border-black"
      />
    </div>
  );
};

export default IntroductionBox;
