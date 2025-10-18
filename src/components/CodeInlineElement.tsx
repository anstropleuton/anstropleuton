import type { ReactNode } from "react";
import CodeInline from "./CodeInline";

export default function CodeInlineElement({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return <CodeInline className={className}>{children}</CodeInline>;
}
