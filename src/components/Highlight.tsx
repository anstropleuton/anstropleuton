import { useTheme } from "./ThemeProvider";
import { Prism } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Highlight({
  language = "text",
  children,
}: {
  language?: string;
  children?: string;
}) {
  const { resolvedTheme } = useTheme();
  const themeStyle = resolvedTheme === "dark" ? oneDark : oneLight;

  return (
    <Prism
      language={language}
      wrapLongLines={true}
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
      customStyle={{
        margin: 0,
      }}
    >
      {children ?? ""}
    </Prism>
  );
}
