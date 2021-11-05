<script>
  import { Router, Route } from "svelte-routing";
  import Lp21 from "./routes/lp21.svelte";
  // import DataStructure from "./routes/buildData.svelte";
  export let url = "";
</script>

<Router {url}>
  <!-- <Route path="/build-data">
    <DataStructure />
  </Route> -->
  <Route path="/">
    <Lp21 />
  </Route>
</Router>
