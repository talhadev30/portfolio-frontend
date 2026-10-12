import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

/**
 * Reusable hook to handle the rolling character hover animation on split links.
 * Used across Navlink, FooterTop, and navigation elements.
 */
export const useRollingLink = (scopeRef) => {
  useGSAP(
    () => {
      gsap.registerPlugin(SplitText);
      const targetScope = scopeRef?.current || document;
      const elements = targetScope.querySelectorAll('.split');

      const splits = [];
      elements.forEach((el) => {
        splits.push(new SplitText(el, { type: 'chars', charsClass: 'chars' }));
      });

      return () => {
        splits.forEach((s) => s.revert());
      };
    },
    { scope: scopeRef }
  );

  const handleHoverIn = (e) => {
    const el = e.currentTarget;
    const chars = el.querySelectorAll('.chars');

    if (!el._tl) {
      el._tl = gsap.timeline({ paused: true });
      el._tl.to(chars, {
        yPercent: -100,
        stagger: 0.02,
        ease: 'power4.inOut',
      });
    }

    el._tl.play();
  };

  const handleHoverOut = (e) => {
    const el = e.currentTarget;
    if (el._tl) {
      el._tl.reverse();
    }
  };

  return { handleHoverIn, handleHoverOut };
};

export default useRollingLink;

