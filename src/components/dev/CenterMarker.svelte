<script>
  export let color = "tomato";
  export let side = "11px";
  export let line = "1px";

  const cssVariables = `
    --color: ${color};
    --side: ${side};
    --line: ${line};
  `;
</script>

<article class="screenCenter" style={cssVariables}>
  <div class="cross">
    <span class="line"></span>
    <span class="line"></span>
  </div>
</article>

<style>
  .screenCenter {
    position: fixed;
    height: 100%;
    width: 100%;
    pointer-events: none;
    z-index: 1000;
  }

  .screenCenter, .cross {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .cross {
    height: var(--side);
    width: var(--side);
    position: relative;
  }

  .line {
    height: var(--line);
    width: 100%;
    background-color: var(--color);
    display: block;
    position: absolute;
  }

  .line:last-child {
    transform: rotate(90deg);
  }
</style>