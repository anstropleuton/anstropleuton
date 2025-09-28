import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface FormattedProps {
  className?: string;
  children?: ReactNode;
}

export default function Formatted({ className, children }: FormattedProps) {
  const mergedClasses = twMerge(`prose prose-neutral dark:prose-invert max-w-none`, className);
  return (
    <div className={mergedClasses}>
      {children}
    </div>
  );
}
