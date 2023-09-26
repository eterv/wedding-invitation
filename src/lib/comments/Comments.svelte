<script lang="ts">
  import { onMount } from 'svelte';

  import CommentList from './CommentList.svelte';
  import EditModal from './EditModal.svelte';
  import NewForm from './NewForm.svelte';

  import PageContainer from '~/components/container/PageContainer.svelte';

  let element: HTMLDivElement;

  let observer: IntersectionObserver | null = null;
  let newFormVisible: boolean = false;

  onMount(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((_entry) => {
          newFormVisible = _entry.isIntersecting;
        });
      },
      { rootMargin: '0px 0px -300px', threshold: 0 },
    );

    observer.observe(element);

    return () => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    };
  });
</script>

<div id="comment" class="pt-48" bind:this={element}>
  <div class="mb-32 text-center font-bahagia text-28 text-grayC">
    Congratulation
  </div>

  <PageContainer>
    <CommentList />
  </PageContainer>

  <EditModal />

  <NewForm visible={newFormVisible} />
</div>
