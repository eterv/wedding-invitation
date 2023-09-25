export const icons = {
  call: () => import('./call'),
  close: () => import('./close'),
  heart: () => import('./heart'),
  kakaotalk: () => import('./kakaotalk'),
  location: () => import('./location'),
  pause: () => import('./pause'),
  play: () => import('./play'),
  send: () => import('./send'),
  youtube: () => import('./youtube'),
} as const;

export interface IconDefinition {
  data: string;
  useStrokeColor?: boolean;
  viewBoxSize?: number;
}

export type IconName = keyof typeof icons;
