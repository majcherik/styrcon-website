import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): [React.RefObject<HTMLElement>, boolean] {
  const { threshold = 0, root = null, rootMargin = "0%", freezeOnceVisible = false } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = targetRef.current;

    if (!node || !(node instanceof Element)) {
      return;
    }

    // If element is already visible and freezeOnceVisible is true, don't observe
    if (freezeOnceVisible && isIntersecting) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold, root, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, [threshold, root, rootMargin, freezeOnceVisible, isIntersecting]);

  return [targetRef, isIntersecting];
}