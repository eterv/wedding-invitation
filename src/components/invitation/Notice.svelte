<script lang="ts">
  import PageContainer from '../container/PageContainer.svelte';
  import Icon from '../icon/Icon.svelte';

  import { t } from '~/lib/i18n';
  import { openWithNewTab } from '~/lib/utils';

  const openZoom = () => {
    const zoomUrl =
      'https://us02web.zoom.us/j/6276272020?pwd=V1B4VmNqZ1FFRmRqUThaemhQWnU2QT09';
    openWithNewTab(zoomUrl);
  };
</script>

<div class="break-keep bg-black3 py-48 text-center text-gray6">
  <PageContainer>
    <div class="text-15 leading-160%">
      <div>
        {@html $t('notice.desc1')}
      </div>
      <div class="mt-8">
        {@html $t('notice.desc2')}
      </div>

      <div class="mx-auto mt-8 max-w-200 text-left">
        <div class="flex">
          <span class="flex-1">Zoom ID</span>
          <span class="flex-1">{$t('info.zoomId')}</span>
        </div>
        <div class="flex">
          <span class="flex-1">{$t('field.password')}</span>
          <span class="flex-1">XXXXXX</span>
        </div>
      </div>

      <div class="mt-20 flex justify-center">
        <button
          class="flex items-center justify-center gap-8 rounded-8 bg-[#a5aab2] px-20 py-10 text-black3"
          on:click={openZoom}
        >
          <Icon name="youtube" color="#31343c" />
          {$t('notice.enterZoom')}
        </button>
      </div>
    </div>
  </PageContainer>
</div>
