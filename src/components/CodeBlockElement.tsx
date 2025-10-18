import type { HTMLAttributes, ReactElement } from "react";
import CodeBlock from "./CodeBlock";

export default function CodeBlockElement({
  className = "",
  children,
}: {
  className?: string;
  children: ReactElement<
    HTMLAttributes<HTMLElement> & { children: string },
    "code"
  >;
}) {
  const childClass = children.props.className ?? "";
  const language = /language-([\w+-]+)/.exec(childClass)?.[1] ?? "text";
  const code = children.props.children;

  return (
    <CodeBlock language={language} className={className}>
      {code}
    </CodeBlock>
  );
}
