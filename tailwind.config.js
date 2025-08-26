/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  plugins: [
    require("tailwindcss-animate"),
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