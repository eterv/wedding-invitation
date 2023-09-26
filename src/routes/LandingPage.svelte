<script lang="ts">
  import Comments from '$lib/comments/Comments.svelte';
  import BGM from '~/components/bgm/BGM.svelte';
  import Gallery from '~/components/gallery/Gallery.svelte';
  import Headline from '~/components/headline/Headline.svelte';
  import CoupleInfo from '~/components/invitation/CoupleInfo.svelte';
  import Location from '~/components/invitation/Location.svelte';
  import Message from '~/components/invitation/Message.svelte';
  import Notice from '~/components/invitation/Notice.svelte';
  import Share from '~/components/share/Share.svelte';
</script>

<div id="top" />

<Headline />
<BGM />

<Gallery />
<Message />
<CoupleInfo />

<Location />
<Notice />

<Comments />

<Share />
