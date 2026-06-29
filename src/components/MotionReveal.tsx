"use client";

import { useEffect } from "react";

export function MotionReveal() {
  useEffect(() => {
    const observed = new WeakSet<Element>();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -4% 0px",
        threshold: 0.08
      }
    );

    const register = (root: ParentNode = document) => {
      const elements = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));

      elements.forEach((element) => {
        if (observed.has(element)) {
          return;
        }

        observed.add(element);

        if (reduceMotion) {
          element.classList.add("is-visible");
          return;
        }

        observer.observe(element);
      });
    };

    register();

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) {
            return;
          }

          if (node.matches("[data-reveal]")) {
            register(node.parentNode ?? document);
            return;
          }

          register(node);
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  return null;
}
