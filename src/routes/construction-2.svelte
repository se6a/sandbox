<script>
  import Planet from "../components/Planet.svelte";
  import Flower from "../components/Flower-6.svelte";
  import CenterMarker from "../components/dev/CenterMarker.svelte";
  import MouseCoords from "../components/dev/MouseCoords.svelte";
  const pointSize = 0; // don't change
  const size = 400;
  const scale = 4;
  const r1 = 50;
  const r2 = 37.5;
  const r3 = 35;
  const intersectionAngle = 45;

  const petals = 6;

  let _$container;
  let _$intersectionPoint;
  let _$targetPoint;

  const cssVariables = `
    --size: ${size}px;
    --r-1: ${r1}%;
    --r-2: ${r2}%;
    --r-3: ${r3}%;
    --r--2: ${r2};
    --d-1: ${r1 * 2}%;
    --d-2: ${r2 * 2}%;
    --d-3: ${r3 * 2}%;
    --pointSize: ${pointSize}px;
    --point-x: ${r1}%;
    --point-y: ${(size / 100) * (r1 - r2)}px;
    --point-origin-y: ${r2}%;
    --intersectionAngle: ${intersectionAngle}deg;
  `;

  function moveThings() {
    const tp = _$targetPoint.getBoundingClientRect();
    const ip = _$intersectionPoint.getBoundingClientRect();

    const fct = (size * scale) / size;

    let move_x = tp.x - ip.x * fct;
    let move_y = tp.y - ip.y * fct;

    document
      .querySelector("main")
      .style.setProperty("--size", `${size * scale}px`);

    // _$container.style.width = `${size * scale}px`;
    // _$container.style.height = `${size * scale}px`;
    _$container.style.transform = `translate(${move_x}px, ${move_y}px)`;
  }
</script>

<main style={cssVariables} on:click|once={moveThings}>
  <div class="container" bind:this={_$container}>
    <div class="intersectionDiameter">
      <div bind:this={_$intersectionPoint} class="intersectionPoint" />
    </div>
    <div class="circle Circle-1" />
    <div class="circle Circle-2">
      {#each { length: petals } as _, i}
        <div
          class="blossom"
          style="--blossomRotation: {(360 / petals) * i}deg"
        />
      {/each}
    </div>
    <div class="circle Circle-3">
      <Flower />
    </div>

    <div class="targetPoint" bind:this={_$targetPoint} />

    <CenterMarker />
    <MouseCoords />
  </div>
</main>

<style>
  .targetPoint {
    position: absolute;
    height: var(--pointSize);
    width: var(--pointSize);
    top: 50%;
    left: 50%;
  }

  .container {
    width: var(--size);
    height: var(--size);
    background-color: aliceblue;
    position: absolute;
    display: flex;
    transition: width 500ms, height 500ms, transform 500ms;
  }

  .intersectionDiameter {
    height: var(--r-2);
    width: var(--pointSize);
    top: calc(var(--r-1) - var(--r-2));
    left: calc(var(--r-1) - var(--pointSize) / 2);
    position: absolute;
    transform: rotate(var(--intersectionAngle));
    transform-origin: center bottom;
  }

  .intersectionPoint {
    width: var(--pointSize);
    height: var(--pointSize);
    position: absolute;
  }

  .intersectionPoint::before,
  .intersectionPoint::after {
    position: absolute;
    margin-top: -15px;
    height: 30px;
    content: "";
    display: block;
    width: 2px;
    background-color: rgb(81, 255, 0);
  }

  .intersectionPoint::after {
    transform: rotate(90deg);
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
    width: 30px;
    height: 30px;
    position: absolute;
    background-color: aqua;
    transform-origin: center calc(var(--r--2) * var(--size) / 100);
    transform: rotate(var(--blossomRotation)) translateY(-15px);
    transition: all 500ms, height 500ms, transform 500ms;
  }
</style>
