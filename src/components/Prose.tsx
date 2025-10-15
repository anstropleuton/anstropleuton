import type { ReactNode } from "react";
import { tw } from "../utils/tw";
import { twMerge } from "tailwind-merge";

export default function Prose({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const classes = twMerge(
    tw`prose prose-neutral dark:prose-invert text-xl leading-loose max-w-none prose-a:no-underline`,
    className,
  );
  return <div className={classes}>{children}</div>;
}
