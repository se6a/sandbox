<script>
  import Planet from "../components/Planet.svelte"
</script>

<main>

  <Planet
    satelites={5}
    planetPadding={10}
  />

</main>


<style>
  main {
    background-color: antiquewhite;
    height: inherit;
    width: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
