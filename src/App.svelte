<script>
  import { Router, Route } from "svelte-routing";
	import Polygons from "./routes/Polygons.svelte";
	import MoveXYZ_rem from "./routes/MoveXYZ-rem.svelte";
	import MoveXYZ from "./routes/MoveXYZ.svelte";
	import MoveXZ from "./routes/MoveXZ.svelte";


  export let url = "";
</script>

<Router url="{url}">
	<Route path="/">
		<Polygons />
	</Route>

	<Route path="/xyz-rem">
		<MoveXYZ_rem />
	</Route>
</Router>