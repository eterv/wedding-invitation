<script lang="ts">
  import { addComment, type Comment } from './model';

  import type { Union } from '~/types';

  import { t } from '$lib/i18n';
  import Icon from '~/components/icon/Icon.svelte';

  export let visible = false;

  const fieldNames = ['name', 'password', 'body'] as const;
  type FieldName = Union<typeof fieldNames>;

  let fields: Record<
    FieldName,
    {
      element?: HTMLInputElement | HTMLTextAreaElement;
      value: string;
    }
  > = {
    name: { value: '' },
    password: { value: '' },
    body: { value: '' },
  };

  const send = async () => {
    // Validate fields
    fieldNames.every((field) => {
      if (fields[field].value.trim() === '') {
        alert($t('validator.empty', { field: $t(`field.${field}`) }));
        fields[field].element?.focus();
        return false;
      }

      return true;
    });

    const data = Object.entries(fields).reduce(
      (obj, [name, { value }]) => ({ ...obj, [name]: value }),
      {},
    ) as Pick<Comment, 'name' | 'password' | 'body'>;

    await addComment(data);
  };
</script>

<section class:on={visible}>
  <input
    type="text"
    required
    maxlength="50"
    placeholder={$t('field.name')}
    bind:this={fields.name.element}
    bind:value={fields.name.value}
  />
  <input
    type="password"
    required
    maxlength="20"
    placeholder={$t('field.password')}
    bind:this={fields.password.element}
    bind:value={fields.password.value}
  />

  <div class="col-span-2 flex">
    <textarea
      class="text-15"
      required
      maxlength="500"
      placeholder={$t('field.body.placeholder')}
      rows="4"
      bind:this={fields.body.element}
      bind:value={fields.body.value}
    />

    <button class="ml-8 rounded-4 bg-lightBlue px-16" on:click={send}>
      <Icon name="send" color="white" />
    </button>
  </div>
</section>

<style>
  section {
    @apply fixed inset-0 top-auto z-10 p-16;
    @apply grid grid-cols-2 gap-8;
    @apply border-t border-grayE bg-white;
    @apply origin-bottom scale-y-0 duration-300;
  }
  section.on {
    @apply scale-y-100;
  }
</style>
