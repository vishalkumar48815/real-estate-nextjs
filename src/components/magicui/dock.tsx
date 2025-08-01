"use client";

import { cva, type VariantProps } from "class-variance-authority";
import {
  motion,
  MotionProps,
  MotionValue,
  useMotionValue,
} from "motion/react";
import React, { PropsWithChildren, useRef, useState, useEffect } from "react";

import { cn } from "@/lib/utils";

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  iconSize?: number;
  iconMagnification?: number;
  iconDistance?: number;
  direction?: "top" | "middle" | "bottom";
  children: React.ReactNode;
}

const DEFAULT_SIZE = 40;
const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const dockVariants = cva(
  "mx-auto mt-8 flex h-[58px] items-center justify-center gap-2 rounded-2xl p-2 relative overflow-hidden bg-transparent transition-all duration-500 ease-in-out",
  {
    variants: {
      hasBackground: {
        true: "",
        false: "",
      },
    },
    defaultVariants: {
      hasBackground: false,
    },
  }
);

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      iconSize = DEFAULT_SIZE,
      iconMagnification = DEFAULT_MAGNIFICATION,
      iconDistance = DEFAULT_DISTANCE,
      direction = "middle",
      ...props
    },
    ref,
  ) => {
    const mouseX = useMotionValue(Infinity);
    const [hasBackground, setHasBackground] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        setHasBackground(scrollY > 100);
      };

      // Add scroll event listener
      window.addEventListener('scroll', handleScroll);
      handleScroll();

      // Cleanup
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const renderChildren = () => {
      // Convert children to array for easier manipulation
      const childrenArray = React.Children.toArray(children);

      // Filter only DockIcon elements
      const dockIcons = childrenArray.filter(
        (child) =>
          React.isValidElement(child) && child.type === DockIcon
      );

      // Find non-DockIcon children (if you want to support them)
      const otherChildren = childrenArray.filter(
        (child) =>
          !(React.isValidElement(child) && child.type === DockIcon)
      );

      // Split DockIcons into left and right groups
      const leftIcons = dockIcons.slice(0, -2); // all except last two
      const rightIcons = dockIcons.slice(-2);   // last two

      // Helper to clone with props
      const cloneIcons = (icons: React.ReactNode[]) =>
        icons.map((child: React.ReactNode, idx: number) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<DockIconProps>, {
                mouseX,
                size: iconSize,
                magnification: iconMagnification,
                distance: iconDistance,
                key: idx,
              })
            : child
        );

      return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          {/* Left group */}
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            {cloneIcons(leftIcons)}
          </div>
          {/* Optionally render other children here */}
          {otherChildren}
          {/* Right group */}
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            {cloneIcons(rightIcons)}
          </div>
        </div>
      );
    };

    return (
      <motion.div
        ref={ref}
        {...props}
        className={cn(dockVariants({ hasBackground, className }), {
          "items-start": direction === "top",
          "items-center": direction === "middle",
          "items-end": direction === "bottom",
        })}
        style={{
          background: 'transparent',
          width: hasBackground ? '70%' : '90%',
        }}
      >
        {/* Background that slides down */}
        <motion.div
          className="absolute left-1/2 bg-white/90 dark:bg-gray-900/100 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-lg"
          initial={{ 
            top: '-160%',
            width: '0%'
          }}
          animate={{ 
            top: hasBackground ? '0%' : '-160%',
            width: hasBackground ? '100%' : '0%'
          }}
          transition={{ 
            top: { duration: 0.4, ease: "easeInOut", delay: hasBackground ? 0.1 : 0 },
            width: { duration: 0.4, ease: "easeInOut", delay: hasBackground ? 0.1 : 0 }
          }}
          style={{
            transform: `translateX(-50%)`,
            height: '100%',
          }}
        />
        
        {/* Content container */}
        <div className="relative z-10 flex items-center justify-between gap-2 w-full">
          {renderChildren()}
        </div>
      </motion.div>
    );
  },
);

Dock.displayName = "Dock";

export interface DockIconProps
  extends Omit<MotionProps & React.HTMLAttributes<HTMLDivElement>, "children"> {
  size?: number;
  magnification?: number;
  distance?: number;
  mouseX?: MotionValue<number>;
  className?: string;
  children?: React.ReactNode;
  props?: PropsWithChildren;
}

const DockIcon = ({
  size = DEFAULT_SIZE,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX,
  className,
  children,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      style={{ width: "fit-content", height: "fit-content" }}
      className={cn(
        "flex cursor-pointer items-center justify-center rounded-full p-2",
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon, dockVariants };
