import { twMerge } from "tailwind-merge";
import { tw } from "../utils/tw";
import Highlight from "./Highlight";

export default function CodeBlock({
  language,
  className,
  children,
}: {
  language?: string;
  className?: string;
  children?: string;
}) {
  const mergedClasses = twMerge(
    tw`my-4 flex overflow-x-auto rounded-lg border-[1px] border-neutral-200 bg-neutral-100 transition-colors dark:border-neutral-800 dark:bg-neutral-900`,
    className,
  );

  return (
    <span className={mergedClasses}>
      <Highlight language={language}>{children}</Highlight>
    </span>
  );
}
