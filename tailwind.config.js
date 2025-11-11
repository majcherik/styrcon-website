/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx}',
    './src/hooks/**/*.{js,ts,jsx,tsx}',
    './src/utils/**/*.{js,ts,jsx,tsx}',
    './src/contexts/**/*.{js,ts,jsx,tsx}',
    './src/types/**/*.{js,ts,jsx,tsx}',
    './node_modules/preline/preline.js',
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("preline/plugin"),
    require("@heroui/theme")({
      themes: {
        "styrcon-light": {
          colors: {
            background: "#ffffff",
            foreground: "#0f172a",
            primary: {
              DEFAULT: "#0ea5e9",
              foreground: "#ffffff"
            },
            secondary: {
              DEFAULT: "#ff7700",
              foreground: "#ffffff"
            },
            success: {
              DEFAULT: "#10b981",
              foreground: "#ffffff"
            },
            warning: {
              DEFAULT: "#f59e0b",
              foreground: "#ffffff"
            },
            danger: {
              DEFAULT: "#ef4444",
              foreground: "#ffffff"
            }
          }
        },
        "styrcon-dark": {
          colors: {
            background: "#0f172a",
            foreground: "#f1f5f9",
            primary: {
              DEFAULT: "#0ea5e9",
              foreground: "#ffffff"
            },
            secondary: {
              DEFAULT: "#ff7700",
              foreground: "#ffffff"
            },
            success: {
              DEFAULT: "#10b981",
              foreground: "#ffffff"
            },
            warning: {
              DEFAULT: "#f59e0b",
              foreground: "#ffffff"
            },
            danger: {
              DEFAULT: "#ef4444",
              foreground: "#ffffff"
            }
          }
        }
      },
      defaultTheme: "styrcon-light"
    })
  ]
}