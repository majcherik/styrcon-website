"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface TypingAnimationProps {
  text: string;
  duration?: number;
  className?: string;
  startDelay?: number;
  showCursor?: boolean;
  cursorClassName?: string;
}

export default function TypingAnimation({
  text,
  duration = 200,
  className,
  startDelay = 0,
  showCursor = true,
  cursorClassName
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);
  const indexRef = useRef<number>(0);

  useEffect(() => {
    // Reset states when text changes
    setDisplayedText("");
    setIsTypingComplete(false);
    indexRef.current = 0;

    const startTimeout = setTimeout(() => {
      const typingEffect = setInterval(() => {
        if (indexRef.current < text.length) {
          setDisplayedText(text.substring(0, indexRef.current + 1));
          indexRef.current += 1;
        } else {
          clearInterval(typingEffect);
          setIsTypingComplete(true);
        }
      }, duration);

      return () => {
        clearInterval(typingEffect);
      };
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [duration, text, startDelay]);

  return (
    <div className="relative">
      <h1
        className={cn(
          "font-display text-center text-4xl font-bold leading-[5rem] tracking-[-0.02em] drop-shadow-sm",
          className
        )}
      >
        {displayedText}
        {showCursor && (
          <motion.span
            className={cn("inline-block", cursorClassName)}
            animate={{
              opacity: isTypingComplete ? [1, 0] : [0, 1]
            }}
            transition={{
              duration: 0.8,
              repeat: isTypingComplete ? Infinity : 0,
              repeatType: "reverse"
            }}
          >
            |
          </motion.span>
        )}
      </h1>
    </div>
  );
}