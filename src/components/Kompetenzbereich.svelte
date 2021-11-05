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
  import { level, crntKB } from "../stores";
  export let title = "";
  export let data = {};
  export let i = 0;
  export let angle = 0;

  const kompetenzen = Object.keys(data).splice(0, 5);

  const THIS = {
    $body: null,
    angle: angle,
    i: i,
    data,
  };

  function clickHandler() {
    if ($level === 1) {
      $level++;
      crntKB.set(THIS);
    }
  }
</script>

<div
  class="kompetenzbereich body"
  style="--kbRotation: {THIS.angle}deg; --color: gray"
  bind:this={THIS.$body}
  on:click={clickHandler}
>
  <div class="kompetenzbereichTitle">{title}</div>
  <svelte:component this={Flowers[kompetenzen.length]} />
</div>

<style>
  .body {
    width: var(--sizeKb);
    height: var(--sizeKb);
    position: absolute;
    border: 1px solid aqua;
    transform-origin: center calc(var(--r--2) * var(--size) / 100);
    transform: rotate(var(--kbRotation)) translateY(calc(var(--sizeKb) / -2));
    transition: all var(--transTime);
    display: flex;
    justify-content: center;
    opacity: 1;
  }

  .kompetenzbereichTitle {
    position: absolute;
    justify-self: center;
    align-self: center;
  }

  :global(main[data-level="0"]) .kompetenzbereich {
    opacity: 0;
  }

  :global(.kompetenzbereich > svg *) {
    fill: black;
  }
</style>
