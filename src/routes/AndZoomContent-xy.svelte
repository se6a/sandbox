<svelte:head>
  <title>Test 2</title>
</svelte:head>

<script>
  document.addEventListener("DOMContentLoaded", () => {
    const _$coordX = document.querySelector("#coordX .display");
    const _$coordY = document.querySelector("#coordY .display");

    document.body.addEventListener("mousemove",
      (e) => {
        _$coordX.innerHTML = e.clientX;
        _$coordY.innerHTML = e.clientY;

      }
    );

    document.body.addEventListener("mouseleave",
      () => {
        _$coordX.innerHTML = _$coordY.innerHTML = "-";
      }
    );
  });

  const itemIds = "ABCDEFGHI".split("");
  const _$items = {};
  let scale = 1;

  $: if (Object.keys(_$items).length > 0) {
    const {clientWidth: wrpr_w, clientHeight: wrpr_h} = document.body;

    Object.values(_$items).forEach(_$item => {
      const { x, y, width, height } = _$item.getBoundingClientRect();
      _$item.dataset.x = (x + width / 2) / wrpr_w;
      _$item.dataset.y = (y + height / 2) / wrpr_h;
      console.log("wrpr w", wrpr_w);
      console.log("wrpr h", wrpr_h);
    });
  }

  const centerItem = (id) => {
    const _$content = document.querySelector(".Content");
    const _$wrpr = document.querySelector(".WrapperItems");
    const _$itm = _$items[id];

    const { x: itmOff_x, y: itmOff_y } = _$itm.dataset;

    const { width: wrpr_w, height: wrpr_h } = _$wrpr.getBoundingClientRect();
    const { width: view_w, height: view_h } = _$content.getBoundingClientRect();
    // const view_w = _$content.clientWidth;
    // const view_h = _$content.clientHeight;

    const diff_x = (view_w / 2) - (itmOff_x * wrpr_w) / scale;
    const diff_y = (view_h / 2) - (itmOff_y * view_h) / scale;

    scale += 0.8;

    _$wrpr.style.transform = `scale(${scale}) translate(${diff_x}px, ${diff_y}px)`;
  }

</script>

<main>
  <div class="coordinates">
    <div id="coordX">
      <div>x</div>
      <span class="display">0</span>
    </div>
    <div id="coordY">
      <div>y</div>
      <span class="display">0</span>
    </div>
  </div>

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
  .coordinates {
    position: absolute;
    font-size: 2vmin;
    padding: 2vmin;
    width: 10vw;
    display: flex;
  }
  .coordinates > * {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 50%;
    text-align: center;
    display: flex;
  }
  .coordinates .display {
    margin-left: .5vmin;
  }

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
    box-sizing: border-box;
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
    display: grid;
    grid-template-columns: repeat(4,1fr);
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
    background-color: black;
  }

</style>