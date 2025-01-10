import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const IntroductionBox = ({
  onAnimationComplete,
}: {
  onAnimationComplete: () => void;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const path1Ref = useRef<SVGRectElement | null>(null);
  const path2Ref = useRef<SVGRectElement | null>(null);
  const path3Ref = useRef<SVGRectElement | null>(null);

  useEffect(() => {
    const context = gsap.context(() => {
      const paths = [path1Ref.current, path2Ref.current, path3Ref.current];
      const sizes = [445, 475, 505]; // widths of each box

      // Calculate perimeter for each box
      const perimeters = sizes.map((size) => size * 4);

      // Set initial state - hide the boxes
      paths.forEach((path, i) => {
        if (path) {
          path.style.strokeDasharray = `${perimeters[i]}`;
          path.style.strokeDashoffset = `${perimeters[i]}`;
        }
      });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(paths, {
            opacity: 0,
            duration: 1,
            delay: 0.3,
            onComplete: onAnimationComplete,
          });
        },
      });

      // Animate each box
      paths.forEach((path, i) => {
        if (path) {
          gsap.set(path, { strokeDashoffset: "1 4" });
          tl.to(
            path,
            {
              strokeDashoffset: 0,
              strokeDasharray: `${perimeters[i]}`, // Maintain the dash pattern
              duration: 4,
              ease: "none",
            },
          0
          );
        }
      });
    }, containerRef);

    return () => context.revert();
  }, [onAnimationComplete]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
    >
      <svg className="absolute w-[505px] h-[505px] rotate-45"
      viewBox="0 0 520 520">
        <rect
          ref={path1Ref}
          x="37.5"
          y="37.5"
          width="445"
          height="445"
          fill="none"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="1 4" // Dash pattern
          opacity="0.3"
        />
        <rect
          ref={path2Ref}
          x="22.5"
          y="22.5"
          width="475"
          height="475"
          fill="none"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="1 4"
          opacity="0.2"
        />
        <rect
          ref={path3Ref}
          x="7.5"
          y="7.5"
          width="505"
          height="505"
          fill="none"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="1 4"
          opacity="0.1"
        />
      </svg>
    </div>
  );
};

export default IntroductionBox;
