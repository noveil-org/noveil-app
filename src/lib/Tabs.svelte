<script>
    let { items, activeItem, tabChange } = $props();
</script>

<div class="tabs">
    <ul>
        {#each items as item}
            <!-- svelte-ignore event_directive_deprecated -->
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
            <li onclick={() => tabChange(item)}>
                <div class:active={item === activeItem}>{item}</div>
            </li>
        {/each}
    </ul>
</div>

<style>
    .tabs {
        margin-bottom: 40px;
    }
    ul {
        display: flex;
        justify-content: center;
        padding: 0;
        list-style-type: none;
    }
    li {
        margin: 0 16px;
        font-size: 17px;
        color: #555;
        cursor: pointer;
    }
    .active {
        color: #DABFFF;
        border-bottom: 2px solid #DABFFF;
        padding-bottom: 8px;
    }
</style>
