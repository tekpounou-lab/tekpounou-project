// src/components/ui/BrandComponents.tsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { GRADIENTS, BRAND_IDENTITY, MOTION } from '@/styles/design-system';

// === Brand Logo Component ===
interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  variant?: 'full' | 'icon' | 'text';
}

const sizeMap = {
  sm: { logo: 'h-8 w-8', text: 'text-lg' },
  md: { logo: 'h-10 w-10', text: 'text-xl' },
  lg: { logo: 'h-12 w-12', text: 'text-2xl' },
  xl: { logo: 'h-16 w-16', text: 'text-3xl' }
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  variant = 'full'
}) => {
  const { logo: logoSize, text: textSize } = sizeMap[size];

  useEffect(() => {
    const styleId = 'brand-gradient-styles';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes gradient-shift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) existingStyle.remove();
    };
  }, []);

  if (variant === 'icon') {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`${logoSize} ${className}`}
        transition={{ duration: parseFloat(MOTION.duration.normal) / 1000 }}
      >
        <img 
          src="/logo.png" 
          alt={BRAND_IDENTITY.name}
          className="w-full h-full object-contain"
        />
      </motion.div>
    );
  }

  if (variant === 'text') {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={className}
        transition={{ duration: parseFloat(MOTION.duration.normal) / 1000 }}
      >
        <h1 
          className={`font-bold tracking-tight ${textSize}`}
          style={{ 
            background: GRADIENTS.brand,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          {BRAND_IDENTITY.name}
        </h1>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={`flex items-center space-x-2 ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: parseFloat(MOTION.duration.normal) / 1000 }}
    >
      <div className={logoSize}>
        <img 
          src="/logo.png" 
          alt={BRAND_IDENTITY.name}
          className="w-full h-full object-contain"
        />
      </div>
      {showText && (
        <h1 
          className={`font-bold tracking-tight ${textSize}`}
          style={{ 
            background: GRADIENTS.brand,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          {BRAND_IDENTITY.name}
        </h1>
      )}
    </motion.div>
  );
};

// === Brand Button Props ===
interface BrandButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  asLink?: boolean;
  to?: string;
  // Add only the HTML props you actually use
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  onMouseDown?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  type?: 'button' | 'submit' | 'reset';
}

export const BrandButton: React.FC<BrandButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled,
  asLink = false,
  to,
  onClick,
  onMouseDown,
  type = 'button',
  ...rest
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return `text-white focus:ring-pink-500 hover:shadow-lg active:scale-95`;
      case 'secondary':
        return `bg-white text-gray-900 border-2 border-gray-200 hover:border-gray-300 focus:ring-gray-500 active:scale-95 dark:bg-gray-800 dark:text-white dark:border-gray-700`;
      case 'ghost':
        return `text-gray-700 hover:bg-gray-100 focus:ring-gray-500 active:scale-95 dark:text-gray-300 dark:hover:bg-gray-800`;
      default:
        return `text-white focus:ring-pink-500`;
    }
  };

  const buttonContent = (
    <>
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
          <path fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path>
        </svg>
      )}
      {children}
    </>
  );

  const buttonStyle = variant === 'primary' 
    ? { 
        background: GRADIENTS.brand,
        backgroundSize: '200% 200%',
        animation: 'gradient-shift 3s ease infinite'
      } 
    : {};

  // Handle anchor link
  if (asLink && to) {
    return (
      <motion.a
        href={to}
        whileHover={{ scale: variant === 'primary' ? 1.02 : 1.01 }}
        whileTap={{ scale: 0.98 }}
        className={`${baseClasses} ${sizeClasses[size]} ${getVariantClasses()} ${className}`}
        style={buttonStyle}
        aria-disabled={disabled || isLoading}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        onMouseDown={onMouseDown as React.MouseEventHandler<HTMLAnchorElement>}
        {...rest}
      >
        {buttonContent}
      </motion.a>
    );
  }

  // Handle button
  return (
    <motion.button
      whileHover={{ scale: variant === 'primary' ? 1.02 : 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${sizeClasses[size]} ${getVariantClasses()} ${className}`}
      style={buttonStyle}
      disabled={disabled || isLoading}
      onClick={onClick}
      onMouseDown={onMouseDown}
      type={type}
      {...rest}
    >
      {buttonContent}
    </motion.button>
  );
};

// === Brand Card Component ===
export const BrandCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}> = ({ children, className = '', hover = true }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -2 } : {}}
      className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm ${className}`}
      style={{
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
      }}
      transition={{ duration: parseFloat(MOTION.duration.fast) / 1000 }}
    >
      {children}
    </motion.div>
  );
};