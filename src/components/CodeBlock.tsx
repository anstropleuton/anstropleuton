// src/components/CodeBlock.tsx
import type { HTMLAttributes, ReactElement } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { isDark } from "./useTheme";
import { twMerge } from "tailwind-merge";

type CodeBlockProps = {
  className?: string;
  children: ReactElement<
    HTMLAttributes<HTMLElement> & { children: string },
    "code"
  >;
};

export default function CodeBlock({
  className = "",
  children,
  ...rest
}: CodeBlockProps) {
  const childClass = children.props.className ?? "";
  const lang = /language-([\w+-]+)/.exec(childClass)?.[1] ?? "text";
  const themeStyle = isDark() ? oneDark : oneLight;
  const code = children.props.children;

  const mergedClasses = twMerge(
    `my-4 flex overflow-x-auto rounded-lg border-[1px] border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 transition-colors`,
    className,
  );

  return (
    <span {...rest} className={mergedClasses}>
      <SyntaxHighlighter
        language={lang}
        style={
          {
            ...themeStyle,
            'pre[class*="language-"]': {
              background: "transparent",
              color: "inherit",
            },
            'code[class*="language-"]': {
              background: "transparent",
              color: "inherit",
            },
          } as any
        }
      >
        {code}
      </SyntaxHighlighter>
    </span>
  );
}

export function Code({ children, ...rest }: CodeBlockProps) {
  return (
    <span
      {...rest}
      className="inline-flex rounded-lg border-[1px] border-neutral-200 bg-neutral-100 px-2 leading-normal dark:border-neutral-800 dark:bg-neutral-900"
    >
      {children}
    </span>
  );
}
