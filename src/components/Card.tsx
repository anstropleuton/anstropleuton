import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface CardProps {
  className?: string;
  children?: ReactNode;
}

export default function Card({ className, children }: CardProps) {
  const mergedClasses = twMerge(
    `rounded-2xl border-t-4 border-b-4 border-t-neutral-50 border-b-neutral-200 bg-neutral-100 p-10 dark:border-t-neutral-800 dark:border-b-neutral-950 dark:bg-neutral-900 transition-colors`,
    className,
  );
  return <div className={mergedClasses}>{children}</div>;
}
