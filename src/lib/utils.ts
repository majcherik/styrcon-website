import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Aceternity UI utilities
export const useMotionValue = (initial: number) => {
  return { get: () => initial, set: (value: number) => {}, on: () => {} };
};

export const useScroll = () => {
  return { scrollY: useMotionValue(0) };
};

export const useTransform = (value: any, inputRange: number[], outputRange: any[]) => {
  return useMotionValue(outputRange[0]);
};