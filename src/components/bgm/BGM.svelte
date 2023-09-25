<script lang="ts">
  import BGMButton from './BGMButton.svelte';

  let bgm: HTMLAudioElement;

  let isPlaying = false;

  const onClick = () => {
    isPlaying ? pause() : play();
  };

  const play = () => {
    try {
      bgm.play();
      isPlaying = true;
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
      isPlaying = false;
    }
  };

  const pause = () => {
    try {
      bgm.pause();
    } finally {
      isPlaying = false;
    }
  };
</script>

<div class="my-40">
  <audio bind:this={bgm} src="/bgm/bgm1.mp3" preload="auto" loop></audio>

  <div class="flex items-center justify-center" class:isPlaying>
    <BGMButton {isPlaying} on:click={onClick} />
  </div>
</div>
