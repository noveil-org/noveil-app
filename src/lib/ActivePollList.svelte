<script>
	import ActivePoll from "$lib/ActivePoll.svelte";
  const { polls, userAddr } = $props();
</script>

<div class="poll-list">
  {#each polls as poll (poll.cid)}
    <div>
      <ActivePoll {poll} {userAddr} />
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
