"use client";
import { createContext, useContext, useEffect, useState } from "react";

type ThemeOptions = "light" | "dark" | "system";

interface ThemeProviderProps {
  children: React.ReactNode;
  /**
   * Disables the CSS transitions when the theme changes. By default, this is set to `false`.
   */
  disableTransitionOnChange?: boolean;
}

interface ThemeContextData {
  theme: ThemeOptions;
  /**
   * Toggles the "dark" class on the document element.
   */
  toggleTheme: () => void;
  /**
   * Sets the theme to the specified theme option.
   *
   * @param {ThemeOptions} theme - The theme option to set.
   * @return {void} This function does not return anything.
   */
  handleSetTheme: (theme: ThemeOptions) => void;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({
  children,
  disableTransitionOnChange = false,
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemeOptions>("system");

  const toggleTheme = () => {
    window?.document?.documentElement.classList.toggle("dark");
  };

  const handleSetTheme = (theme: ThemeOptions): void => {
    setTheme(theme);
  };

  useEffect(() => {
    const css = document.createElement("style");
    if (disableTransitionOnChange) {
      css.type = "text/css";
      css.appendChild(
        document.createTextNode(
          `* {
         -webkit-transition: none !important;
         -moz-transition: none !important;
         -o-transition: none !important;
         -ms-transition: none !important;
         transition: none !important;
      }`
        )
      );
      document.head.appendChild(css);
    }

    switch (theme) {
      case "light":
        window?.document?.documentElement.classList.remove("dark");
        break;
      case "dark":
        window?.document?.documentElement.classList.add("dark");
        break;
      case "system":
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          window?.document?.documentElement.classList.add("dark");
        } else {
          window?.document?.documentElement.classList.remove("dark");
        }
        break;
    }
    if (disableTransitionOnChange) {
      const _ = window.getComputedStyle(css).opacity;
      document.head.removeChild(css);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        handleSetTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
