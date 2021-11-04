<script>
  import Flower from "../components/Flower-6.svelte";
  import Kompetenzbereich from "../components/Kompetenzbereich.svelte";
  import { level, crntFB } from "../stores";

  export let cssVariables = "";

  const THIS = {
    $body: null,
    $circle_1: null,
    $circle_2: null,
    $circle_3: null,
    $intersectionPoint_1: null,
    $intersectionPoint_2: null,
  };

  function clickHandler() {
    if ($level === 0) {
      $level++;
      crntFB.set(THIS);
    }
  }

  const kompetenzbereiche = [
    { color: "tomato" },
    { color: "green" },
    { color: "gold" },
    { color: "silver" },
    { color: "blue" },
    { color: "orange" },
  ];
</script>

<div
  class="container"
  bind:this={THIS.$body}
  on:click={clickHandler}
  style={cssVariables}
>
  <div class="circle Circle-1" bind:this={THIS.$circle_1}>
    <div class="circle Circle-2" bind:this={THIS.$circle_2}>
      {#each kompetenzbereiche as kompetenzbereich, i}
        <Kompetenzbereich
          {kompetenzbereich}
          {i}
          angle={(360 / kompetenzbereiche.length) * i}
        />
      {/each}
    </div>
    <div class="circle Circle-3" bind:this={THIS.$circle_3}>
      <Flower />
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

  .container {
    width: var(--size);
    height: var(--size);
    position: absolute;
    display: flex;
    transition: width var(--transTime), height var(--transTime),
      transform var(--transTime);
  }

  .container::after {
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
  }
</style>
