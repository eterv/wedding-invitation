<script lang="ts">
  import { onMount } from 'svelte';

  import CommentItem from './CommentItem.svelte';
  import { getComments, type Comment } from './model';

  let comments: Comment[] = [];

  onMount(async () => {
    comments = await getComments();
  });
</script>

<div>
  {#each comments as comment}
    <CommentItem {comment} />
  {/each}
</div>
