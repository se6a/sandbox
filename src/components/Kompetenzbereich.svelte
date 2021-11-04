<script>
  import Flower from "../components/Flower-6.svelte";
  import { level, crntKB } from "../stores";

  export let kompetenzbereich = { color: "gray" };
  export let i = 0;
  export let angle = 0;

  const THIS = {
    $body: null,
    angle: angle,
    i: i,
    ...kompetenzbereich,
  };

  function clickHandler() {
    if ($level === 1) {
      $level++;
      crntKB.set(THIS);
    }
  }
</script>

<div
  class="kompetenzbereich"
  style="--kbRotation: {THIS.angle}deg;"
  bind:this={THIS.$body}
  on:click={clickHandler}
>
  <Flower color={kompetenzbereich.color} />
</div>

<style>
  .kompetenzbereich {
    width: var(--kbSize);
    height: var(--kbSize);
    position: absolute;
    border: 1px solid aqua;
    transform-origin: center calc(var(--r--2) * var(--size) / 100);
    transform: rotate(var(--kbRotation)) translateY(calc(var(--kbSize) / -2));
    transition: all var(--transTime);
    display: flex;
    justify-content: center;
    opacity: 1;
  }

  :global(main[data-level="0"]) .kompetenzbereich {
    opacity: 0;
  }

  :global(.kompetenzbereich > svg *) {
    fill: black;
  }
</style>
