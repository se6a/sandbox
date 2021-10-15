<script>
  import Planet from "./Planet.svelte";
  import Kompetenz from "./Kompetenz.svelte";

  let _$kompetenzbereich;
  const kmps = Math.round(Math.random() * 4 + 2);
</script>

<div
  class="kompetenzbereich"
  bind:this={_$kompetenzbereich}
>
  <Planet containerSize={100} planetPadding={40} planetSateliteRatio={[3,1]}>
    <div class="satelites" slot="satelites">

      {#each {length: kmps} as _, i}
        <Kompetenz />
      {/each}

    </div>
  </Planet>
</div>

<style>
</style>
