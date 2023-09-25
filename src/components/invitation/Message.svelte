<script lang="ts">
  import PageContainer from '../container/PageContainer.svelte';

  import { t } from '~/lib/i18n';
</script>

<div class="bg-whiteF2 py-48 text-center">
  <PageContainer>
    <div class="pb-4 text-20 italic tracking-[.5rem] text-gray9">
      {$t('message.title')}
    </div>

    <div class="mx-auto my-16 h-1 w-72 bg-grayD"></div>

    <div class="leading-160%">
      {@html $t('message.content')}
    </div>

    <div class="mx-auto my-16 h-1 w-72 bg-grayD"></div>

    <div class="pt-4 text-20 font-bold leading-150%">
      <div class="text-28">{$t('info.date')}</div>
      <div class="text-24">{$t('info.time')}</div>
    </div>
    <div class="mt-24">
      <div class="text-24">{$t('info.place')}</div>
      <div class="text-20">{$t('info.place2')}</div>
    </div>

    <div class="mx-auto my-24 h-1 w-72 bg-grayD"></div>

    <div class="leading-150%">
      <div>
        {@html $t('message.desc')}
      </div>
      <div class="mt-16 text-14">
        {@html $t('message.desc2')}
      </div>
    </div>
  </PageContainer>
</div>
