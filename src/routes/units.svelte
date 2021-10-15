<main>
  <div class="outer">
    <div class="inner"></div>
  </div>
</main>

<style>
  main {
    background-color: khaki;
    height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .outer {
    position: relative;
    width: 300px;
    height: 300px;
    font-size: 100%;
    background-color: lightblue;
    --unit: 1%;
  }

  .inner {
    position: absolute;
    width: calc(var(--unit) * 50);
    height: calc(var(--unit) * 100);
    background-color: white;
  }
</style>