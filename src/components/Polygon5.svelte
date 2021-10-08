<script>
  import CenterMarker from "./dev/CenterMarker.svelte";

  export let classes = "";
  export let fill = "white";
  export let pos = [0, 0];
  export let size = 1.0;
  export let onclick = null;
  
  let _$polygon;
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
    --left: ${pos[0]}rem;
    --top: ${pos[1]}rem;
    --size: ${size * 30}rem;
  `;

  const clickHandler = (_$corner) => {
    if (typeof(onclick) === "function") {
      onclick(_$polygon, _$corner);
    }
  };

</script>

<article bind:this={_$polygon} class={`polygon ${classes}`.trim()} data-posx="20%" data-posy="40%" style={cssVariables}>
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
    /* margin-top: var(--top); */
    /* margin-left: var(--left); */
    width: var(--size);
    position: relative;
    border: 1px dashed white;
  }

  .svgPath1 {
    fill: var(--fill);
  }

  .polygonIcon {
    box-sizing: border-box;
    border: 1px solid black;
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    font-size: 0.5vmin;
  }
</style>
