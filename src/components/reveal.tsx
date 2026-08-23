import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Render as a different element (default "div"). */
  as?: ElementType;
  /** Delay in ms before the entrance plays — use for subtle staggering. */
  delay?: number;
  className?: string;
  /** Optional hover behaviour for the wrapper. */
  hover?: "lift";
};

/**
 * Reveals its children with a fade-up entrance once it scrolls into view.
 * Uses IntersectionObserver; no animation library. Respects prefers-reduced-motion
 * (handled in CSS via [data-reveal].is-visible).
 */
export function Reveal({ children, as, delay = 0, className, hover }: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // If IntersectionObserver is unavailable, just show.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-hover={hover}
      className={[className, visible ? "is-visible" : ""].filter(Boolean).join(" ")}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
