<script>
  export let level = 0;
</script>

<header class="header">
  <div class="logo">LP21</div>
  <navigation class="navigation">
    <button class="navView-1" on:click={() => (level = 0)}>level 0</button>

    <button
      class="navView-2"
      style="width: {level >= 1 ? '100%' : 0}"
      on:click={() => (level = 1)}
    >
      level 1
    </button>

    <button
      class="navView-2"
      style="width: {level >= 2 ? '100%' : 0}"
      on:click={() => (level = 2)}
    >
      level 2
    </button>
  </navigation>
</header>

<style>
  .header {
    height: 6vmin;
    display: flex;
    z-index: 30;
    position: relative;
  }

  .logo {
    width: 6vmin;
    background-color: white;
  }

  .logo,
  .navigation > * {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
  }

  .navigation {
    display: flex;
    width: 100%;
  }

  .navigation > * {
    width: 0px;
    overflow: hidden;
    transition: width 500ms;
  }

  .navigation > :first-child {
    width: 100%;
  }
</style>
