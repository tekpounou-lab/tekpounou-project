import React from 'react';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../providers/ThemeProvider';

type Theme = 'light' | 'dark' | 'system';

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
          p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100
          dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-700
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500
          transition-all duration-200 ${className}
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Switch to ${actualTheme === 'dark' ? 'light' : 'dark'} mode`}
        title={`Switch to ${actualTheme === 'dark' ? 'light' : 'dark'} mode`}
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
      { value: 'system' as Theme, icon: ComputerDesktopIcon, label: 'System' }
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
            aria-current={theme === value ? 'true' : 'false'}
            title={label}
          >
            <Icon className="w-4 h-4" aria-hidden="true" />
            <span className="ml-1 hidden sm:inline">{label}</span>
          </motion.button>
        ))}
      </div>
    );
  }

  // Default: Simple toggle for now (can extend to dropdown later)
  return (
    <ThemeSwitcher variant="toggle" className={className} />
  );
};