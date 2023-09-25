<script lang="ts">
  import Person from './Person.svelte';

  import { PageContainer } from '~/components/container';
  import Icon from '~/components/icon/Icon.svelte';
</script>

<PageContainer>
  <div class="flex justify-center gap-20 py-48">
    <Person role="groom" />
    <Icon name="heart" color="#e5c0ba" class="mt-36 h-32 w-32" />
    <Person role="bride" />
  </div>
</PageContainer>
