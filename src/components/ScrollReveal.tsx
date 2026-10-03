import React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';

export interface ScrollRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  scale?: number;
  className?: string;
  viewportAmount?: number | 'some' | 'all';
  amount?: number | 'some' | 'all';
  once?: boolean;
  staggerChildren?: number;
  delayChildren?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  duration = 0.55,
  direction = 'up',
  distance = 24,
  scale = 1,
  className = '',
  viewportAmount,
  amount,
  once = true,
  staggerChildren: _staggerChildren,
  delayChildren: _delayChildren,
  ...props
}) => {
  const effectiveAmount = amount ?? viewportAmount ?? 0.2;

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const initialPos = getInitialPosition();

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...initialPos,
        scale: scale !== 1 ? scale : 1,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: once !== undefined ? once : true,
        amount: effectiveAmount,
      }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export interface StaggerContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  staggerChildren?: number;
  delayChildren?: number;
  className?: string;
  viewportAmount?: number | 'some' | 'all';
  amount?: number | 'some' | 'all';
  once?: boolean;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = '',
  staggerChildren: _staggerChildren,
  delayChildren: _delayChildren,
  viewportAmount: _viewportAmount,
  amount: _amount,
  once: _once,
  ...props
}) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

export interface StaggerItemProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  scale?: number;
  duration?: number;
  delay?: number;
  className?: string;
  viewportAmount?: number | 'some' | 'all';
  amount?: number | 'some' | 'all';
  once?: boolean;
  staggerChildren?: number;
  delayChildren?: number;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  direction = 'up',
  distance = 20,
  scale = 1,
  duration = 0.5,
  delay = 0,
  className = '',
  viewportAmount,
  amount,
  once = true,
  staggerChildren: _staggerChildren,
  delayChildren: _delayChildren,
  ...props
}) => {
  const effectiveAmount = amount ?? viewportAmount ?? 0.2;

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const initialPos = getInitialPosition();

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...initialPos,
        scale: scale !== 1 ? scale : 1,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: once !== undefined ? once : true,
        amount: effectiveAmount,
      }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
