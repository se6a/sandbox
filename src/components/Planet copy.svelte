<script>
  // Sizes in vmin:
  export let containerSize = 50;
  export let planetPadding = 10;
  export let planetSateliteRatio = [3,1]
  export let satelites = 5;
  export let color = "white";
  export let fill = "blue";

  let _$planet;

  const mass = containerSize - planetPadding;
  const parts = (planetSateliteRatio[0] + planetSateliteRatio[1] * 2);

  const planetSize = Math.round(
      (mass / parts * planetSateliteRatio[0]) * 10
    ) / 10;
  const sateliteSize = Math.round(
      (mass / parts * planetSateliteRatio[1]) * 10
    ) / 10;    // vmin


  export let initRotation = 0;      // deg

  const cssVariables = `
    --containerSize: ${containerSize}vmin;
    --planetSize: ${planetSize}vmin;
    --sateliteSize: ${sateliteSize}vmin;
    --satelites: ${satelites};
    --initRotation: ${initRotation}deg;
    --color: ${color};
    --fill: ${fill};
  `;

  function sateliteClickHandler(e) {
    if (typeof(sateliteClick) === "function")
      sateliteClick(_$planet, e.target)
  }
</script>

<article bind:this={_$planet} class="PlanetContainer" style={cssVariables}>
  <div class="satelites">
    {#each {length: satelites} as _, i}
      <div
        class="satelite"
        style={`transform:
          translate(  ${(containerSize - sateliteSize) / 2}vmin, 0)
          rotate(${i * 360/satelites}deg)
        `}
        on:click={sateliteClickHandler}
      >
      </div>
    {/each}
  </div>

  <slot name="satelite"  style="color: black">1</slot>

  <div class="planet"></div>
</article>

<style>
  .PlanetContainer {
    height: var(--containerSize);
    width: var(--containerSize);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color);
  }

  .planet {
    width: var(--planetSize);
    height: var(--planetSize);
    background-color: var(--fill);
    position: absolute;
    border-radius: 100%;
  }

  .satelites {
    transform: rotate(var(--initRotation));
    transform-origin: center center;
    width: inherit;
    height: inherit;
  }

  .satelite {
    width: var(--sateliteSize);
    height: var(--sateliteSize);
    font-size: calc(var(--sateliteSize) / 2);
    transform-origin: center calc(var(--containerSize) / 2);
    background-color: var(--fill);
    position: absolute;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>