<script>
	import {Router, Route} from "svelte-routing";
	import Lp21 from "./routes/lp21.svelte";
	import Construction from "./routes/construction.svelte";
	import Units from "./routes/units.svelte";
	import Transitions from "./routes/transitions.svelte"
  export let url = "";
</script>

<Router url="{url}">
	<Route path="/planets">
		<Construction />
	</Route>
	<Route path="/units">
		<Units />
	</Route>
	<Route path="/lp21">
		<Lp21 />
	</Route>
	<Route path="/">
		<Transitions />
	</Route>
</Router>