import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        customWhiteBlue: '#AEE4FF',
        customSmothBlue: '#6A9CFD',
      },
      screens: {
        'iphone-se': '320px', // iPhone SE (1세대 및 2세대)
        'iphone-8': '375px', // iPhone 8, iPhone SE (3세대)
        'iphone-12': '390px', // iPhone 12, 12 Pro
        'iphone-12-pro-max': '428px', // iPhone 12 Pro Max, 13 Pro Max
        'ipad-mini': '768px', // iPad Mini
        'ipad-pro': '1024px', // iPad Pro 11인치
        'ipad-pro-12-9': '1366px', // iPad Pro 12.9인치

        'pixel-4': '411px', // Google Pixel 4
        'pixel-5': '393px', // Google Pixel 5
        'galaxy-s10': '360px', // Samsung Galaxy S10
        'galaxy-s20': '412px', // Samsung Galaxy S20
        'galaxy-note20': '412px', // Samsung Galaxy Note 20
        'galaxy-tab': '800px', // Samsung Galaxy Tab

        'mobile-base': '500px',
      },
    },
  },

  plugins: [],
};
export default config;
