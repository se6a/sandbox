<script>
  import Planet from "./Planet.svelte";
  import Flower2 from "./Flower-2.svelte";
  import Flower3 from "./Flower-3.svelte";
  import Flower4 from "./Flower-4.svelte";
  import Flower5 from "./Flower-5.svelte";
  import Flower6 from "./Flower-6.svelte";

  export let level = 0;
  export let rotator = null;
  export let rotation = 0;

  export const kmpBereiche = [
    { id: 1, name: "komp 1", active: false },
    { id: 2, name: "komp 2", active: false },
    { id: 3, name: "komp 3", active: false },
    { id: 4, name: "komp 4", active: false },
    { id: 5, name: "komp 5", active: false },
  ];

  function handleClick(e, target, _$target) {
    if (level === 0) {
      level++;
    } else if (level === 1 && target === "satelite") {
      level++;
      rotator.stop();
      const angle = parseInt(
        _$target.style.transform.match(/rotate\((\d+)deg\)/)?.[1] || 0
      );

      console.log(angle, rotation);
      rotator.set(-1 * angle + 45);
    }
  }
</script>

<Planet planetPadding={10} {rotation} onClick={handleClick}>
  <svelte:fragment slot="planet">
    <Flower5 />
  </svelte:fragment>

  <div class="satelites" slot="satelites">
    {#each kmpBereiche as kmp (kmp.id)}
      <div on:click={() => (kmp.active = true)}>
        <Planet>
          <svelte:fragment slot="planet">
            <Flower3 />
            <div style="position: absolute;">{kmp.id}</div>
          </svelte:fragment>
          <div class="satelites" slot="satelites">
            <div>1</div>
            <div>4</div>
            <div>3</div>
          </div>
        </Planet>
      </div>
    {/each}
  </div>
</Planet>

<style>
</style>
