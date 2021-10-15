<script>
	import {Router, Route} from "svelte-routing";
	import Lp21 from "./routes/lp21.svelte";
	import Construction from "./routes/construction.svelte";
	import Units from "./routes/units.svelte";
  export let url = "";
</script>

<Router url="{url}">
	<Route path="/planets">
		<Construction />
	</Route>
	<Route path="/units">
		<Units />
	</Route>
	<Route path="/">
		<Lp21 />
	</Route>
</Router>