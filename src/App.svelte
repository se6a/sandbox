<script>
  import { Router, Route } from "svelte-routing";
	import MoveContent from "./routes/MoveContent.svelte";
	import MoveCanvas from "./routes/MoveCanvas.svelte";

  export let url = "";
</script>

<Router url="{url}">
	<Route path="test-move-content">
		<MoveContent />
	</Route>

	<Route path="test-move-canvas">
		<MoveCanvas />
	</Route>
</Router>