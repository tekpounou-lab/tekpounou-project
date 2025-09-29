// src/components/providers/ThemeProvider.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const getInitialTheme = (): Theme => {
    if (typeof window === "undefined") return "system";
    return (localStorage.getItem("tek-pou-nou-theme") as Theme) || "system";
  };

  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [actualTheme, setActualTheme] = useState<"light" | "dark">("light");

  const applyTheme = (themeToApply: "light" | "dark") => {
    const root = document.documentElement;
    setActualTheme(themeToApply);

    root.classList.toggle("dark", themeToApply === "dark");
    root.style.setProperty("color-scheme", themeToApply);

    const vars =
      themeToApply === "dark"
        ? {
            "--toast-bg": "#374151",
            "--toast-color": "#f9fafb",
            "--toast-border": "#4b5563",
          }
        : {
            "--toast-bg": "#ffffff",
            "--toast-color": "#111827",
            "--toast-border": "#e5e7eb",
          };

    Object.entries(vars).forEach(([key, value]) =>
      root.style.setProperty(key, value)
    );
  };

  useEffect(() => {
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
      applyTheme(systemTheme.matches ? "dark" : "light");

      const listener = (e: MediaQueryListEvent) =>
        applyTheme(e.matches ? "dark" : "light");
      systemTheme.addEventListener("change", listener);

      return () => systemTheme.removeEventListener("change", listener);
    } else {
      applyTheme(theme);
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("tek-pou-nou-theme", newTheme);
    }
  };

  const value = useMemo(
    () => ({ theme, setTheme, actualTheme }),
    [theme, actualTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
