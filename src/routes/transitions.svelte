<script>
  import { crossfade } from "svelte/transition";
  import Header from "../components/Header.svelte";
  import Fachbereich from "../components/Fachbereich.svelte";

  const [send, receive] = crossfade({});

  let rotation = 0;

  function Rotator() {
    this._doRotate = false;
    this._rotate = () => {
      requestAnimationFrame(() => {
        if (!this._doRotate) return;
        rotation = (rotation += 0.1) % 360;
        this._rotate();
      });
    };

    this.play = () => {
      if (!this._doRotate) {
        this._doRotate = true;
        this._rotate();
      }
      return this;
    };

    this.stop = () => {
      this._doRotate = false;
      return this;
    };

    this.set = (deg) => {
      rotation = deg % 360;
      return this;
    };
  }

  const rotator = new Rotator(rotation);

  $: if (level < 2) rotator.play();

  const cssVariables = `
    --level1-size: 30vmin;
    --level2-size: 50vmin;
    --level3-size: 60vmin;
    --top: ${~~(Math.random() * 80)}vh;
    --left: ${~~(Math.random() * 80)}vw;
  `;

  let level = 0;
  $: if (level > 2) level = 0;
</script>

<Header bind:level />

<main class="content" style={cssVariables}>
  {#if level === 0}
    <div class="box" in:receive out:send>
      <Fachbereich bind:level {rotator} {rotation} />
    </div>
  {/if}

  <section class="level-1">
    {#if level === 1}
      <div class="box" in:receive out:send>
        <Fachbereich bind:level {rotator} {rotation} />
      </div>
    {/if}
  </section>

  <section class="level-2">
    {#if level === 2}
      <div class="box" in:receive out:send>
        <Fachbereich bind:level {rotation} />
      </div>
    {/if}
  </section>
</main>

<style>
  .content {
    width: inherit;
    height: inherit;
    background-color: grey;
    display: grid;
    grid-template:
      ".     .     ." auto
      ".     pos1  ." 0
      "pos2  .     ." auto / auto 0 auto;
    z-index: 20;
  }

  .level-1,
  .level-2 {
    width: 100px;
    height: 100px;
    display: flex;
  }

  .level-1 {
    border: 1px solid white;
    grid-area: pos1;
    justify-self: center;
    align-self: center;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }

  .level-2 {
    border-top: 1px solid white;
    border-right: 1px solid white;
    grid-area: pos2;
    justify-self: flex-end;
    align-self: flex-start;
    justify-content: flex-end;
    align-items: flex-start;
    z-index: 5;
  }

  .content > .box {
    top: var(--top);
    left: var(--left);
  }

  .box {
    width: var(--level1-size);
    height: var(--level1-size);
    border: 1px solid aqua;
    position: absolute;
  }

  .level-1 .box {
    width: var(--level2-size);
    height: var(--level2-size);
  }

  .level-2 .box {
    width: var(--level3-size);
    height: var(--level3-size);
  }
</style>
