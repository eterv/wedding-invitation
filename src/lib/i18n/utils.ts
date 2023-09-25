import { derived } from 'svelte/store';

import { defaultLanguage, translations, type TranslationKey } from './config';

import { page } from '$app/stores';

// let url: URL;
// page.subscribe((page) => {
//   url = page.url;
// });

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in translations) return lang as keyof typeof translations;
  return defaultLanguage;
}

export function useTranslation(url: URL) {
  const lang = getLangFromUrl(url);

  return {
    lang,
    t: (key: TranslationKey) =>
      (translations[lang] as any)[key] || translations[defaultLanguage][key],
  };
}

export const lang = derived(page, ($page) => getLangFromUrl($page.url));

export const t = derived(lang, ($lang) => {
  return (key: TranslationKey, vars?: Record<string, any>): string => {
    const translatedValue: string =
      (translations[$lang] as any)[key] || translations[defaultLanguage][key];

    if (vars == null) return translatedValue;

    return Object.entries(vars).reduce(
      (str, [key, value]) => str.replaceAll(`{${key}}`, value),
      translatedValue,
    );
  };
});
