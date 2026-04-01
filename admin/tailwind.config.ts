import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}", "./index.html"],
  prefix: "",
  theme: {
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
    fontFamily: {
      display: ['"Playfair Display"', "serif"],
      body: ["Poppins", "sans-serif"],
      sans: ["Inter", "Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        pink: { DEFAULT: "hsl(var(--pink))", light: "hsl(var(--pink-light))", dark: "hsl(var(--pink-dark))" },
        gold: { DEFAULT: "hsl(var(--gold))", light: "hsl(var(--gold-light))", dark: "hsl(var(--gold-dark))" },
        yellow: { DEFAULT: "hsl(var(--yellow))", light: "hsl(var(--yellow-light))", dark: "hsl(var(--yellow-dark))" },
        dark: "hsl(var(--dark))",
        "admin-sidebar": {
          DEFAULT: "hsl(var(--admin-sidebar))",
          foreground: "hsl(var(--admin-sidebar-foreground))",
          active: "hsl(var(--admin-sidebar-active))",
          hover: "hsl(var(--admin-sidebar-hover))",
        },
      },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
      keyframes: {
        "fade-in": { from: { opacity: "0", transform: "translateY(8px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        "slide-in": { from: { opacity: "0", transform: "translateX(-12px)" }, to: { opacity: "1", transform: "translateX(0)" } },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
