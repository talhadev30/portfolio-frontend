import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';

/**
 * Reusable hook to animate text characters into view using GSAP SplitText.
 * Consolidates duplicated SplitText reveal timelines across hero, info, and works headers.
 */
export const useSplitReveal = (options = {}) => {
  const textRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(SplitText);

    if (!textRef.current) return;

    const ctx = gsap.context(() => {
      const split = new SplitText(textRef.current, { type: 'chars' });

      gsap.from(split.chars, {
        opacity: 0,
        yPercent: options.yPercent ?? 100,
        ease: options.ease ?? 'sine.inOut',
        stagger: options.stagger ?? {
          each: 0.02,
          from: 'start',
        },
        duration: options.duration,
      });
    });

    return () => ctx.revert();
  }, [options.stagger, options.ease, options.yPercent, options.duration]);

  return textRef;
};

export default useSplitReveal;

