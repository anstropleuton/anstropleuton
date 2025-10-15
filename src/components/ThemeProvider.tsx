import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type ThemeState = "light" | "dark";
type Theme = ThemeState | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: ThemeState;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  setTheme: () => {},
  resolvedTheme: "dark",
});

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children?: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("theme-config") as Theme) ?? "system";
  });

  const [resolvedTheme, setResolvedTheme] = useState<ThemeState>("dark");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    function applyTheme(isSystemDark: boolean) {
      const systemTheme = isSystemDark ? "dark" : "light";
      const finalTheme = theme === "system" ? systemTheme : theme;
      setResolvedTheme(finalTheme);
      localStorage.setItem("theme-config", theme);
      document.documentElement.classList.toggle("dark", finalTheme === "dark");
    }

    applyTheme(mediaQuery.matches);

    function onQueryChange(newQuery: MediaQueryListEvent) {
      applyTheme(newQuery.matches);
    }

    mediaQuery.addEventListener("change", onQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", onQueryChange);
    };
  }, [theme]);

  return (
    <ThemeContext value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext>
  );
}
