<script lang="ts">
  import { lang, t } from '$lib/i18n';
  import { config } from '~/app.config';
  import GNB from '~/components/nav/GNB.svelte';

  import '~/styles/base.css';

  const ogUrl =
    $lang === 'ko' ? config.publicHost : config.publicHost + `/${$lang}`;
</script>

<svelte:head>
  <meta property="og:description" content={$t('og.desc')} />
  <meta property="og:locale" content={$t('locale')} />
  <meta property="og:site_name" content="GW & HI - Wedding Invitation" />
  <meta property="og:title" content={$t('og.title')} />
  <meta
    property="og:image"
    content={`${config.publicHost}/images/intro/intro.jpg`}
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={ogUrl} />

  <title>{$t('title')}</title>
</svelte:head>

<header class="sticky left-0 right-0 top-0 z-10">
  <GNB />
</header>

<main class="relative mx-auto max-w-800 bg-white">
  <slot />
</main>

<footer class="bg-black3 pb-240 pt-48 text-center text-13 text-gray6">
  <div>Made by eterv</div>
  <div class="copyright">Copyright ⓒ 2020~ GW & HI, wedding.eterv.com</div>
</footer>
