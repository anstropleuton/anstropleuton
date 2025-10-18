import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { tw } from "../utils/tw";

export default function CodeInline({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const mergedClasses = twMerge(
    tw`inline-flex rounded-lg border-[1px] border-neutral-200 bg-neutral-100 px-2 leading-normal dark:border-neutral-800 dark:bg-neutral-900`,
    className,
  );

  return <span className={mergedClasses}>{children}</span>;
}
