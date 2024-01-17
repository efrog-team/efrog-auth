<script lang="ts">
	import locs from "./localisation.json";

	export let data;
	export let form;

	let loc = locs[data.lang as keyof typeof locs];
</script>
<div class="mb-4">
	<h2 class="header">{loc.header}</h2>
</div>
<div class="mb-4">
	<div>
		<form action="" method="post" novalidate>
			{#if !data.token}
				<div class="mb-4">
					<label for="token" class="form-label">{loc.token}</label>
					<input type="text" name="token" class="form-control" id="token" value = {data.token || form?.data?.token || null} autocomplete="off">
				</div>
			{/if}
            
			{#if form?.error}
				<div class="form-error form-text mb-3">{form.error}</div>
			{/if}
			<div class="mb-4">
				<button type="submit" class="btn btn-accent">{loc.submit}</button>
			</div>
		</form>
	</div>
</div>