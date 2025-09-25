// Tek PouNou Design System v2
// Culturally grounded, accessible, and scalable

// === COLOR SYSTEM ===
export const BRAND_COLORS = {
  // Primary Brand (Haitian Flag Inspired)
  indigo: '#4B0082',    // Deep indigo (from Haitian flag)
  navy: '#001F3F',      // Dark base (professional)
  
  // Accent Gradient (Logo Colors - Verified WCAG AA+)
  orange: '#FF6B6B',    // Coral red (energy)
  pink: '#FF2D95',      // Vibrant pink (creativity)
  purple: '#913D88',    // Royal purple (dignity)
  
  // Neutrals (Accessible in Light/Dark Mode)
  white: '#FFFFFF',
  offWhite: '#FAFAFA',
  charcoal: '#121212',
  nearBlack: '#1A1A1A',
  
  // Grayscale (12-step for depth)
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  
  // Semantic Colors (WCAG AA Compliant)
  success: {
    DEFAULT: '#10B981',
    light: '#DCFCE7',
    dark: '#047857'
  },
  warning: {
    DEFAULT: '#F59E0B',
    light: '#FEF3C7',
    dark: '#B45309'
  },
  error: {
    DEFAULT: '#EF4444',
    light: '#FEE2E2',
    dark: '#B91C1C'
  },
  info: {
    DEFAULT: '#3B82F6',
    light: '#DBEAFE',
    dark: '#1D4ED8'
  }
} as const;

// === COLOR SCHEMES ===
export const COLOR_SCHEMES = {
  light: {
    background: BRAND_COLORS.white,
    surface: BRAND_COLORS.offWhite,
    text: BRAND_COLORS.gray[900],
    textSecondary: BRAND_COLORS.gray[600],
    border: BRAND_COLORS.gray[200],
    accent: BRAND_COLORS.indigo,
  },
  dark: {
    background: BRAND_COLORS.charcoal,
    surface: BRAND_COLORS.nearBlack,
    text: BRAND_COLORS.gray[100],
    textSecondary: BRAND_COLORS.gray[400],
    border: BRAND_COLORS.gray[800],
    accent: BRAND_COLORS.purple,
  }
} as const;

// === GRADIENTS ===
export const GRADIENTS = {
  // Primary Brand Gradient (Logo)
  brand: 'linear-gradient(135deg, #FF6B6B 0%, #FF2D95 50%, #913D88 100%)',
  
  // Secondary Gradients
  indigoToPurple: 'linear-gradient(135deg, #4B0082 0%, #913D88 100%)',
  coralToSunset: 'linear-gradient(135deg, #FF6B6B 0%, #F59E0B 100%)',
  
  // Background Gradients
  subtleLight: 'linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%)',
  subtleDark: 'linear-gradient(180deg, #121212 0%, #1A1A1A 100%)'
} as const;

// === TYPOGRAPHY ===
export const TYPOGRAPHY = {
  // Font Stacks (Creole-Optimized)
  fontFamily: {
    // Primary: Supports Kreyòl characters + readability
    primary: ['"Inter"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
    
    // Secondary: For headings (strong personality)
    heading: ['"Poppins"', '"Inter"', 'system-ui', 'sans-serif'],
    
    // Mono: For code/tech contexts
    mono: ['"JetBrains Mono"', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace']
  },
  
  // Font Sizes (Clamp for responsiveness)
  fontSizes: {
    xs: 'clamp(0.65rem, 0.625rem + 0.125vw, 0.75rem)',    // 10-12px
    sm: 'clamp(0.75rem, 0.725rem + 0.125vw, 0.875rem)',   // 12-14px
    base: 'clamp(0.875rem, 0.85rem + 0.125vw, 1rem)',      // 14-16px
    lg: 'clamp(1rem, 0.975rem + 0.125vw, 1.125rem)',      // 16-18px
    xl: 'clamp(1.125rem, 1.1rem + 0.125vw, 1.25rem)',     // 18-20px
    '2xl': 'clamp(1.25rem, 1.2rem + 0.25vw, 1.5rem)',     // 20-24px
    '3xl': 'clamp(1.5rem, 1.45rem + 0.25vw, 1.875rem)',   // 24-30px
    '4xl': 'clamp(1.875rem, 1.8rem + 0.375vw, 2.25rem)',  // 30-36px
    '5xl': 'clamp(2.25rem, 2.15rem + 0.5vw, 3rem)',        // 36-48px
  },
  
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800
  },
  
  lineHeight: {
    tight: 1.2,
    snug: 1.33,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2
  }
} as const;

// === SPACING & LAYOUT ===
export const SPACING = {
  // Consistent 4px baseline grid
  0: '0',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
} as const;

// === BORDER RADIUS ===
export const BORDER_RADIUS = {
  none: '0',
  xs: '0.125rem',   // 2px
  sm: '0.25rem',    // 4px
  base: '0.375rem', // 6px
  md: '0.5rem',     // 8px
  lg: '0.75rem',    // 12px
  xl: '1rem',       // 16px
  '2xl': '1.5rem',  // 24px
  '3xl': '2rem',    // 32px
  full: '9999px'
} as const;

// === SHADOWS ===
export const SHADOWS = {
  none: 'none',
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  base: '0 1px 4px 0 rgb(0 0 0 / 0.1), 0 2px 2px -2px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  
  // Special: Brand-accented shadows
  brand: '0 4px 20px -4px rgba(145, 61, 136, 0.3)',
  indigo: '0 4px 20px -4px rgba(75, 0, 130, 0.25)'
} as const;

// === BREAKPOINTS ===
export const BREAKPOINTS = {
  // Mobile-first responsive tiers
  xs: '0',
  sm: '640px',    // ≥640px
  md: '768px',    // ≥768px
  lg: '1024px',   // ≥1024px
  xl: '1280px',   // ≥1280px
  '2xl': '1536px' // ≥1536px
} as const;

// === ANIMATION ===
export const MOTION = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    tooltip: '200ms'
  },
  easing: {
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  },
  reduceMotion: {
    // For users with prefers-reduced-motion
    duration: '0ms',
    easing: 'linear'
  }
} as const;

// === BRAND IDENTITY ===
export const BRAND_IDENTITY = {
  name: 'Tek Pou Nou',
  taglines: {
    primary: "Teknoloji pou kominote Ayisyen an",
    secondary: "Technology for the Haitian community",
    mission: "Edikasyon, kominote, ak pwogrè"
  },
  voice: {
    // Core principles for all communications
    warm: true,
    proud: true,
    communityFirst: true,
    accessible: true,
    hopeful: true
  },
  // Haitian cultural elements
  symbols: {
    // National flag colors
    flagIndigo: BRAND_COLORS.indigo,
    flagRed: BRAND_COLORS.orange,
    
    // Cultural motifs (for future illustrations)
    vetiver: '#2E8B57',   // Vetiver green (national plant)
    mango: '#FFB74D'      // Mango yellow (national fruit)
  }
} as const;

// === UTILITY EXPORTS ===
// For programmatic use in components
export const getGradient = (name: keyof typeof GRADIENTS) => GRADIENTS[name];
export const getColor = (path: string, scheme: 'light' | 'dark' = 'light') => {
  // Helper to safely access nested color objects
  return path.split('.').reduce((obj, key) => obj?.[key], COLOR_SCHEMES[scheme]);
};