/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/dist/tailwind')],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        foreground: 'var(--color-foreground)',
        primary: 'var(--color-primary)',
        'on-primary': 'var(--color-on-primary)',
        border: 'var(--color-border)',
      },
    },
  },
};
