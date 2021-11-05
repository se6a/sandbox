<script>
  import Header from "../components/Header.svelte";
  import Fachbereich from "../components/Fachbereich.svelte";
  import CenterMarker from "../components/dev/CenterMarker.svelte";
  import MouseCoords from "../components/dev/MouseCoords.svelte";
  import { level, crntFB, crntKB } from "../stores";

  import lp21 from "../data/lp21-app.js";

  const fachbereiche = Object.keys(lp21);

  const unit = "vmin";
  const size = 30; // as defined unit
  const sizeKb = 20; // %
  const scaleInit = 1;
  const scales = {
    0: 1, // level 0 = overview
    1: 3, // level 1 = Fachbereich
    2: 10, // level 2 = Kompetenzbereich
  };
  const d1 = 100; // %
  const d2 = 85; // %
  const d3 = 70; // %
  const r1 = d1 / 2; // %
  const r2 = d2 / 2; // %
  const r3 = d3 / 2; // %
  const intersectionAngle = 50; // deg
  const transTime = 1500; // ms

  const cssVariables = `
    --size: ${size}${unit};
    --d-1: ${d1}%;
    --d-2: ${d2}%;
    --d-3: ${d3}%;
    --r-1: ${r1}%;
    --r-2: ${r2}%;
    --r-3: ${r3}%;
    --r--2: ${r2};
    --sizeKb: calc(${sizeKb} * var(--size) / 100);
    --point-x: ${r1}%;
    --point-y: ${(size / 100) * (r1 - r2)}px;
    --point-origin-y: ${r2}%;
    --intersectionAngle: ${intersectionAngle}deg;
    --transTime: ${transTime}ms;
  `;

  let lastLevel = 0;
  $: if ($level === 0) {
    overview();
    lastLevel = $level;
  } else if ($level === 1) {
    focusFachbereich();
    lastLevel = $level;
  } else if ($level === 2) {
    focusKompetenzbereich();
    lastLevel = $level;
  }

  let _$main;

  function overview() {
    if ($crntFB) {
      scale($crntFB.$body, scaleInit);
      translate($crntFB.$body, 0, 0);
      rotate($crntFB.$circle_1, "init");
    }
  }

  function focusFachbereich() {
    focus($crntFB.$intersectionPoint_1);
  }

  function focusKompetenzbereich() {
    const angle = $crntKB.angle;
    focus($crntFB.$intersectionPoint_2, angle);
  }

  function focus(_$intersectionPoint, angle = "init") {
    const tp = _$targetPoint.getBoundingClientRect();
    const ip = _$intersectionPoint.getBoundingClientRect();

    // Calculate the actual scale factor from last level to current level:
    const fct = scales[$level] / scales[lastLevel];

    let move_x = tp.x - ip.x * fct;
    let move_y = tp.y - ip.y * fct;
    const [init_x, init_y] = getInitPos($crntFB.$body);
    const [trns_x, trns_y] = getTranslatePos($crntFB.$body);
    move_x += trns_x * fct + init_x * (fct - 1);
    move_y += trns_y * fct + init_y * (fct - 1);

    scale($crntFB.$body, scales[$level]);
    translate($crntFB.$body, move_x, move_y);
    rotate($crntFB.$circle_1, angle);
  }

  function scale(_$, factor) {
    _$.style.setProperty("--size", `${size * factor}${unit}`);
  }

  function translate(_$, x, y) {
    _$.style.transform = `translate(${x}px, ${y}px)`;
  }

  function rotate(_$, angle) {
    const rotation =
      angle === "init"
        ? 0
        : angle >= intersectionAngle && angle < 180 + intersectionAngle
        ? // counterclockwise:
          (angle - intersectionAngle) * -1
        : angle < intersectionAngle
        ? intersectionAngle - angle
        : // clockwise:
          360 - angle + intersectionAngle;

    _$.style.transform = `rotate(${rotation}deg)`;
  }

  function getInitPos(_$) {
    const computed = window.getComputedStyle(_$, null);
    const x = parseFloat(computed.getPropertyValue("left")) || 0;
    const y = parseFloat(computed.getPropertyValue("top")) || 0;

    return [x, y];
  }

  function getTranslatePos(_$) {
    const translation = _$.style.transform.match(
      /translate\((-?\d+\.?\d+)px,\s?(-?\d+\.?\d+)px\)/
    );

    const [pos_x, pos_y] = translation
      ? translation.splice(1).map((d) => parseFloat(d))
      : [0, 0];

    return [pos_x, pos_y];
  }

  let _$targetPoint;

  function setPosition(i) {
    const header = 6; // vmin;
    const margin = 6; // vmin;
    const width = 100 - 2 * margin;

    const maxCol = Math.floor(100 / size);
    const nRow = Math.floor(((i + 1) * size) / 100);

    const y = nRow * size + header + margin;
    const x = ((i + 1) % maxCol) * size + margin;

    return [x + unit, y + unit];
  }
</script>

<main data-level={$level} bind:this={_$main}>
  <Header />
  {#each fachbereiche as fb, i}
    <Fachbereich
      {cssVariables}
      title={fb}
      data={lp21[fb]}
      position={setPosition(i)}
    />
  {/each}
  <div class="targetPoint" bind:this={_$targetPoint} />
  <CenterMarker />
  <!-- <MouseCoords /> -->
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
