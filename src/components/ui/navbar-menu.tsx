"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
  isDark = false,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
  isDark?: boolean;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative ">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer hover:opacity-[0.9]"
      >
        {item}
      </motion.p>
      {active !== null && children && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_0.5rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className={cn(
                  "backdrop-blur-md rounded-2xl overflow-hidden border shadow-xl",
                  isDark
                    ? "bg-gray-900/95 border-white/[0.2]"
                    : "bg-white/95 border-black/[0.2]"
                )}
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  const [timeout, setTimeoutState] = useState<NodeJS.Timeout | null>(null);

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setActive(null);
    }, 300);
    setTimeoutState(id);
  };

  const handleMouseEnter = () => {
    if (timeout) {
      clearTimeout(timeout);
      setTimeoutState(null);
    }
  };

  return (
    <nav
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className="relative flex justify-start space-x-6"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
  isDark = false,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
  isDark?: boolean;
}) => {
  return (
    <Link href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className={cn(
          "text-xl font-bold mb-1",
          isDark ? "text-white" : "text-black"
        )}>
          {title}
        </h4>
        <p className={cn(
          "text-sm max-w-[10rem]",
          isDark ? "text-neutral-300" : "text-neutral-700"
        )}>
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, isDark = false, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className={cn(
        isDark
          ? "text-neutral-200 hover:text-white"
          : "text-neutral-700 hover:text-black"
      )}
    >
      {children}
    </Link>
  );
};
