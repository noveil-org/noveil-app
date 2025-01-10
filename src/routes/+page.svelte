<script lang="ts">
  import Tabs from "$lib/Tabs.svelte";
  import { idenaLogin } from '$lib/auth';
	import { onMount } from "svelte";
	import { PUBLIC_APP_BASE_URL, PUBLIC_AUTH_SERVER_URL } from "$env/static/public";
	import ArchivedPollList from "$lib/ArchivedPollList.svelte";
	import ActivePollList from "$lib/ActivePollList.svelte";
	import { createLocalStorageStore } from "$lib/utils";
	import { IdenaUserStatus } from "$lib/idena";

  let userToken = createLocalStorageStore("userToken");
  let userAddr = createLocalStorageStore("userAddr");
  let userPrivilege = createLocalStorageStore("privilage");
  // let items = $state(["Active Polls", "Archived Polls", "Authenticate"]);
  let items = $state(["Active Polls", "Authenticate"]);
  let activeItem = $state(items[0]);

  let { data } = $props();
  function tabChange(e: string) {
    activeItem = e;
  }

  async function idenaLogout(token: string | null) {
    let resp = await fetch(`${PUBLIC_AUTH_SERVER_URL}/v1/logout`, {
      method: 'POST',
      body: JSON.stringify({ token: token }),
    });
    userToken.set(null);
    userAddr.set(null);
    userPrivilege.set(null);
  }

  onMount(async () => {
    if (!$userToken) {
      userToken.set(crypto.randomUUID());
    }
    let token = $userToken;
    if (token) {
      let resp = await fetch(`${PUBLIC_APP_BASE_URL}/api/auth/${token}`);
      let data = await resp.json();
      if (data.success) {
        userAddr.set(data.address);
        userPrivilege.set(data.state);
      }
    }
    if (!$userAddr) {
      userPrivilege.set(IdenaUserStatus[IdenaUserStatus.Undefined]);
    }
  })
</script>

<main>
  <Tabs items={items} activeItem={activeItem} tabChange={tabChange} />
  {#if activeItem === items[0]}
    <ActivePollList polls={data.polls} userAddr={$userAddr} />
  <!-- {:else if activeItem === items[1]}
    <ArchivedPollList {data} /> -->
  {:else if activeItem === items[1]}
    <div class="auth">
      <div>token: {$userToken}</div>
      <div>address: {$userAddr}</div>
      <div>privilege: {$userPrivilege}</div>
    </div>
    <button onclick={() => idenaLogin($userToken, $userAddr)}>Log in</button>
    <button onclick={() => idenaLogout($userToken)}>Log out</button>
  {/if}
</main>

<style>
  :global(body) {
    background-color: #131418; /* Replace with your desired color */
    font-family: "Trebuchet MS";
    font-size: 13px;
  }
  .auth {
    color: #fff;
    font-family: monospace;
  }
</style>

