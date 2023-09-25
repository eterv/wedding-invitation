<script lang="ts">
  import { onDestroy } from 'svelte';

  import { editModalVisible, editingComment } from './store';

  import type { Comment } from './model';

  import { t } from '$lib/i18n';
  import Icon from '~/components/icon/Icon.svelte';

  let dialog: HTMLDialogElement;
  let comment: Comment;

  let unsubscribeEditingComment = editingComment.subscribe((value) => {
    comment = { ...value, password: '' };
  });

  $: if (dialog && $editModalVisible) dialog.showModal();

  const close = () => {
    dialog.close();
    $editModalVisible = false;
  };

  onDestroy(() => {
    unsubscribeEditingComment();
  });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialog}
  on:close={close}
  on:click|self={close}
  class="w-full max-w-720 rounded-8 border-0"
>
  <div class="flex items-center justify-center">
    <div class="m-20 w-full rounded-10 bg-white p-10">
      <div class="flex">
        <button class="ml-auto rounded-8 hover:bg-whiteF5" on:click={close}>
          <Icon name="close" size={32} />
        </button>
      </div>

      <div class="grid gap-12 px-4 py-20">
        <input
          type="text"
          bind:value={comment.name}
          maxlength="50"
          placeholder={$t('field.name')}
        />
        <input
          type="password"
          maxlength="20"
          placeholder={$t('field.password')}
          bind:value={comment.password}
        />
        <textarea
          class="w-full text-15"
          maxlength="500"
          placeholder={$t('field.body.placeholder')}
          rows="4"
          bind:value={comment.body}
        />

        <div class="flex gap-12">
          <button class="cmd w-1/3 border border-grayC">
            {$t('command.delete')}
          </button>
          <button class="cmd flex-1 bg-lightBlue text-white">
            {$t('command.edit')}
          </button>
        </div>
      </div>
    </div>
  </div>
</dialog>

<style>
  dialog::backdrop {
    @apply bg-blackOpacity72;
  }

  dialog[open],
  dialog[open]::backdrop {
    animation: fade-in 0.25s ease-out;
  }

  button.cmd {
    @apply rounded-4 p-12 text-center text-15;
  }
</style>
