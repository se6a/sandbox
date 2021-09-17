<svelte:head>
  <title>Test 2</title>
</svelte:head>

<script>
  const itemIds = [..."ABCDEFGHI".split("")];
  const _$items = {};

  const centerItem = (id) => {
    const _$item = _$items[id];
    const _$wrapper = document.querySelector(".WrapperItems");
    const itmRect = _$item.getBoundingClientRect();
    const { clientWidth } = document.body;
    const centerOff_x = clientWidth / 2 - itmRect.width / 2;

    const translate = _$wrapper.style.transform;
    let wrpOff_x = translate.match(/-?\d+/);
    wrpOff_x = wrpOff_x ? wrpOff_x[0] : 0;

    const diff_x = wrpOff_x - itmRect.left;
 
    _$wrapper.style.transform = `translate(${centerOff_x + diff_x}px, 0)`;
  }

</script>

<main>

  <section class="Content">
    
    <div class="WrapperItems">
      {#each itemIds as id}
        <article id="{id}" class="Item" on:click={() => centerItem(id)} bind:this={_$items[id]}>
          {id}
        </article>
      {/each}
    </div>

    <div class ="WrapperButtons">
      {#each itemIds as id}
        <button class="Button" on:click={() => centerItem(id)}>
          To {id}
        </button>
      {/each}
    </div>
  </section>

</main>

<style>
  .Content {
    background: linear-gradient(135deg, white, black);
    width: 100%;
    height: 100vh;
  }

  .Item {
    background: turquoise;
    width: 40vmin;
    height: 40vmin;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30vmin;
    cursor: pointer;
  }

  .WrapperItems {
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 20vmin;
    transition: transform 400ms;
  }

  .WrapperButtons {
    display: flex;
    gap: 2vmin;
    padding: 5vmin;
  }

  .Button {
    height: 10%;
    display: flex;
    margin: 0;
    flex-grow: 1;
    cursor: pointer;
  }

</style>