const mediaQueryPrefix = '@media only screen and ';

export const mediaQueryMin = (min: number) =>
  `${mediaQueryPrefix}(min-width: ${min}px)`;
export const mediaQueryMax = (max: number) =>
  `${mediaQueryPrefix}(max-width: ${max - 0.02}px)`;
export const mediaQueryRange = (min: number, max: number) =>
  `${mediaQueryPrefix}(min-width: ${min}px) and (max-width: ${max - 0.02}px)`;
