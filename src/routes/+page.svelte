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
  let activeItem = $state(items[1]);

  let { data } = $props();
  function tabChange(e: string) {
    activeItem = e;
  }

  async function idenaLogout(token: string | null) {
    if (!$userAddr) {
      alert("You are not logged in.");
      return;
    }
    let resp = await fetch(`${PUBLIC_AUTH_SERVER_URL}/v1/logout`, {
      method: 'POST',
      body: JSON.stringify({ token: token }),
    });
    resetCredentials();
  }

  async function resetCredentials() {
    userToken.set(crypto.randomUUID());
    userAddr.set(null);
    userPrivilege.set(IdenaUserStatus[IdenaUserStatus.Undefined]);
  }
  onMount(async () => {
    if (!$userToken) {
      resetCredentials();
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
    <div class="auth-item">
      <span class="title">Token:</span>
      <span class="value">{$userToken}</span>
    </div>
    <div class="auth-item">
      <span class="title">Address:</span>
      <span class="value">{$userAddr}</span>
    </div>
    <div class="auth-item">
      <span class="title">Privilege:</span>
      <span class="value">{$userPrivilege}</span>
    </div>
  </div>
    <div class="buttons">
      <button class="login-btn" onclick={() => idenaLogin($userToken, $userAddr)}>Log in</button>
      <button class="logout-btn" onclick={() => idenaLogout($userToken)}>Log out</button>
    </div>
  {/if}
</main>

<style>
  :global(body) {
    background-color: #131418; /* Replace with your desired color */
    font-family: "Trebuchet MS";
    font-size: 13px;
  }
  /* Dark theme container for the authentication details */
  .auth {
    background-color: #2a2a3e; /* Dark background for dark theme */
    color: white;
    border-radius: 8px;
    padding: 20px;
    margin: 20px auto;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    font-family: 'Arial', sans-serif;
    display: grid;
    grid-template-columns: 1fr 2fr; /* Grid with 2 columns: 1 for title and 2 for value */
    gap: 10px;
    border: 1px solid #DABFFF;  /* Lavender-colored border around the grid */
    border-radius: 8px;
    width: 40%; /* Set width to 40% */
  }

  /* Ensure grid items (title and value) are properly aligned */
  .auth-item {
    display: contents;  /* Use the grid layout for the child elements */
  }

  /* Title styles */
  .title {
    font-size: 16px;
    color: #DABFFF; /* Lavender color for titles */
    font-weight: 600;
  }

  /* Value styles */
  .value {
    font-size: 16px;
    color: #B3A0D1; /* Lighter purple color for values */
    font-weight: normal;
  }

  /* Add subtle grid lines */
  .auth div {
    border-bottom: 1px solid #4b4b69; /* Darker line for grid separation */
    padding: 10px 0;
  }

  .auth div:last-child {
    border-bottom: none; /* Remove the border for the last item */
  }

  /* Styling for the buttons container */
  .buttons {
    display: flex;
    justify-content: center; /* Space out buttons */
    gap: 20px;
    margin-top: 20px;
  }

  /* Styling for the login button */
  .login-btn {
    background-color: #6c5ce7;  /* Soft purple */
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .login-btn:hover {
    background-color: #5b4bc7;  /* Slightly darker purple when hovered */
  }

  /* Styling for the logout button */
  .logout-btn {
    background-color: #444;  /* Dark gray for a minimalistic mono-chrome look */
    color: white;
    padding: 10px 20px;
    border: 1px solid #555;  /* Slightly lighter gray border */
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .logout-btn:hover {
    background-color: #333;  /* Darker gray when hovered */
  }
</style>

