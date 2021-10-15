<script>
  import CenterMarker from "./dev/CenterMarker.svelte";
  import Planet from "./Planet.svelte";
  import Kompetenzbereich from "./Kompetenzbereich.svelte";

  export let fill = "white";
  export let pos = [0, 0];
  export let size = 50;
  export let onclick = null;
  export let _$fachbereich;

  const _$corners = [];

  const coords = [
    {x: 47.63, y: 3.64},
    {x: 90.94, y: 28.65},
    {x: 90.94, y: 78.67},
    {x: 47.63, y: 103.68},
    {x: 4.31, y: 78.67},
    {x: 4.31, y: 28.65}
  ];

  const cssVariables = `
    --fill: ${fill};
    --left: ${pos[0]}vmin;
    --top: ${pos[1]}vmin;
    --size: ${size}vmin;
    --rotationTime: ${100 + Math.round(Math.random() * 100)}s;
  `;

  const clickHandler = (_$corner) => {
    if (typeof(onclick) === "function") {
      onclick(_$fachbereich, _$corner);
    }
  };

  const kmpbs = Math.round(Math.random() * 4 + 2);

</script>

<div
  class="fachbereich"
  bind:this={_$fachbereich}
  data-size="{size}"
  data-posx="{pos[0]}"
  data-posy="{pos[1]}"
  style={cssVariables}
  on:click={clickHandler}
>
  <Planet
    containerSize={100}
    planetPadding={10}
  >
    <div
      class="satelites"
      slot="satelites"
    >
      {#each {length: kmpbs} as _, i}
        <Kompetenzbereich />
      {/each}
    </div>
  </Planet>
</div>

<style>
  .fachbereich {
    width: var(--size);
    height: var(--size);
    position: absolute;
    left: var(--left);
    top: var(--top);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 1000ms;
    transform-origin: center;
  }

  :global(.fachbereich > .PlanetContainer) {
    animation-name: rotate;
    animation-duration: var(--rotationTime);
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
  :global(.kompetenzbereich > .PlanetContainer) {
    animation-name: rotate;
    animation-duration: 25s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  @keyframes rotate {
    from {transform: rotate(0deg)}
    to {transform: rotate(360deg)}
  }

  .svgPath1 {
    fill: var(--fill);
  }

  .fachbereichIcon {
    border: 1px dotted white;
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
</style>
