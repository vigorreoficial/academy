// ============================================
// VIGORRE ACADEMY™ - DESIGN SYSTEM
// ============================================

export const theme = {
  colors: {
    // Cores principais
    primary: {
      DEFAULT: '#0D2745',
      light: '#1E4D7B',
      dark: '#091A33',
      lighter: '#2A3A6C',
    },
    secondary: {
      DEFAULT: '#2A7BD8',
      light: '#4A9BF8',
      dark: '#1A5BB8',
    },
    gold: {
      DEFAULT: '#D4AF37',
      light: '#E4BF47',
      dark: '#C49F27',
    },
    // Cores de status
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    // Cores neutras
    background: '#F6F8FB',
    surface: '#FFFFFF',
    text: {
      primary: '#0D2745',
      secondary: '#4A6582',
      muted: '#5B7A9A',
      light: '#9BB8D9',
    },
    border: '#E2E8F0',
  },
  typography: {
    fonts: {
      primary: 'Instrument Sans, system-ui, sans-serif',
      heading: 'Plus Jakarta Sans, system-ui, sans-serif',
    },
    sizes: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
      '6xl': '3.75rem',  // 60px
    },
    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
  },
  spacing: {
    xs: '0.25rem',  // 4px
    sm: '0.5rem',   // 8px
    md: '0.75rem',  // 12px
    base: '1rem',   // 16px
    lg: '1.25rem',  // 20px
    xl: '1.5rem',   // 24px
    '2xl': '2rem',  // 32px
    '3xl': '2.5rem', // 40px
    '4xl': '3rem',  // 48px
  },
  radius: {
    sm: '0.375rem',  // 6px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    '2xl': '1.25rem', // 20px
    '3xl': '1.5rem',  // 24px
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },
}

export type Theme = typeof theme

// ============================================
// CLASSES UTILITÁRIAS PARA TAILWIND
// ============================================

export const cn = {
  // Gradientes
  gradient: {
    primary: 'bg-gradient-to-r from-[#0D2745] via-[#1E4D7B] to-[#2A7BD8]',
    gold: 'bg-gradient-to-r from-[#D4AF37] to-[#E4BF47]',
    hero: 'bg-gradient-to-br from-[#0D2745] via-[#14365E] to-[#1E4D7B]',
    card: 'bg-gradient-to-br from-[#0D2745] to-[#2A7BD8]',
  },
  // Texto com gradiente
  textGradient: {
    primary: 'bg-gradient-to-r from-[#1E4D7B] to-[#2A7BD8] bg-clip-text text-transparent',
    gold: 'bg-gradient-to-r from-[#D4AF37] to-[#E4BF47] bg-clip-text text-transparent',
  },
  // Cards
  card: {
    base: 'bg-white rounded-[24px] border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]',
    hover: 'hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.08)] hover:border-[#D4AF37]/30 transition-all duration-300',
    dark: 'bg-[#0D2745] border-white/10 text-white',
  },
  // Botões
  button: {
    primary: 'bg-[#0D2745] hover:bg-[#14365E] text-white shadow-lg shadow-[#0D2745]/20',
    secondary: 'bg-[#2A7BD8] hover:bg-[#1A5BB8] text-white shadow-lg shadow-[#2A7BD8]/20',
    gold: 'bg-[#D4AF37] hover:bg-[#C49F27] text-white shadow-lg shadow-[#D4AF37]/20',
    outline: 'bg-white border border-[#E2E8F0] hover:bg-[#F6F8FB] text-[#0D2745]',
    ghost: 'hover:bg-[#F6F8FB] text-[#0D2745]',
  },
}

// ============================================
// CONSTANTES DE DESIGN
// ============================================

export const DESIGN_CONSTANTS = {
  // Altura do header
  headerHeight: '76px',
  // Largura máxima do container
  containerMaxWidth: '1280px',
  // Padding padrão
  containerPadding: 'px-6 lg:px-8',
  // Transições
  transition: 'transition-all duration-300 ease-in-out',
  // Z-index
  zIndex: {
    dropdown: 50,
    sticky: 100,
    modal: 200,
    toast: 300,
    overlay: 400,
  },
}
