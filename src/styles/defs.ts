import { breakpoints, colors, mobileBreakpoint } from './config';
import { mediaQueryMax, mediaQueryMin } from './utils';

import type { LiteralUnion } from '../types';

export type Colors = typeof colors;
export type ColorsKey = keyof Colors;

export type ExtendedColor = LiteralUnion<ColorsKey, string>;

export type BreakpointsKey = keyof typeof breakpoints;
export type Breakpoints = (typeof breakpoints)[BreakpointsKey];

export type ScreenItemKey<T extends number> = `<${T}` | `${T}<`;
export type ScreenItemsKey = ScreenItemKey<Breakpoints>;

export const colorsKeys = Object.keys(colors) as ColorsKey[];

export const screens = {
  mobile: mediaQueryMax(mobileBreakpoint),

  max: Object.keys(breakpoints).reduce(
    (prev, key) => ({
      ...prev,
      [key]: mediaQueryMax(breakpoints[key as BreakpointsKey]),
    }),
    {} as Record<BreakpointsKey, string>,
  ),

  min: Object.keys(breakpoints).reduce(
    (prev, key) => ({
      ...prev,
      [key]: mediaQueryMin(breakpoints[key as BreakpointsKey]),
    }),
    {} as Record<BreakpointsKey, string>,
  ),
} as const;
