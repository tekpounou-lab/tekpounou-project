// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // === Semantic Colors (Mapped to CSS Variables from lovable.css) ===
      colors: {
        // Background & Foreground
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        
        // Primary Brand
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        
        // Secondary
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        
        // Card & Popover
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        
        // Muted
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        
        // Accent (Brand Gradient Colors)
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        
        // Destructive (Error)
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        
        // Borders, Inputs, Rings
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        
        // Sidebar (for future admin panels)
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        }
      },

      // === Typography ===
      fontFamily: {
        sans: ['Roboto', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Monaco', 'Cascadia Code', 'Segoe UI Mono', 'monospace'],
      },

      // === Spacing ===
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },

      // === Animations ===
      animation: {
        'gradient': 'gradient 3s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        // From lovable.css
        'fadeInUp': 'fadeInUp 0.6s ease-out forwards',
        'gentleBounce': 'gentleBounce 2s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        // From lovable.css
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gentleBounce: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-5px)' },
          '60%': { transform: 'translateY(-3px)' },
        },
      },

      // === Background Images ===
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'brand-gradient': 'linear-gradient(135deg, #FF6B6B 0%, #FF2D95 50%, #913D88 100%)',
        'hero-pattern': "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF2D95' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
      },

      // === Box Shadows ===
      boxShadow: {
        'brand': '0 10px 25px -5px rgba(255, 45, 149, 0.2), 0 4px 6px -2px rgba(255, 45, 149, 0.1)',
        'brand-lg': '0 20px 40px -10px rgba(255, 45, 149, 0.3), 0 8px 16px -4px rgba(255, 45, 149, 0.2)',
        // From lovable.css
        'soft': 'var(--shadow-soft)',
        'medium': 'var(--shadow-medium)',
        'strong': 'var(--shadow-strong)',
        'glow': 'var(--shadow-glow)',
      },

      // === Border Radius ===
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      // === Backdrop Blur ===
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    // === Custom Utilities ===
    function({ addUtilities }) {
      const newUtilities = {
        '.text-gradient': {
          'background': 'linear-gradient(135deg, #FF6B6B 0%, #FF2D95 50%, #913D88 100%)',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
        '.bg-brand-gradient': {
          'background': 'linear-gradient(135deg, #FF6B6B 0%, #FF2D95 50%, #913D88 100%)',
        },
        '.bg-brand-gradient-hover': {
          'background': 'linear-gradient(135deg, #FF6B6B 0%, #FF2D95 50%, #913D88 100%)',
          'background-size': '200% 200%',
          'transition': 'background-position 0.3s ease',
        },
        '.bg-brand-gradient-hover:hover': {
          'background-position': '100% 0%',
        },
        // Haiti flag gradient
        '.bg-haiti-gradient': {
          'background': 'linear-gradient(to bottom, #0072CE 0%, #0072CE 50%, #CE1126 50%, #CE1126 100%)',
        },
        // Lovable semantic classes
        '.tpn-gradient': {
          'background': 'var(--gradient-hero)',
        },
        '.tpn-gradient-text': {
          'background': 'var(--gradient-hero)',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
      };
      addUtilities(newUtilities);
    },
    
    // === Custom Base Styles ===
    function({ addBase }) {
      addBase({
        // Custom scrollbar
        '::-webkit-scrollbar': {
          width: '8px',
        },
        '::-webkit-scrollbar-track': {
          background: 'hsl(var(--background))',
        },
        '::-webkit-scrollbar-thumb': {
          background: 'linear-gradient(135deg, #FF6B6B 0%, #FF2D95 50%, #913D88 100%)',
          borderRadius: '4px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: 'linear-gradient(135deg, #FF5555 0%, #FF1D85 50%, #813378 100%)',
        },
        '.dark ::-webkit-scrollbar-track': {
          background: 'hsl(var(--card))',
        },
        
        // Focus styles for accessibility
        '*:focus-visible': {
          outline: '2px solid hsl(var(--ring))',
          outlineOffset: '2px',
        },
        
        // Selection styles
        '::selection': {
          background: 'hsl(var(--accent))',
          color: 'hsl(var(--accent-foreground))',
        },
        '::-moz-selection': {
          background: 'hsl(var(--accent))',
          color: 'hsl(var(--accent-foreground))',
        },
      });
    },
  ],
};