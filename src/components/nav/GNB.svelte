<script lang="ts">
  import GNBItem from './GNBItem.svelte';
</script>

<nav id="gnb" class="flex w-full border-b border-black4 bg-black3">
  <GNBItem dest="top" text="HOME" />
  <GNBItem dest="gallery" text="PHOTO" />
  <GNBItem dest="location" text="MAP" />
  <GNBItem dest="comment" text="MESSAGE" />
</nav>
