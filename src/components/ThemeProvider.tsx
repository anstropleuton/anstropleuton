import { createContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "light" | "dark" | "system";

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export default function ThemeProvider({
  children,
  key = "theme",
}: {
  children: ReactNode;
  key?: string;
}) {
  const [theme, setThemeState] = useState<Theme>(
    () => (localStorage.getItem(key) as Theme) || "system",
  );

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(key, newTheme);
  };

  useEffect(() => {
    const root = document.documentElement;
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

    function applyTheme(theme: Theme) {
      if (theme === "system") {
        if (systemDark.matches) {
          root.classList.add("dark");
          
        } else {
          root.classList.remove("dark");
        }
      } else if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }

    applyTheme(theme);

    if (theme === "system") {
      const handler = () => applyTheme("system");
      systemDark.addEventListener("change", handler);
      return () => systemDark.removeEventListener("change", handler);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
