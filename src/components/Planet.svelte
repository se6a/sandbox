<script>
  // sizes are percentages from parent:
  export let containerSize = 100;
  export let planetPadding = 10;
  export let planetSateliteRatio = [3,1]
  export let initRotation = 0;  // deg
  export let color = "white";
  export let fill = "blue";

  const mass = containerSize - planetPadding;
  const parts = (planetSateliteRatio[0] + planetSateliteRatio[1] * 2);
  const planetSize = Math.round(
      (mass / parts * planetSateliteRatio[0]) * 10
    ) / 10;
  const sateliteSize = Math.round(
      (mass / parts * planetSateliteRatio[1]) * 10
    ) / 10;

  let _$planet;
  let _$satelites;

  const cssVariables = `
    --unit: 1%;
    --containerSize: calc(var(--unit) * ${containerSize});
    --planetSize: calc(var(--unit) * ${planetSize});
    --sateliteSize: calc(var(--unit) * ${sateliteSize});
    --initRotation: ${initRotation}deg;
    --color: ${color};
    --fill: ${fill};
  `;

  function integrateSatelites() {
    _$satelites = [...(_$planet.querySelector(".satelites")?.children || [])];

    _$satelites.forEach((_$satelite, i) => {
      _$satelite.classList.add("satelite");
      _$satelite.style.transform = `
        translateX(calc(var(--unit) * ${(containerSize - sateliteSize) / 2}))
        rotate(${i * 360 / _$satelites.length}deg)
      `;

      _$satelite.addEventListener("click", sateliteClickHandler);
    });
  }

  // Problems width "--unit = 1%" when used in transform properties.
  // Solution: Calculate 1% from actual width: 
  $: if (_$planet?.clientWidth) {
    _$planet.style.setProperty("--unit", `${Math.round(_$planet?.clientWidth) / 100}px`);
  }
  // Step by step render, to get the right sizes:
  let ready = false;
  setTimeout(() => ready = true, 10);
  setTimeout(() => integrateSatelites(), 20);

  function sateliteClickHandler(e) {
    if (typeof(sateliteClick) === "function")
      sateliteClick(_$planet, e.target)
  }

</script>

{#if ready}
  <article
    class="PlanetContainer"
    style={cssVariables}
    bind:this={_$planet}
  >
    <slot name="satelites"></slot>
    <div class="planet"></div>
  </article>
{/if}

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

  :global([slot="satelites"]), :global(.satelites) {
    transform: rotate(var(--initRotation));
    transform-origin: center center;
    width: inherit;
    height: inherit;
  }

  :global(.satelite) {
    width: var(--sateliteSize);
    height: var(--sateliteSize);
    font-size: calc(var(--sateliteSize) / 2);
    transform-origin: center calc(var(--containerSize) / 2);
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>