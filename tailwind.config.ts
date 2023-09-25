/**
 * References) Tailwindcss default config
 * https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js
 */

import {
  colors,
  divideItems,
  fnPxToRem,
  spacingPxToRemItems,
  screensItems,
  rangeValues,
  pxToRem,
  shadows,
  toObject,
} from './src/styles/tailwind';

import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],

  theme: {
    colors,
    // ex) <720:m-20, 1280<:w-40, ...
    screens: screensItems,
    spacing: { 0: '0', ...spacingPxToRemItems },

    // aspect-*
    aspectRatio: {
      auto: 'auto',
      '1/2': '1 / 2',
      '1/1': '1',
      '2/1': '2 / 1',
      '3/2': '3 / 2',
      '4/3': '4 / 3',
      '16/9': '16 / 9',
    },

    // backdrop-blur-*
    // backdrop-filter: blur(x)
    backdropBlur: {
      ...rangeValues(2, 20, 2, fnPxToRem),
    },

    // bg-opacity-*
    backgroundOpacity: ({ theme }) => theme('opacity'),

    // blur-*
    // filter: blur(x)
    blur: {
      ...rangeValues(2, 20, 2, fnPxToRem),
    },

    // rounded-*
    borderRadius: {
      0: '0',
      ...rangeValues(2, 100, 2, fnPxToRem),
      '50%': '50%',
      full: '9999px',
    },
    // border-*
    borderWidth: {
      DEFAULT: pxToRem(1),
      0: '0',
      ...rangeValues(1, 20, 1, fnPxToRem),
    },

    // shadow-*
    // box-shadow: x
    boxShadow: {
      // Tailwind default
      DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      none: 'none',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',

      ...shadows,

      // Custom for service (Legacy)
      // inner: 'inset 0px 1px 2px rgba(0, 0, 0, 0.16)',
    },

    // drop-shadow-*
    // filter: drop-shadow(x)
    dropShadow: {
      // Tailwind default
      none: '0 0 #0000',
      lg: ['0 10px 8px rgb(0 0 0 / 0.04)', '0 4px 3px rgb(0 0 0 / 0.1)'],
      xl: ['0 20px 13px rgb(0 0 0 / 0.03)', '0 8px 5px rgb(0 0 0 / 0.08)'],

      ...shadows,
    },

    // basis-*
    flexBasis: ({ theme }) => ({
      ...theme('spacing'),
      ...divideItems,
      auto: 'auto',
      full: '100%',
    }),

    // font-* (now unused)
    fontFamily: {
      bahagia: ['Bahagia', 'sans-serif'],
    },
    // text-* (used, but not recommended)
    fontSize: {
      10: ['0.625rem', { lineHeight: '0.9375rem' }],
      12: ['0.75rem', { lineHeight: '1.125rem' }],
      13: ['0.8125rem', { lineHeight: '1.125rem' }],
      14: ['0.875rem', { lineHeight: '1.25rem' }],
      15: ['0.9375rem', { lineHeight: '1.375rem' }],
      16: ['1rem', { lineHeight: '1.5rem' }],
      18: ['1.125rem', { lineHeight: '1.6875rem' }],
      20: ['1.25rem', { lineHeight: '1.875rem' }],
      24: ['1.5rem', { lineHeight: '2.25rem' }],
      28: ['1.75rem', { lineHeight: '2.625rem' }],
      32: ['2rem', { lineHeight: '3rem' }],
    },
    // font-*
    fontWeight: {
      light: '300',
      regular: '400',
      medium: '500',
      bold: '700',
    },

    // {gap|gap-x|gap-y}-*
    gap: ({ theme }) => theme('spacing'),

    // TODO: need to figure out the best way for `grid`.

    // h-*
    height: ({ theme }) => ({
      ...theme('spacing'),
      ...divideItems,
      auto: 'auto',
      fit: 'fit-content',
      full: '100%',
      max: 'max-content',
      min: 'min-content',
      screen: '100vh',
      'screen-1/2': '50vh',
      'screen-1/3': '33.33vh',
      'screen-2/3': '66.66vh',
      'screen-1/4': '25vh',
      'screen-3/4': '75vh',
      'screen-1/5': '20vh',
      'screen-2/5': '40vh',
      'screen-3/5': '60vh',
      'screen-4/5': '80vh',
    }),

    // {inset|inset-x|inset-y|top|right|bottom|left}-*
    inset: ({ theme }) => ({
      ...theme('spacing'),
      ...divideItems,
      auto: 'auto',
      full: '100%',
    }),

    // tracking-* (unused)
    letterSpacing: {},

    // leading-*
    lineHeight: {
      ...rangeValues(4, 100, 4, fnPxToRem),
      ...rangeValues(80, 200, 10, (n) => ({ [n + '%']: `${n / 100}` })),
      none: '1',
    },

    // {m|mx|my|mt|mr|mb|ml}-*
    margin: ({ theme }) => ({
      ...theme('spacing'),
      auto: 'auto',
    }),

    // max-h-*
    maxHeight: ({ theme }) => ({
      ...theme('spacing'),
      fit: 'fit-content',
      full: '100%',
      max: 'max-content',
      min: 'min-content',
      screen: '100vh',
      'screen-1/2': '50vh',
    }),
    // max-w-*
    maxWidth: ({ theme }) => ({
      ...theme('spacing'),
      ...divideItems,
      auto: 'auto',
      fit: 'fit-content',
      full: '100%',
      max: 'max-content',
      min: 'min-content',
      none: 'none',
      screen: '100vw',
    }),
    // min-h-*
    minHeight: ({ theme }) => theme('maxHeight'),
    // min-w-*
    minWidth: ({ theme }) => theme('maxWidth'),

    // opacity-*
    opacity: {
      ...rangeValues(0, 100, 5, (n) => ({ [n]: `${n / 100}` })),
    },

    // TODO: need to figure out the best way for `outline`.

    // {p|px|py|pt|pr|pb|pl}-*
    padding: ({ theme }) => theme('spacing'),

    // TODO: need to figure out the best way for css `transform`, `filter`.

    // underline-offset-*
    textUnderlineOffset: {
      auto: 'auto',
      0: '0',
      ...toObject([1, 2, 4, 8], fnPxToRem),
    },

    // duration-*
    transitionDuration: {
      DEFAULT: '150ms',
      ...rangeValues(0, 1000, 50, (n) => ({ [n]: `${n}ms` })),
    },
    // transition-*
    transitionProperty: {
      DEFAULT:
        'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
      all: 'all',
      colors:
        'color, background-color, border-color, text-decoration-color, fill, stroke',
      'colors-transform':
        'background-color, border-color, color, fill, stroke, transform',
      none: 'none',
      opacity: 'opacity',
      shadow: 'box-shadow',
      transform: 'transform',
    },

    // translate-{x|y}-*
    translate: ({ theme }) => ({
      ...theme('spacing'),
      ...divideItems,
      full: '100%',
    }),

    // w-*
    width: ({ theme }) => ({
      ...theme('spacing'),
      ...divideItems,
      auto: 'auto',
      fit: 'fit-content',
      full: '100%',
      max: 'max-content',
      min: 'min-content',
      screen: '100vw',
    }),

    // z-*
    zIndex: {
      ...rangeValues(0, 9, 1, (n) => ({ [n]: `${n}` })),
      ...rangeValues(10, 100, 10, (n) => ({ [n]: `${n}` })),
      ...toObject([99, 999, 9999, 10000], (n) => ({ [n]: `${n}` })),
      auto: 'auto',
    },

    extend: {
      animation: {
        //'pulse-2': 'pulse-2 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

      keyframes: {
        // 'pulse-2': {
        //   '50%': { opacity: '0.4' },
        // },
      },
    },
  },

  // For prevent purging
  safelist: [
    //
  ],
} satisfies Config;
