<script lang="ts">
  import Icon from '../icon/Icon.svelte';

  import { page } from '$app/stores';
  import { config } from '~/app.config';
  import { t } from '~/lib/i18n';

  const url = $page.url.origin;

  const shareKakaotalk = () => {
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: $t('invitation.title'),
        description: config.publicHost,
        imageUrl: `${config.publicHost}/images/intro-text.jpg`,
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: $t('invitation.viewButton'),
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  };
</script>

<div class="flex justify-center py-48">
  <button
    title="Sharing on KakaoTalk"
    class="flex items-center justify-center"
    on:click={shareKakaotalk}
  >
    <Icon name="kakaotalk" size={48} />
  </button>
</div>
