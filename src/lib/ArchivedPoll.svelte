<script>
  import Card from '$lib/Card.svelte';
  let { poll } = $props();
  // let totalVotes = $derived(poll.votesA + poll.votesB);
</script>

<Card>
  <div class="poll">
    <h3>{ poll.question }</h3>
    <!-- <p>Total votes: { totalVotes }</p> -->
    <div class="answer">
      <div class="percent percent-a"></div>
      <!-- <span>{ poll.answerA } ({ poll.votesA } votes)</span> -->
      <span>abc</span>
    </div>
    <div class="answer">
      <div class="percent percent-b"></div>
      <!-- <span>{ poll.answerB } ({ poll.votesB } votes)</span> -->
      <span>abc</span>
    </div>
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