<script lang="ts">
  import { page } from '$app/stores';

  const messages = {
    404: 'Oops! Page Not Found :(',
    500: 'Oops! Server Unavailable :(',
  };
</script>

<section
  class="fixed inset-0 flex h-screen w-screen items-center justify-center text-center"
>
  <div>
    <h1 class="text-[7rem] font-bold">{$page.status}</h1>

    {#if $page.status === 404}
      <div class="text-32 font-light">{messages[$page.status]}</div>
    {/if}
  </div>
</section>
