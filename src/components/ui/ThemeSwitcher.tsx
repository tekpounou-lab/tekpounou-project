// src/providers/ThemeProvider.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback
} from 'react';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('tek-pou-nou-theme') as Theme) || 'system';
    }
    return 'system';
  });

  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');

  const getSystemTheme = useCallback((): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  const applyTheme = useCallback((themeToApply: 'light' | 'dark') => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    setActualTheme(themeToApply);
    if (themeToApply === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('tek-pou-nou-theme', newTheme);
    }
  }, []);

  useEffect(() => {
    if (theme === 'system') {
      const systemTheme = getSystemTheme();
      applyTheme(systemTheme);

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        applyTheme(e.matches ? 'dark' : 'light');
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      applyTheme(theme);
    }
  }, [theme, applyTheme, getSystemTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, actualTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

interface ThemeSwitcherProps {
  variant?: 'dropdown' | 'buttons' | 'toggle';
  className?: string;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  variant = 'toggle',
  className = ''
}) => {
  const { theme, setTheme, actualTheme } = useTheme();
  const { t } = useTranslation();

  if (variant === 'toggle') {
    return (
      <motion.button
        onClick={() => setTheme(actualTheme === 'dark' ? 'light' : 'dark')}
        className={`
          p-2 rounded-lg transition-all duration-200
          text-gray-600 hover:text-gray-900 hover:bg-gray-100
          dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-700
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500
          ${className}
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={t('profile.switchTheme', {
          mode: actualTheme === 'dark' ? 'light' : 'dark'
        })}
        title={t('profile.switchTheme', {
          mode: actualTheme === 'dark' ? 'light' : 'dark'
        })}
      >
        <motion.div
          key={actualTheme}
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {actualTheme === 'dark' ? (
            <SunIcon className="w-5 h-5" aria-hidden="true" />
          ) : (
            <MoonIcon className="w-5 h-5" aria-hidden="true" />
          )}
        </motion.div>
      </motion.button>
    );
  }

  if (variant === 'buttons') {
    const options = [
      { value: 'light' as Theme, icon: SunIcon, label: t('profile.lightMode') },
      { value: 'dark' as Theme, icon: MoonIcon, label: t('profile.darkMode') },
      { value: 'system' as Theme, icon: ComputerDesktopIcon, label: t('profile.systemMode', 'System') }
    ];

    return (
      <div className={`flex space-x-1 ${className}`} role="group" aria-label={t('profile.theme')}>
        {options.map(({ value, icon: Icon, label }) => (
          <motion.button
            key={value}
            onClick={() => setTheme(value)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              px-3 py-2 text-sm font-medium rounded-md transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500
              ${theme === value
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-700'
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

  return <ThemeSwitcher variant="toggle" className={className} />;
};
