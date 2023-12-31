// import cloudflareAdapter from '@sveltejs/adapter-cloudflare';
import vercelAdapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    alias: {
      '~': 'src',
    },

    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.

    // adapter: cloudflareAdapter({
    //   routes: {
    //     include: ['/*'],
    //     exclude: ['<all>'],
    //   },
    // }),

    adapter: vercelAdapter({
      runtime: 'nodejs18.x',
      regions: ['pdx1'], // Portland, USA
    }),
  },
};

export default config;
