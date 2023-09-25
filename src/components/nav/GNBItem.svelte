<script lang="ts">
  import { scrollToElement } from '$lib/utils';

  export let dest: string;
  export let text: string;

  let el;

  const onClick = (e: Event) => {
    const target = e.target as HTMLAnchorElement;
    const dest = target.dataset.dest;
    scrollToElement('#' + dest);
  };
</script>

<button
  bind:this={el}
  class="text-sm flex h-48 flex-1 items-center justify-center text-white"
  data-dest={dest}
  on:click={onClick}
>
  {text}
</button>
