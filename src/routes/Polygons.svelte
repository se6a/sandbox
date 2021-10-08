<script>
  import ScreenCenter from "../components/dev/CenterMarker.svelte";
  import MouseCoords from "../components/dev/MouseCoords.svelte";
  import Polygon6 from "../components/Polygon6.svelte";

  const _$root = document.querySelector(":root");
  const zoomStep = 2;

  let _$wrapper;
  let scale = 1;
  

  const zoom = function(_$polygon, _$corner) {
    const center_x = innerWidth / 2;
    const center_y = innerHeight / 2;
    const {x: c_pos_x, y: c_pos_y} = _$corner.getBoundingClientRect();
    const {x: w_pos_x, y: w_pos_y} = _$wrapper.getBoundingClientRect();

    const prevScale = scale;
    scale += zoomStep;

    const c_innerOffset_x = c_pos_x - w_pos_x;
    const c_innerOffset_x_scaled = (c_innerOffset_x / prevScale) * (scale);

    const c_innerOffset_y = c_pos_y - w_pos_y;
    const c_innerOffset_y_scaled = (c_innerOffset_y / prevScale) * (scale);

    const mv_x = center_x - c_innerOffset_x_scaled;
    const mv_y = center_y - c_innerOffset_y_scaled;


    _$root.style.fontSize = `${scale}vmin`;
    _$wrapper.style.transform = `translate(${mv_x}px, ${mv_y}px)`;
  }

  const polygons = [
    {fill: "#2C8291", gons: 3, name: "Überfachliche Kompetenzen"},
    {fill: "#FFEC15", gons: 6, name: "Deutsch"},
    {fill: "#A22E51", gons: 6, name: "Musik"},
    {fill: "#DF7D3B", gons: 6, name: "Bewegen und Sport"},
    {fill: "#454BC3", gons: 6, name: "Englisch"},
    {fill: "#8F8A87", gons: 2, name: "Medien und Informatik"},
    {fill: "#5C7FBC", gons: 3, name: "Mathematik"},
    {fill: "#37A836", gons: 5, name: "Natur, Mensch und Gesellschaft"},
    {fill: "#9B498C", gons: 2, name: "Gestalten"},
    // {fill: "#D03C2C", gons: 6, name: "Französch"},
    // {fill: "#484C94", gons: 4, name: "Berufliche Orientierung"},
  ]
</script>

<main>
  <ScreenCenter />
  <MouseCoords />

  <section class="content">
    <div class="wrapper" bind:this={_$wrapper}>
      {#each polygons as _polygon, i}
        <Polygon6 onclick={zoom} fill={_polygon.fill} size={1 * Math.random()} pos={[30 * i, 9]} />
      {/each}
    </div>
  </section>
</main>

<style>
  :global(:root) {
    --duration: 800ms;
    --ease: ease-in-out;
    font-size: 1vmin;
    transition: font-size var(--duration) var(--ease);
  }

  :global(body) {
    margin: 0;
    padding: 0;
  }

  .content {
    background-color: silver;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    display: flex;
  }

  .wrapper {
    position: relative;
    transition: transform var(--duration) var(--ease);
    box-sizing: border-box;
    display: grid;
    width: 90rem;
    height: 90rem;
    grid-template-columns: repeat(3, 30rem);
    grid-template-rows: repeat(3, 30rem);
    justify-items: center;
    align-items: center;
  }

  .wrapper::after {
    content: "";
    height: 3vmin;
    width: 3vmin;
    display: block;
    position: absolute;
    border-width: 2px 0 0 2px;
    border-color: white;
    border-style: dotted;
    justify-self: start;
    align-self: start;
  }
</style>