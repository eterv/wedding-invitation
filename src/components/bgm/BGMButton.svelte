<script lang="ts">
  import Icon from '../icon/Icon.svelte';

  export let isPlaying: boolean;
</script>

<button
  class={[
    'flex items-center justify-center',
    'h-40 w-40',
    'rounded-full border-3 border-black3',
  ].join(' ')}
  on:click
>
  {#if isPlaying}
    <Icon name="pause" />
  {:else}
    <Icon name="play" />
  {/if}
</button>
