<script lang="ts">
  import { onDestroy } from 'svelte';

  import { deleteComment, updateComment, type Comment } from './model';
  import { comments, editModalVisible, editingComment } from './store';

  import type { Union } from '~/types';

  import { WrongPasswordError } from '$lib/error';
  import { t } from '$lib/i18n';
  import Icon from '~/components/icon/Icon.svelte';

  let dialog: HTMLDialogElement;

  const fieldNames = ['id', 'name', 'password', 'body'] as const;
  const fieldNames2 = ['name', 'password', 'body'] as const;
  type FieldName = Union<typeof fieldNames>;

  let fields: Record<
    FieldName,
    {
      element?: HTMLInputElement | HTMLTextAreaElement;
      value: string;
    }
  > = {
    id: { value: '' },
    name: { value: '' },
    password: { value: '' },
    body: { value: '' },
  };

  let unsubscribeEditingComment = editingComment.subscribe((value) => {
    for (let key in fields) {
      const key2 = key as FieldName;
      fields[key2].value = value?.[key2] || '';
    }

    fields.password.value = '';
  });

  $: if (dialog && $editModalVisible) dialog.showModal();

  const close = () => {
    dialog.close();
    $editModalVisible = false;
  };

  const _delete = async () => {
    if (fields.password.value.trim() === '') {
      alert($t('validator.empty', { field: $t('field.password') }));
      fields.password.element?.focus();
      return false;
    }

    try {
      await deleteComment(fields.id.value, fields.password.value);

      comments.update((prev) => {
        return prev.filter((item) => item.id !== fields.id.value);
      });
      close();
    } catch (err) {
      if (err instanceof WrongPasswordError) {
        alert($t('validator.wrong', { field: $t('field.password') }));
        fields.password.element?.focus();
      }
    }
  };

  const edit = async () => {
    // Validate fields
    const isValid = fieldNames2.every((fieldName) => {
      if (fields[fieldName].value.trim() === '') {
        alert($t('validator.empty', { field: $t(`field.${fieldName}`) }));
        fields[fieldName].element?.focus();
        return false;
      }

      return true;
    });
    if (!isValid) return;

    const data = Object.entries(fields).reduce(
      (obj, [name, { value }]) => ({ ...obj, [name]: value }),
      {},
    ) as Pick<Comment, 'id' | 'name' | 'password' | 'body'>;

    try {
      const updatedComment = await updateComment(data);

      comments.update((prev) => {
        return prev.map((item) => {
          if (item.id === fields.id.value) {
            item.name = updatedComment.name;
            item.body = updatedComment.body;
            item.updatedAt = updatedComment.updatedAt;
          }
          return item;
        });
      });

      close();
    } catch (err) {
      if (err instanceof WrongPasswordError) {
        alert($t('validator.wrong', { field: $t('field.password') }));
        fields.password.element?.focus();
      }
    }
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
          maxlength="50"
          placeholder={$t('field.name')}
          bind:this={fields.name.element}
          bind:value={fields.name.value}
        />
        <input
          type="password"
          maxlength="20"
          placeholder={$t('field.password')}
          bind:this={fields.password.element}
          bind:value={fields.password.value}
        />
        <textarea
          class="w-full text-15"
          maxlength="500"
          placeholder={$t('field.body.placeholder')}
          rows="4"
          bind:this={fields.body.element}
          bind:value={fields.body.value}
        />

        <div class="flex gap-12">
          <button class="cmd w-1/3 border border-grayC" on:click={_delete}>
            {$t('command.delete')}
          </button>
          <button class="cmd flex-1 bg-lightBlue text-white" on:click={edit}>
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
