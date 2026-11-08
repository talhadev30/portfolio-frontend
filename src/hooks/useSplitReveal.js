import { useContext, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';
import { prefersReducedMotion } from '../utils/motion';
import PageRevealContext from '../context/PageRevealContext';

gsap.registerPlugin(SplitText);

/**
 * Reusable hook to animate text characters into view using GSAP SplitText.
 *
 * - On initial load: waits for the loader to finish before playing.
 * - On page navigation: re-plays the stagger animation every time the route changes.
 */
const useSplitReveal = (options = {}) => {
  const textRef = useRef(null);
  const { loaderComplete, routeKey } = useContext(PageRevealContext);

  useGSAP(() => {
    if (!loaderComplete) return;
    if (prefersReducedMotion()) return;
    if (!textRef.current) return;

    const el = textRef.current;
    const split = new SplitText(el, { type: 'chars' });

    // Immediately snap chars to hidden start position (no flash/glitch)
    gsap.set(split.chars, {
      opacity: 0,
      yPercent: options.yPercent ?? 100,
    });

    // Animate chars into view — no delay, starts right away
    gsap.to(split.chars, {
      opacity: 1,
      yPercent: 0,
      ease: options.ease ?? 'sine.inOut',
      stagger: options.stagger ?? {
        each: 0.02,
        from: 'start',
      },
      duration: options.duration ?? 0.8,
    });

    const removeHoverListeners = split.chars.map((char) => {
      const moveUp = () => {
        gsap.to(char, {
          y: -10,
          duration: 0.2,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      };
      const moveBack = () => {
        gsap.to(char, {
          y: 0,
          duration: 0.2,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      };

      char.addEventListener('mouseenter', moveUp);
      char.addEventListener('mouseleave', moveBack);

      return () => {
        char.removeEventListener('mouseenter', moveUp);
        char.removeEventListener('mouseleave', moveBack);
      };
    });

    return () => {
      removeHoverListeners.forEach((removeListener) => removeListener());
      gsap.killTweensOf(split.chars);
      split.revert();
    };
  }, {
    dependencies: [loaderComplete, routeKey],
    revertOnUpdate: true,
  });

  return textRef;
};

export default useSplitReveal;
