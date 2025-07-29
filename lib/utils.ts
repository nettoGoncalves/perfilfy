import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function smoothScrollTo(element: HTMLElement, duration = 600) {
  const start = window.scrollY;
  const end = element.getBoundingClientRect().top + start;
  const distance = end - start;
  const startTime = performance.now();

  function scroll(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutQuad(progress);
    window.scrollTo(0, start + distance * ease);

    if (progress < 1) {
      requestAnimationFrame(scroll);
    }
  }

  function easeInOutQuad(t: number) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  requestAnimationFrame(scroll);
}
