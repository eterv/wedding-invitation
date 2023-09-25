<script lang="ts">
  import { onMount } from 'svelte';

  import { icons, type IconName, type IconDefinition } from './icons';

  export let name: IconName;
  export let color: string = 'current';
  export let size = 24;

  const defaultIcon: IconDefinition = {
    data: '',
    viewBoxSize: 24,
  };

  let icon: IconDefinition = { ...defaultIcon };

  onMount(async () => {
    const importFn = icons[name];

    if (typeof importFn === 'function') {
      icon = { ...defaultIcon, ...(await icons[name]()).default };
    }
  });
</script>

<svg
  class={$$props.class}
  width={size}
  height={size}
  viewBox={`0 0 ${icon?.viewBoxSize} ${icon?.viewBoxSize}`}
  fill={icon?.useStrokeColor ? undefined : color}
  stroke={icon?.useStrokeColor ? color : undefined}
  xmlns="http://www.w3.org/2000/svg"
>
  {@html icon?.data}
</svg>
