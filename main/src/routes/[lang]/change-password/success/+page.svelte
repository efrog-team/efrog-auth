<script lang="ts">
	import locs from "./localisation.json";
	export let data;

	let loc = locs[data.lang as keyof typeof locs];
</script>

<div class="mb-3">
	<h2 class="header">{loc.header}</h2>
</div>
<div class="mb-4">
	<p>{@html loc.info}</p>
</div>