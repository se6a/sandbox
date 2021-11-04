<script>
  import Header from "../components/Header.svelte";
  import Fachbereich from "../components/Fachbereich.svelte";
  import CenterMarker from "../components/dev/CenterMarker.svelte";
  import MouseCoords from "../components/dev/MouseCoords.svelte";

  import { level, crntFB, crntKB } from "../stores";

  const unit = "vmin";
  const size = 40; // vmin
  const kbSize = 20; // %
  const scale = 8;
  const d1 = 100; // %
  const d2 = 80; // %
  const d3 = 70; // %
  const r1 = d1 / 2; // %
  const r2 = d2 / 2; // %
  const r3 = d3 / 2; // %
  const intersectionAngle = 45; // deg
  const transTime = 1000; // ms

  const cssVariables = `
    --size: ${size}${unit};
    --d-1: ${d1}%;
    --d-2: ${d2}%;
    --d-3: ${d3}%;
    --r-1: ${r1}%;
    --r-2: ${r2}%;
    --r-3: ${r3}%;
    --r--2: ${r2};
    --kbSize: calc(${kbSize} * var(--size) / 100);
    --point-x: ${r1}%;
    --point-y: ${(size / 100) * (r1 - r2)}px;
    --point-origin-y: ${r2}%;
    --intersectionAngle: ${intersectionAngle}deg;
    --transTime: ${transTime}ms;
  `;

  let lastLevel = 0;
  $: if ($level === 1) {
    focusFachbereich();
    lastLevel = $level;
  } else if ($level === 2) {
    focusKompetenzbereich();
    lastLevel = $level;
  }

  let _$main;

  function focusFachbereich() {
    console.log("lastLevel", lastLevel);
    const tp = _$targetPoint.getBoundingClientRect();
    const ip = $crntFB.$intersectionPoint_1.getBoundingClientRect();

    let move_x = tp.x - ip.x;
    let move_y = tp.y - ip.y;

    $crntFB.$body.style.transform = `translate(${move_x}px, ${move_y}px)`;
    $crntFB.$body.style.setProperty("--size", `${size}${unit}`);
  }

  function focusKompetenzbereich() {
    const angle = $crntKB.angle;
    const tp = _$targetPoint.getBoundingClientRect();
    const ip = $crntFB.$intersectionPoint_2.getBoundingClientRect();

    const fct = (size * scale) / size;

    let move_x = tp.x - ip.x * fct;
    let move_y = tp.y - ip.y * fct;

    const [pos_x, pos_y] = $crntFB.$body.style.transform
      .match(/translate\((\d+\.?\d+)px,\s?(\d+\.?\d+)px\)/)
      .splice(1)
      .map((d) => parseFloat(d));

    move_x += pos_x * fct;
    move_y += pos_y * fct;

    const rotation =
      angle >= intersectionAngle && angle < 180 + intersectionAngle
        ? (angle - intersectionAngle) * -1
        : angle < intersectionAngle
        ? intersectionAngle - angle
        : 360 - angle + intersectionAngle;

    $crntFB.$body.style.setProperty("--size", `${size * scale}${unit}`);
    $crntFB.$body.style.transform = `translate(${move_x}px, ${move_y}px)`;
    $crntFB.$circle_1.style.transform = `rotate(${rotation}deg)`;
  }

  let _$targetPoint;
</script>

<main bind:this={_$main} data-level={$level}>
  <Header />
  <Fachbereich {cssVariables} />
  <CenterMarker />
  <MouseCoords />
  <div class="targetPoint" bind:this={_$targetPoint} />
</main>

<style>
  .targetPoint {
    position: absolute;
    height: 0;
    width: 0;
    top: 50%;
    left: 50%;
  }
</style>
