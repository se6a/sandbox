<svelte:head>
  <title>CENTER X</title>
</svelte:head>

<script>
  import MouseCoordinates from "../components/dev/MouseCoords.svelte";

  const itemIds = "ABCDEFGHI".split("");
  const _$items = {};
  let scale = 1;

  $: if (Object.keys(_$items).length > 0) {
    const wrpr_w = document.querySelector(".WrapperItems").getBoundingClientRect().width;

    Object.values(_$items).forEach(_$item => {
      const {left, width} = _$item.getBoundingClientRect();
      _$item.dataset.left = (left + width / 2) / wrpr_w;
    });
  }

  const centerItem = (id) => {
    const _$content = document.querySelector(".Content");
    const _$wrpr = document.querySelector(".WrapperItems");
    const _$itm = _$items[id];

    const itmOff_l = _$itm.dataset.left;

    const wrpr_w = _$wrpr.getBoundingClientRect().width;
    const view_w = _$content.clientWidth;

    const diff = (view_w / 2) - (itmOff_l * wrpr_w) / scale;
    const trnsCntr = view_w / 2;

    scale += 0.8;

    _$wrpr.style.transform = `scale(${scale}) translate(${diff}px)`;
    _$wrpr.style.transformOrigin = `${trnsCntr}px center`;
  }

</script>

<main>
  <MouseCoordinates />

  <section class="Content">
    
    <div class="WrapperItems">
      {#each itemIds as id}
        <article id="{id}" class="Item" on:click={() => centerItem(id)} bind:this={_$items[id]}>
          {id}
          <div class="centerMarker">
            <div></div>
            <div></div>
          </div>
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
  :root {
    font-size: 1vmin;
  }

  .Content {
    border: 2px solid tomato;
    background: linear-gradient(135deg, white, black);
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 100vh;
  }

  .Item {
    border: 1px solid turquoise;
    box-sizing: border-box;
    width: 50rem;
    height: 50rem;
    flex-shrink: 0;
    display: flex;
    font-size: 40rem;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: font-size 400ms, width 400ms, height 400ms;
    transform-origin: top left;
  }

  .Item .centerMarker {
    width: 1vmin;
    height: 1vmin;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .Item .centerMarker > div {
    width: 100%;
    height: 1px;
    background-color: tomato;
    position: absolute;
    transform: rotate(45deg);
  }

  .Item .centerMarker > :last-child {
    transform: rotate(135deg);
  }

  .WrapperItems {
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 20rem;
    transition: transform 400ms, width 400ms, height 400ms;
  }

  .WrapperButtons {
    display: flex;
    gap: 2vmin;
    padding: 5vmin;
    bottom: 0;
    position: absolute;
  }

  .Button {
    display: flex;
    margin: 0;
    font-size: 1vmin;
    padding: .6vmin 1vmin;
    flex-grow: 1;
    cursor: pointer;
    text-decoration: none;
    background-color: transparent;
    border: 1px solid turquoise;
    color: turquoise;
  }

</style>