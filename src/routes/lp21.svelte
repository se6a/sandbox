<script>
  import CenterMarker from "../components/dev/CenterMarker.svelte";
  import MouseCoords from "../components/dev/MouseCoords.svelte";
  import Fachbereich from "../components/Fachbereich.svelte";

  let crntView = "lp21";

  const columns = 3;
  const fachbereiche = [
    {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, 
  ];

  function movePolygon(_$fchbr, to = [0,0]) {
    const size = _$fchbr.dataset.size;
    
    const pos = [
      parseInt(_$fchbr.dataset.posx),
      parseInt(_$fchbr.dataset.posy)
    ];

    const newPos = [
      to[0] - pos[0],
      to[1] - pos[1]
    ];

    return `
      translate(
        calc(${newPos[0]}vw - ${size / 2}vmin),
        calc(${newPos[1]}vh - ${size / 2}vmin)
      )
    `;
  }

  function selectFachbereich(_$fchbr, _$corner) {
    let fchBrTransforms = [
      movePolygon(_$fchbr, [50, 50]),
      zoomIn(_$fchbr, 4)
    ].join(" ").replaceAll("\s{2,}", "");

    _$fchbr.style.transform = fchBrTransforms;

    fachbereiche
      .filter(fchbr => fchbr._$body.isEqualNode(_$fchbr) === false)
      .forEach(fchbr => moveOut(fchbr._$body));
  }

  function moveOut(_$fchbr) {
    const size = parseInt(_$fchbr.dataset.size);
    const posX = parseInt(_$fchbr.dataset.posx) + size / 2;
    const posY = parseInt(_$fchbr.dataset.posy) + size / 2;

    const newPosX = posX >= 50
      ? (50 - (posX % 50)) + 50
      : ((posX * -1) % 50) - 50;

    const newPosY = posY >= 50
      ? (50 - (posY % 50)) + 50
      : ((posY * -1) % 50) - 50;

    _$fchbr.style.transform = `
      translate(
        ${newPosX}vw,
        ${newPosY}vh
      )
    `;
  }

  function zoomIn(_$target, scale) {
    // Move out of viewport:
    const _$fachbereiche_out = [...document.querySelectorAll(".fchBr")]
      .filter(_$p => _$p.isEqualNode(_$target) === false);

    _$fachbereiche_out.forEach(_$p => {
        moveOut(_$p)
    });

    // Scale target:
    return `scale(${scale})`;
  }

  function toCorner(_$fchbr, _$corner) {
    const deg = (_$corner.dataset.index) * 60 - 30;
    _$fchbr.querySelector("svg").style.animation = `unset`;
    _$fchbr.querySelector("svg").style.transform = `rotate(-${deg}deg)`;
  }

  const prepPols = (fachbereiche, cols) => {
    const colWidth = Math.floor(100 / cols);

    const prepPols = [];
    
    for (let i = 0; i < fachbereiche.length; i ++) {
      const fchBr = fachbereiche[i];
      const col = i % cols;
      const space = 10;
      const size = Math.floor(colWidth - space);
      const randX = Math.round(Math.random() * space);
      const randY = Math.round(Math.random() * space);

      const posX = (col * colWidth) + randX;
      const posY = (Math.floor(i / cols) * colWidth) + randY;

      fchBr.pos = [posX, posY];
      fchBr.size = size;

      prepPols.push(fchBr);
    }

    return prepPols;
  }

</script>

<main>
  <CenterMarker />
  <MouseCoords />

  {#each prepPols(fachbereiche, columns) as p, i}
    <Fachbereich
      bind:_$fachbereich={p._$body}
      bind:_$satelite={p._$satelites}
      size={p.size}
      pos={p.pos}
      onclick={selectFachbereich}
      fill={"red"}
    />
  {/each}

</main>

<style>
  main {
    height: inherit;
    width: inherit;
    border: 2px solid black;
    overflow: hidden;
  }
</style>