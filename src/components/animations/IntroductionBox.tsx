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
      const tl = gsap.timeline({
        defaults: { duration: 1, ease: "linear" },
        onComplete: () => {
          gsap.to(boxRef.current, {
            opacity: 0,
            duration: 1,
            delay: 0.3,
            onComplete: onAnimationComplete,
          });
        },
      });
  
      // Step 1: Reveal the top side (top left to top right)
      tl.to(boxRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", // Top side
      });
  
      // Step 2: Reveal the right side (top right to bottom right)
      tl.to(boxRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 0%)", // Right side
      });
  
      // Step 3: Reveal the bottom side (bottom right to bottom left)
      tl.to(boxRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Bottom side
      });
  
      // Step 4: Reveal the left side (bottom left to top left)
      tl.to(boxRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Left side (closure)
      });
    }, containerRef);
  
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
