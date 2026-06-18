import type { Config } from 'tailwindcss';

// 色の実体は app/globals.css の :root（CSS変数）が単一ソース。
// ここでは RGB トリプレット変数を参照し、bg-orange/10 のような不透明度修飾子も使えるようにする。
// 大人ページは [data-tone="adult"] が同じ変数をくすませた値で上書きするため、
// クラス名はそのままで自動的にトーンが切り替わる。
const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        orange: 'rgb(var(--orange-rgb) / <alpha-value>)',
        green: 'rgb(var(--green-rgb) / <alpha-value>)',
        yellow: 'rgb(var(--yellow-rgb) / <alpha-value>)',
        cream: 'rgb(var(--cream-rgb) / <alpha-value>)',
        cocoa: 'rgb(var(--cocoa-rgb) / <alpha-value>)'
      },
      fontFamily: {
        round: 'var(--font-round)',
        body: 'var(--font-body)',
        pop: 'var(--font-pop)'
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        lift: 'var(--shadow-lift)'
      },
      borderRadius: {
        xl: '20px',
        '2xl': '28px',
        '3xl': '36px'
      }
    }
  },
  plugins: []
};

export default config;
