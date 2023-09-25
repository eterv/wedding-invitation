<script lang="ts">
  export let appName: string;
</script>

<button class="h-48 w-48 overflow-hidden rounded-8" on:click>
  <img alt={appName} src={`/images/icons/app/${appName}.png`} />
</button>
