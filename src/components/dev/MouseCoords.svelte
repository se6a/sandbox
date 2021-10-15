<script>
  export let color = "black";
  let _$coordX, _$coordY;
  const cssVariables = `--color: ${color}`;

  document.body.addEventListener(
    "mousemove",
    (e) => {
      _$coordX.innerHTML = e.clientX;
      _$coordY.innerHTML = e.clientY;
    }
  );

  document.body.addEventListener(
    "mouseleave",
    () => {
      _$coordX.innerHTML = _$coordY.innerHTML = "-";
    }
  );
</script>

<article class="mouseCoordinates" style={cssVariables}>
  <div id="coordX" bind:this={_$coordX}>
    <div>x</div>
    <span class="display">0</span>
  </div>
  <div id="coordY" bind:this={_$coordY}>
    <div>y</div>
    <span class="display">0</span>
  </div>
</article>

<style>
  .mouseCoordinates {
    position: absolute;
    font-size: 2vmin;
    padding: 2vmin;
    width: 20vmin;
    display: flex;
    color: var(--color);
  }

  .mouseCoordinates > * {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 50%;
    text-align: center;
    display: flex;
  }

  .mouseCoordinates .display {
    margin-left: .5vmin;
  }
</style>