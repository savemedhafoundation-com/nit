import { useEffect, useRef } from "react";

const MAX_PUPIL_OFFSET = 15;
const MOTION_EASE = 0.16;

export const EyeFollowWord = ({ className = "", ariaLabel = "Monitoring" }) => {
  const pupilRefs = useRef([]);
  const targetPositionsRef = useRef([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);
  const currentPositionsRef = useRef([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);
  const rafRef = useRef(null);

  useEffect(() => {
    const animatePupils = () => {
      let needsNextFrame = false;

      pupilRefs.current.forEach((pupil, index) => {
        if (!pupil) return;

        const current = currentPositionsRef.current[index];
        const target = targetPositionsRef.current[index];
        current.x += (target.x - current.x) * MOTION_EASE;
        current.y += (target.y - current.y) * MOTION_EASE;

        if (
          Math.abs(target.x - current.x) > 0.05 ||
          Math.abs(target.y - current.y) > 0.05
        ) {
          needsNextFrame = true;
        }

        pupil.style.transform = `translate(${current.x}px, ${current.y}px)`;
      });

      if (needsNextFrame) {
        rafRef.current = window.requestAnimationFrame(animatePupils);
      } else {
        rafRef.current = null;
      }
    };

    const startAnimation = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(animatePupils);
    };

    const updateTargets = (pointerX, pointerY) => {
      pupilRefs.current.forEach((pupil, index) => {
        const eye = pupil?.parentElement;
        if (!pupil || !eye) return;

        const rect = eye.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = pointerX - centerX;
        const deltaY = pointerY - centerY;
        const distance = Math.hypot(deltaX, deltaY) || 1;
        const travel = Math.min(MAX_PUPIL_OFFSET, distance * 0.18);
        const moveX = (deltaX / distance) * travel;
        const moveY = (deltaY / distance) * travel;

        targetPositionsRef.current[index] = { x: moveX, y: moveY };
      });
    };

    const resetTargets = () => {
      targetPositionsRef.current = [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
      ];
      startAnimation();
    };

    const onMouseMove = (event) => {
      updateTargets(event.clientX, event.clientY);
      startAnimation();
    };

    const onTouchMove = (event) => {
      const touch = event.touches[0];
      if (!touch) return;
      updateTargets(touch.clientX, touch.clientY);
      startAnimation();
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("mouseleave", resetTargets);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseleave", resetTargets);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const baseClassName = "inline-flex items-center gap-3 rounded-[26px] px-3 py-2";

  return (
    <span className={`${baseClassName} ${className}`.trim()} aria-label={ariaLabel}>
      {[0, 1].map((index) => (
        <span
          key={index}
          className="nit-eye relative h-[72px] w-[84px] overflow-hidden rounded-[36px] border border-[#141414]/25 bg-[#fcfcfc] shadow-[0_4px_12px_rgba(0,0,0,0.2)] sm:h-[86px] sm:w-[100px] sm:rounded-[42px]"
        >
          <span className="absolute inset-0 flex items-end justify-center pb-[10px] sm:pb-[12px]">
            <span
              ref={(element) => {
                pupilRefs.current[index] = element;
              }}
              className="h-[42px] w-[42px] rounded-full border-[2px] border-[#63daff] bg-[#3e3e3f] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.15)] sm:h-[54px] sm:w-[54px]"
            />
          </span>
          <span className="nit-eye-lid nit-eye-lid-top" />
          <span className="nit-eye-lid nit-eye-lid-bottom" />
          <span className="nit-eye-strip" />
          <span className="pointer-events-none absolute left-[58%] top-[35%] h-[6px] w-[6px] rounded-full bg-white/80 sm:h-[7px] sm:w-[7px]" />
        </span>
      ))}
      <span className="sr-only">{ariaLabel}</span>
    </span>
  );
};

export default EyeFollowWord;
