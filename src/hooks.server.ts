import type { Handle } from '@sveltejs/kit';

import { getLangFromUrl } from '$lib/i18n';

export const handle: Handle = ({ event, resolve }) => {
  const lang = getLangFromUrl(event.url);

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%lang%', lang),
  });
};
