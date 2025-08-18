/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@heroui/theme")({
    themes: {
      "styrcon-light": {
        layout: {
          disabledOpacity: "0.3",
          radius: {
            small: "4px",
            medium: "6px", 
            large: "8px"
          },
          borderWidth: {
            small: "1px",
            medium: "2px",
            large: "3px"
          }
        },
        colors: {
          background: "#ffffff",
          foreground: "#0f172a",
          primary: {
            DEFAULT: "#0ea5e9", // STYRCON blue
            foreground: "#ffffff"
          },
          secondary: {
            DEFAULT: "#ff7700", // STYRCON orange
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
          },
          default: {
            DEFAULT: "#f1f5f9",
            foreground: "#0f172a"
          }
        }
      },
      "styrcon-dark": {
        layout: {
          disabledOpacity: "0.3",
          radius: {
            small: "4px",
            medium: "6px",
            large: "8px"
          },
          borderWidth: {
            small: "1px",
            medium: "2px", 
            large: "3px"
          }
        },
        colors: {
          background: "#0f172a",
          foreground: "#f1f5f9",
          primary: {
            DEFAULT: "#0ea5e9", // Same STYRCON blue
            foreground: "#ffffff"
          },
          secondary: {
            DEFAULT: "#ff7700", // Same STYRCON orange
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
          },
          default: {
            DEFAULT: "#334155",
            foreground: "#f1f5f9"
          }
        }
      }
    },
    defaultTheme: "styrcon-light",
    addCommonColors: false
  })],
}