<script>
  import Flower from "../components/Flower-6.svelte";
  import CenterMarker from "../components/dev/CenterMarker.svelte";
  import MouseCoords from "../components/dev/MouseCoords.svelte";
  const size = 400; // px
  const petalSize = 20; // %
  const scale = 4;
  const d1 = 100; // %
  const d2 = 90; // %
  const d3 = 80; // %
  const r1 = d1 / 2; // %
  const r2 = d2 / 2; // %
  const r3 = d3 / 2; // %
  const intersectionAngle = 45; // deg
  const transTime = 1000; // ms

  let level = 0;

  const petals = 6;

  let _$main;
  let _$container;
  let _$circle_1;
  let _$circle_2;
  let _$circle_3;
  let _$intersectionPoint_1;
  let _$intersectionPoint_2;
  let _$targetPoint;

  const cssVariables = `
    --size: ${size}px;
    --d-1: ${d1}%;
    --d-2: ${d2}%;
    --d-3: ${d3}%;
    --r-1: ${r1}%;
    --r-2: ${r2}%;
    --r-3: ${r3}%;
    --r--2: ${r2};
    --petalSize: calc(${petalSize} * var(--size) / 100);
    --point-x: ${r1}%;
    --point-y: ${(size / 100) * (r1 - r2)}px;
    --point-origin-y: ${r2}%;
    --intersectionAngle: ${intersectionAngle}deg;
    --transTime: ${transTime}ms;
  `;

  function moveThings() {
    level++;
    if (level === 1) toCenter();
    else if (level === 2) toEdge();
  }

  function toCenter() {
    const tp = _$targetPoint.getBoundingClientRect();
    const ip = _$intersectionPoint_1.getBoundingClientRect();

    let move_x = tp.x - ip.x;
    let move_y = tp.y - ip.y;

    _$container.style.transform = `translate(${move_x}px, ${move_y}px)`;
  }

  function toEdge() {
    const tp = _$targetPoint.getBoundingClientRect();
    const ip = _$intersectionPoint_2.getBoundingClientRect();

    const fct = (size * scale) / size;

    let move_x = tp.x - ip.x * fct;
    let move_y = tp.y - ip.y * fct;

    const [pos_x, pos_y] = _$container.style.transform
      .match(/translate\((\d+\.?\d)px,\s?(\d+\.?\d)px\)/)
      .splice(1)
      .map((d) => parseFloat(d));

    move_x += pos_x * fct;
    move_y += pos_y * fct;

    _$main.style.setProperty("--size", `${size * scale}px`);
    _$container.style.transform = `translate(${move_x}px, ${move_y}px)`;
    _$circle_1.style.transform = `rotate(var(--intersectionAngle))`;
  }
</script>

<main bind:this={_$main} style={cssVariables} on:click={moveThings}>
  <div class="container" bind:this={_$container}>
    <div class="circle Circle-1" bind:this={_$circle_1}>
      <div class="circle Circle-2" bind:this={_$circle_2}>
        {#each { length: petals } as _, i}
          <div
            class="blossom"
            style="--blossomRotation: {(360 / petals) * i}deg"
          >
            <Flower />
          </div>
        {/each}
      </div>
      <div class="circle Circle-3" bind:this={_$circle_3}>
        <Flower />
      </div>
    </div>

    <div class="intersectionPoint_1" bind:this={_$intersectionPoint_1} />
    <div class="intersectionDiameter">
      <div bind:this={_$intersectionPoint_2} class="intersectionPoint_2" />
    </div>
  </div>

  <div class="targetPoint" bind:this={_$targetPoint} />

  <CenterMarker />
  <MouseCoords />
</main>

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
    background-color: aliceblue;
    position: absolute;
    display: flex;
    transition: width var(--transTime), height var(--transTime),
      transform var(--transTime);
  }

  .circle {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 1px solid black;
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

  .blossom {
    width: var(--petalSize);
    height: var(--petalSize);
    position: absolute;
    border: 1px solid aqua;
    transform-origin: center calc(var(--r--2) * var(--size) / 100);
    transform: rotate(var(--blossomRotation))
      translateY(calc(var(--petalSize) / -2));
    transition: all var(--transTime);
    display: flex;
    justify-content: center;
  }

  :global(.blossom > svg *) {
    fill: black;
  }
</style>
