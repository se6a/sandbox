<script context="module">
  import Flower_2 from "../components/Flower-2.svelte";
  import Flower_3 from "../components/Flower-3.svelte";
  import Flower_4 from "../components/Flower-4.svelte";
  import Flower_5 from "../components/Flower-5.svelte";
  import Flower_6 from "../components/Flower-6.svelte";

  const Flowers = {
    2: Flower_2,
    3: Flower_3,
    4: Flower_4,
    5: Flower_5,
    6: Flower_6,
  };
</script>

<script>
  import Flower from "../components/Flower-6.svelte";
  import Kompetenzbereich from "../components/Kompetenzbereich.svelte";
  import { level, crntFB } from "../stores";

  export let title = "";
  export let data = {};
  export let cssVariables = "";
  export let position = [0, 0];

  const kompetenzbereiche = Object.keys(data).splice(0, 5); // LIMIT FOR NOW

  const THIS = {
    $body: null,
    $circle_1: null,
    $circle_2: null,
    $circle_3: null,
    $intersectionPoint_1: null,
    $intersectionPoint_2: null,
    data,
  };

  function clickHandler() {
    if ($level === 0) {
      $level++;
      removeFocusClass($crntFB?.$body);
      crntFB.set(THIS);
      addFocusClass(THIS.$body);
    }
  }

  function addFocusClass(_$) {
    _$?.classList.toggle("--inFocus", true);
  }

  function removeFocusClass(_$) {
    _$?.classList.toggle("--inFocus", false);
  }

  const cssVariablesLocal = `
    --color: silver;
    --posX: ${position[0]};
    --posY: ${position[1]};
  `;
</script>

<div
  class="fachbereich body"
  bind:this={THIS.$body}
  on:click={clickHandler}
  style="{cssVariables}{cssVariablesLocal}"
>
  <div class="circle Circle-1" bind:this={THIS.$circle_1}>
    <div class="circle Circle-2" bind:this={THIS.$circle_2}>
      {#each kompetenzbereiche as kb, i}
        <Kompetenzbereich
          title={kb}
          data={data[kb]}
          {i}
          angle={(360 / kompetenzbereiche.length) * i}
        />
      {/each}
    </div>
    <div class="circle Circle-3" bind:this={THIS.$circle_3}>
      <div class="fachbereichTitle">
        {title}
      </div>
      <svelte:component this={Flowers[kompetenzbereiche.length]} />
    </div>
  </div>

  <div class="intersectionPoint_1" bind:this={THIS.$intersectionPoint_1} />
  <div class="intersectionDiameter">
    <div bind:this={THIS.$intersectionPoint_2} class="intersectionPoint_2" />
  </div>
</div>

<style>
  .targetPoint,
  .intersectionPoint_1 {
    position: absolute;
    height: 0;
    width: 0;
    top: 50%;
    left: 50%;
  }

  .intersectionDiameter {
    height: var(--r-2);
    width: 0;
    top: calc(var(--r-1) - var(--r-2));
    left: var(--r-1);
    position: absolute;
    transform: rotate(var(--intersectionAngle));
    transform-origin: center bottom;
    z-index: 100;
  }

  .intersectionPoint_1,
  .intersectionPoint_2 {
    width: 0;
    height: 0;
    position: absolute;
  }

  .intersectionPoint_1::before,
  .intersectionPoint_1::after,
  .intersectionPoint_2::before,
  .intersectionPoint_2::after {
    position: absolute;
    margin-top: -15px;
    height: 30px;
    content: "";
    display: block;
    width: 2px;
    background-color: rgb(81, 255, 0);
    z-index: 1000;
  }

  .intersectionPoint_1::after,
  .intersectionPoint_2::after {
    transform: rotate(90deg);
  }

  .body {
    width: var(--size);
    height: var(--size);
    left: var(--posX);
    top: var(--posY);
    position: absolute;
    display: flex;
    transition: width var(--transTime), height var(--transTime),
      transform var(--transTime), opacity var(--transTime);
    pointer-events: none;
    opacity: 0;
    z-index: 0;
  }

  .body::after {
    content: "";
    height: 100%;
    width: 100%;
    position: absolute;
    border: 1px solid aliceblue;
  }

  .circle {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 1px solid aliceblue;
    border-radius: 100%;
    display: flex;
    justify-content: center;
  }

  .Circle-1 {
    width: var(--d-1);
    height: var(--d-1);
    top: calc((100% - var(--d-1)) / 2);
    left: calc((100% - var(--d-1)) / 2);
    z-index: 30;
    transition: transform var(--transTime);
  }

  .Circle-2 {
    width: var(--d-2);
    height: var(--d-2);
    top: calc((100% - var(--d-2)) / 2);
    left: calc((100% - var(--d-2)) / 2);
    z-index: 20;
  }

  .Circle-3 {
    width: var(--d-3);
    height: var(--d-3);
    top: calc((100% - var(--d-3)) / 2);
    left: calc((100% - var(--d-3)) / 2);
    z-index: 10;
    display: flex;
  }

  .Circle-3 > * {
    position: absolute;
  }

  .fachbereichTitle {
    font-size: calc(var(--size) / 15);
    transition: font-size 1500ms;
    align-self: center;
    justify-self: center;
  }

  :global([data-level="0"]) .fachbereich,
  :global([data-level="1"] .fachbereich.--inFocus),
  :global([data-level="2"] .fachbereich.--inFocus) {
    opacity: 1;
    pointer-events: all;
  }

  :global([data-level="1"] .fachbereich.--inFocus),
  :global([data-level="2"] .fachbereich.--inFocus) {
    z-index: 1;
  }
</style>
