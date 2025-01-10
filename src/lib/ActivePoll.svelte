<script>
  import Card from '$lib/Card.svelte';
	import { vote } from './vote';
  let { poll, userAddr } = $props();
</script>

<Card>
  <div class="poll">
    <h3>{ poll.question }</h3>
    {#each poll.choices as choice, index}
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div class="answer" onclick={() => vote(index, poll.cid, userAddr)}>
        <div class="percent percent-a"></div>
        <span>{ choice }</span>
      </div>
    {/each}
  </div>
</Card>

<style>
  h3 {
    margin: 0 auto;
    color: #131418;
  }
  p {
    margin-top: 6px;
    font-size: 14px;
    color: #24262E;
    margin-bottom: 30px;
  }
  .answer {
    background: #E7D6FF;
    cursor: pointer;
    margin: 10px auto;
    position: relative;
  }
  .answer:hover {
    opacity: 0.6;
  }
  span {
    display: inline-block;
    padding: 10px 20px;
  }
</style>