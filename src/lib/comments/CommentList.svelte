<script lang="ts">
  import { onMount } from 'svelte';

  import CommentItem from './CommentItem.svelte';
  import { getComments } from './model';
  import { comments } from './store';

  onMount(async () => {
    $comments = await getComments();
  });
</script>

<div>
  {#each $comments as comment ((comment.id, comment.name, comment.body))}
    <CommentItem {comment} />
  {/each}
</div>
