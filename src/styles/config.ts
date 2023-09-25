// Prime rule :: Mobile-first development/publishing

/** 1rem = 16px */
export const REM = 16;

export const breakpoints = {
  bp320: 320,
  bp768: 768,
  bp1024: 1024,
  bp1440: 1440,
} as const;
export const mobileBreakpoint = breakpoints.bp768;

export const colors = {
  current: 'currentColor',
  transparent: 'transparent',

  /** ? */
  primary: '#',

  /** #1E2228 */
  black1: '#1E2228',
  /** #31343C */
  black3: '#31343C',
  /** #41444C */
  black4: '#41444C',
  /** #5B5C61 */
  darkGray: '#5B5C61',
  /** #8A8C91 */
  mediumGray: '#8A8C91',
  /** #B8BCC0 */
  gray: '#B8BCC0',
  /** #E8EAED */
  lightGray: '#E8EAED',
  /** #FFFFFF */
  white: '#FFFFFF',

  /** #62666b */
  gray6: '#62666b',
  /** #999 */
  gray9: '#999',
  /** #aaa */
  grayA: '#aaa',
  /** #bbb */
  grayB: '#bbb',
  /** #ccc */
  grayC: '#ccc',
  /** #ddd */
  grayD: '#ddd',
  /** #eee */
  grayE: '#eee',

  /** #f2f2f2 */
  whiteF2: '#f2f2f2',
  /** #f5f5f5 */
  whiteF5: '#f5f5f5',

  /** #65b0d9 */
  lightBlue: '#65b0d9',

  /** #D7000D */
  alertRed: '#D7000D',
  /** #4CC92C */
  alertGreen: '#4CC92C',

  blackOpacity8: 'rgba(0 0 0 / 0.08)',
  blackOpacity72: 'rgba(0 0 0 / 0.72)',
} as const;
