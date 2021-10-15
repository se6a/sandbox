<script>
  import CenterMarker from "./dev/CenterMarker.svelte";
  import Planet from "./Planet.svelte";

  export let fill = "white";
  export let pos = [0, 0];
  export let size = 50;
  export let onclick = null;

  let _$fachbereich;
  const _$corners = [];

  const coords = [
    {x: 47.63, y: 3.64},
    {x: 90.94, y: 28.65},
    {x: 90.94, y: 78.67},
    {x: 47.63, y: 103.68},
    {x: 4.31, y: 78.67},
    {x: 4.31, y: 28.65}
  ];

  const cssVariables = `
    --fill: ${fill};
    --left: ${pos[0]}vw;
    --top: ${pos[1]}vh;
    --size: ${size}vmin;
    --rotationTime: ${100 + Math.round(Math.random() * 100)}s;
  `;

  const clickHandler = (_$corner) => {
    if (typeof(onclick) === "function") {
      onclick(_$fachbereich, _$corner);
    }
  };

</script>

<div class="fachbereich" bind:this={_$fachbereich} data-size="{size}" data-posx="{pos[0]}" data-posy="{pos[1]}" style={cssVariables}>
  <Planet containerSize={size} planetPadding={3}>
    <div class="satelites" slot="satelites">

      {#each {length: 5} as _, i}
        <div>
          <Planet containerSize={3} planetPadding={1}>
            <div class="satelites" slot="satelites">
              {#each {length: 3} as _, i}
                <div class="kompetenz">i</div>
              {/each}
            </div>
          </Planet>
        </div>
      {/each}

    </div>
  </Planet>
</div>

<style>
  .fachbereich {
    width: var(--size);
    height: var(--size);
    position: absolute;
    left: var(--left);
    top: var(--top);
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 1000ms;
    transform-origin: center;
  }

  .fachbereich > svg {
    animation-name: rotate;
    animation-duration: var(--rotationTime);
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  @keyframes rotate {
    from {transform: rotate(0deg)}
    to {transform: rotate(360deg)}
  }

  .svgPath1 {
    fill: var(--fill);
  }

  .fachbereichIcon {
    border: 1px dotted white;
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
  }

  .kompetenz {
    background-color: blue;
  }
</style>
