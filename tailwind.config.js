module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      primary: 'Poppins',
      secondary: 'Alegreya',
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        lg: '2rem',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1234px',
    },
    extend: {
      colors: {
        primary: '#101828',
        secondary: '#7F56D9',
      },
      boxShadow: {
        1: '0px 4px 30px rgba(0, 0, 0, 0.08)',
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
      spin: {
        '100%': {
          transform: 'rotate(360deg)',
        },
      },
      pulse: {
        '0%, 100%': {
          opacity: 1,
        },
        '50%': {
          opacity: 0.5,
        },
      },
    },
    animation: {
      spin: 'spin 1s linear infinite',
      pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
