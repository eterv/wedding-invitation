import { REM, breakpoints, colors } from './config';

import type { ColorsKey } from './defs';
import type { Config } from 'tailwindcss';
import type { ScreensConfig } from 'tailwindcss/types/config';

export type TailwindPresetConfig = Omit<Config, 'content'>;

export * from './config';
export * from './defs';

export const divideItems = {
  ...rangeDivideValues(2, fnDivide),
  ...rangeDivideValues(3, fnDivide),
  ...rangeDivideValues(4, fnDivide),
  ...rangeDivideValues(5, fnDivide),
  ...rangeDivideValues(6, fnDivide),
  ...rangeDivideValues(10, fnDivide),
  ...rangeDivideValues(12, fnDivide),
  ...rangeDivideValues(24, fnDivide),
};

export const spacingPxToRemItems = {
  ...rangeValues(1, 100, 1, fnPxToRem),
  ...rangeValues(104, 200, 4, fnPxToRem),
  ...rangeValues(220, 1000, 20, fnPxToRem),
  ...rangeValues(1040, 2000, 40, fnPxToRem),
  ...toObjectWithPxToRem([256, 512, 1024]),
};

export const screensItems = Object.values(breakpoints).reduce(
  (obj, v) => ({
    ...obj,
    [`<${v}`]: { max: `${v - 0.02}px` },
    [`${v}<`]: { min: `${v}px` },
  }),
  {} as ScreensConfig,
);

export const shadows = toObject<[number, number, number, ColorsKey]>(
  [
    // Example shadow
    [0, 2, 8, 'blackOpacity8'],
  ],

  ([a, b, c, colorKey]) => {
    const a2 = a === 0 ? a : a + 'px';
    const b2 = b === 0 ? b : b + 'px';
    const c2 = c === 0 ? c : c + 'px';

    return {
      [`${a}-${b}-${c}-${colorKey}`]: `${a2} ${b2} ${c2} ${colors[colorKey]}`,
    };
  },
);

// --------------------------------------------------------------------

function round(n: number, place = 0) {
  return +(Math.round(+(n + 'e' + place)) + 'e-' + place);
}

export function fnDivide(n: number, d: number) {
  return { [`${n}/${d}`]: `${round((n / d) * 100, 6)}%` };
}
export function fnPxToRem(n: number) {
  return { [n]: pxToRem(n) };
}

export function pxToRem(px: number) {
  return `${px / REM}rem`;
}

export function range(a: number, b: number, step = 1) {
  const arr = [];

  for (let i = a; i <= b; i += step) {
    arr.push(i);
  }

  return arr;
}

export function rangeValues(
  a: number,
  b: number,
  step = 1,
  fn: (n: number) => Record<number | string, string>,
) {
  return range(a, b, step).reduce(
    (obj, n) => ({ ...obj, ...(fn?.(n) ?? null) }),
    {},
  );
}

export function rangeDivideValues(
  factor: number,
  fn: (n: number, d: number) => Record<number | string, string>,
) {
  return range(1, factor - 1, 1).reduce(
    (obj, n) => ({ ...obj, ...(fn?.(n, factor) ?? null) }),
    {},
  );
}

export function toObject<T>(
  values: T[],
  fn: (v: T) => Record<number | string, string>,
) {
  return values.reduce((obj, v) => ({ ...obj, ...(fn?.(v) ?? null) }), {});
}

export function toObjectWithPxToRem(numbers: number[]) {
  return toObject(numbers, fnPxToRem);
}
