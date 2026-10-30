import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useRef } from 'react';
import { prefersReducedMotion } from '../utils/motion';

/**
 * Reusable hook to handle the rolling character hover animation on split links.
 * Used across Navlink, Sociallink, FooterTop, and navigation elements.
 */
const useRollingLink = (scopeRef) => {
  const activeTimelines = useRef([]);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.registerPlugin(SplitText);
      const targetScope = scopeRef?.current || document;
      const elements = targetScope.querySelectorAll('.split');

      const splits = [];
      elements.forEach((el) => {
        splits.push(new SplitText(el, { type: 'chars', charsClass: 'chars' }));
      });

      return () => {
        splits.forEach((s) => s.revert());
        activeTimelines.current.forEach(({ element, timeline }) => {
          timeline.kill();
          if (element._tl === timeline) delete element._tl;
        });
        activeTimelines.current = [];
      };
    },
    { scope: scopeRef }
  );

  const handleHoverIn = (e) => {
    if (prefersReducedMotion()) return;

    const el = e.currentTarget;
    const chars = el.querySelectorAll('.chars');

    if (!el._tl) {
      el._tl = gsap.timeline({ paused: true });
      activeTimelines.current.push({ element: el, timeline: el._tl });
      el._tl.to(chars, {
        yPercent: -100,
        stagger: 0.02,
        ease: 'power4.inOut',
      });
    }

    el._tl.play();
  };

  const handleHoverOut = (e) => {
    if (prefersReducedMotion()) return;

    const el = e.currentTarget;
    if (el._tl) {
      el._tl.reverse();
    }
  };

  return { handleHoverIn, handleHoverOut };
};

export default useRollingLink;
