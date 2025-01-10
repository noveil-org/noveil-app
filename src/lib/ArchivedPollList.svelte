<script>
	import ArchivedPoll from "$lib/ArchivedPoll.svelte";
  let polls = $props();
</script>

<div class="poll-list">
  {#each polls as poll (poll.filename)}
    <div>
      <ArchivedPoll poll={poll.content} />
    </div>
  {/each}
</div>

<style>
  .poll-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 0.3fr));
    grid-gap: 40px;
    margin: 20px 40px 20px 40px;
  }
</style>
