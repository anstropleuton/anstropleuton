import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { tw } from "../utils/tw";

type Style = "normal" | "accent" | "transparent";

export function Rounded({
  style = "normal",
  className,
  children,
}: {
  style?: Style;
  className?: string;
  children?: ReactNode;
}) {
  const styleClasses: Record<Style, string> = {
    normal: tw`bg-neutral-200 hover:bg-neutral-100 active:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:active:bg-neutral-900`,
    accent: tw`bg-purple-400 hover:bg-purple-300 active:bg-purple-500 dark:bg-purple-600 dark:hover:bg-purple-500 dark:active:bg-purple-700`,
    transparent: tw`hover:bg-neutral-100/40 active:bg-neutral-300/40 dark:hover:bg-neutral-700/40 dark:active:bg-neutral-900/40`,
  };

  const buttonClass = tw`rounded-4xl p-2 transition-colors`;

  const styleClass = styleClasses[style];

  const mergedClasses = twMerge(buttonClass, styleClass, className);

  return <div className={mergedClasses}>{children}</div>;
}

export function Button({
  onClick,
  style = "normal",
  className,
  children,
}: {
  onClick?: () => void;
  style?: Style;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <button onClick={onClick}>
      <Rounded style={style} className={className}>
        {children}
      </Rounded>
    </button>
  );
}

export function Link({
  url,
  style = "normal",
  className,
  children,
}: {
  url?: string;
  style?: Style;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <a href={url}>
      <Rounded style={style} className={className}>
        {children}
      </Rounded>
    </a>
  );
}
