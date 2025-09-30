// src/components/ui/ThemeSwitcher.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../providers/ThemeProvider";
import { useTranslation } from "react-i18next";

type Theme = "light" | "dark" | "system";

interface ThemeSwitcherProps {
  variant?: "dropdown" | "buttons" | "toggle";
  className?: string;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  variant = "toggle",
  className = "",
}) => {
  const { theme, setTheme, actualTheme } = useTheme();
  const { t } = useTranslation();

  /** --- TOGGLE VARIANT --- */
  if (variant === "toggle") {
    return (
      <motion.button
        onClick={() => setTheme(actualTheme === "dark" ? "light" : "dark")}
        className={`
          p-2 rounded-lg transition-all duration-200
          text-gray-600 hover:text-gray-900 hover:bg-gray-100
          dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-700
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500
          ${className}
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={t("profile.switchTheme", {
          mode: actualTheme === "dark" ? "light" : "dark",
        })}
        title={t("profile.switchTheme", {
          mode: actualTheme === "dark" ? "light" : "dark",
        })}
      >
        <motion.div
          key={actualTheme}
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {actualTheme === "dark" ? (
            <SunIcon className="w-5 h-5" aria-hidden="true" />
          ) : (
            <MoonIcon className="w-5 h-5" aria-hidden="true" />
          )}
        </motion.div>
      </motion.button>
    );
  }

  /** --- BUTTONS VARIANT --- */
  if (variant === "buttons") {
    const options = [
      { value: "light" as Theme, icon: SunIcon, label: t("profile.lightMode") },
      { value: "dark" as Theme, icon: MoonIcon, label: t("profile.darkMode") },
      {
        value: "system" as Theme,
        icon: ComputerDesktopIcon,
        label: t("profile.systemMode", "System"),
      },
    ];

    return (
      <div
        className={`flex space-x-1 ${className}`}
        role="group"
        aria-label={t("profile.theme")}
      >
        {options.map(({ value, icon: Icon, label }) => (
          <motion.button
            key={value}
            onClick={() => setTheme(value)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              px-3 py-2 text-sm font-medium rounded-md transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500
              ${
                theme === value
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-700"
              }
            `}
            aria-pressed={theme === value}
            title={label}
          >
            <Icon className="w-4 h-4" aria-hidden="true" />
            <span className="ml-1 hidden sm:inline">{label}</span>
          </motion.button>
        ))}
      </div>
    );
  }

  /** --- DROPDOWN VARIANT --- */
  if (variant === "dropdown") {
    const options = [
      { value: "light" as Theme, icon: SunIcon, label: t("profile.lightMode") },
      { value: "dark" as Theme, icon: MoonIcon, label: t("profile.darkMode") },
      {
        value: "system" as Theme,
        icon: ComputerDesktopIcon,
        label: t("profile.systemMode", "System"),
      },
    ];

    const current = options.find((opt) => opt.value === theme);
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    // Close dropdown if clicked outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
      <div ref={ref} className={`relative inline-block text-left ${className}`}>
        <motion.button
          onClick={() => setOpen(!open)}
          className={`
            inline-flex items-center px-3 py-2 rounded-md text-sm font-medium
            bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600
            shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500
          `}
          whileTap={{ scale: 0.97 }}
        >
          {current && <current.icon className="w-4 h-4 mr-1" />}
          {current?.label}
          <ChevronDownIcon className="ml-2 -mr-1 h-4 w-4" />
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className={`
                absolute right-0 mt-2 w-40 origin-top-right rounded-md shadow-lg
                bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5
                focus:outline-none
              `}
            >
              <div className="py-1">
                {options.map(({ value, icon: Icon, label }) => (
                  <button
                    key={value}
                    onClick={() => {
                      setTheme(value);
                      setOpen(false);
                    }}
                    className={`
                      flex items-center w-full px-3 py-2 text-sm text-left
                      ${
                        theme === value
                          ? "bg-gray-100 dark:bg-gray-700 font-semibold"
                          : "hover:bg-gray-50 dark:hover:bg-gray-700"
                      }
                    `}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  /** --- FALLBACK --- */
  return <ThemeSwitcher variant="toggle" className={className} />;
};
