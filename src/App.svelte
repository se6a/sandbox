<script>
  import { Router, Route } from "svelte-routing";
  import Construction from "./routes/construction.svelte";
  export let url = "";
</script>

<Router {url}>
  <Route path="/">
    <Construction />
  </Route>
</Router>
