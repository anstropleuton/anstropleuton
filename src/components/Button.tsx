import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonStyle = "normal" | "accent" | "transparent";

interface ButtonProps {
  style?: ButtonStyle;
  uninteractable?: boolean;
  className?: string;
  children?: ReactNode;
}

export default function Button({
  style = "normal",
  uninteractable: disabled,
  className,
  children,
}: ButtonProps) {
  const styleClasses: Record<ButtonStyle, string> = {
    normal: `bg-neutral-200 dark:bg-neutral-800 ${disabled ? "" : "hover:bg-neutral-100 active:bg-neutral-300 dark:hover:bg-neutral-700 dark:active:bg-neutral-900"}`,
    accent: `bg-purple-500 text-white ${disabled ? "" : "hover:bg-purple-400 active:bg-purple-600"}`,
    transparent: `bg-transparent dark:bg-transparent ${disabled ? "" : "hover:bg-neutral-900/15 active:bg-neutral-500/15 dark:hover:bg-neutral-100/15 dark:active:bg-neutral-500/15"}`,
  };

  const mergedClasses = twMerge(
    `rounded-full px-4 py-2 text-nowrap transition-colors duration-75 ${styleClasses[style]}`,
    className,
  );

  return <div className={mergedClasses}>{children}</div>;
}
