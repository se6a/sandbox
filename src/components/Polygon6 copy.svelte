<script>
  import CenterMarker from "./dev/CenterMarker.svelte";

  export let _$polygon;
  export let _$corners = [];
  export let classes = "";
  export let fill = "white";
  export let pos = [0, 0];
  export let size = 50;
  export let onclick = null;

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
      onclick(_$polygon, _$corner);
    }
  };

</script>

<article bind:this={_$polygon} class={`polygon ${classes}`.trim()} data-size="{size}" data-posx="{pos[0]}" data-posy="{pos[1]}" style={cssVariables}>
  <svg xmlns="http://www.w3.org/2000/svg" style="overflow: visible" viewBox="0 0 117.25 129.32">
    <g id="svgLayer2" data-name="Layer 2">
      <g id="svgLayer1" data-name="Layer 1">
        <path class="svgPath1" d="M43.87,6.69a19.61,19.61,0,0,1,29.51,0,53.19,53.19,0,0,0,28.07,16.2h0a19.62,19.62,0,0,1,14.76,25.56h0a53.11,53.11,0,0,0,0,32.4h0a19.62,19.62,0,0,1-14.76,25.56,53.14,53.14,0,0,0-28.07,16.21h0a19.62,19.62,0,0,1-29.51,0h0a53.08,53.08,0,0,0-28.06-16.21h0A19.61,19.61,0,0,1,1.05,80.86a53,53,0,0,0,0-32.4h0A19.61,19.61,0,0,1,15.81,22.9,53.13,53.13,0,0,0,43.87,6.7Z"/>
          {#each coords as coord, i}
            <foreignObject
              bind:this={_$corners[i]}
              class="polygonCorner"
              x="{coord.x}"
              y="{coord.y}"
              width="22"
              height="22"
              data-index="{i}"
            >
              <div class="polygonIcon" on:click={() => clickHandler(_$corners[i])}>
                <CenterMarker color="lightgreen" side="4px" line=".5px"/>
                {i+1}
              </div>
            </foreignObject>>
        {/each}
      </g>
    </g>
  </svg>
</article>

<style>
  .polygon {
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

  .polygon > svg {
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

  .polygonIcon {
    border: 1px dotted white;
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
</style>
