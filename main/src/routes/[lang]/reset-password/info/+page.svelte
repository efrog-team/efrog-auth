<script lang="ts">
    import { page } from "$app/stores";
    import locs from './localisation.json'
    export let data;
    
    let loc = locs[data.lang as keyof typeof locs];
</script>
<div class="mb-3">
    <h2 class="header">{loc.header}</h2>
</div>
<div class="mb-4">
    <p>{loc.code_info}</p> 
    <p>{loc.open_problem}
        <a class="nav-link reg-link" target="_blank" href="/{data.lang}/change-password">{loc.alternative_link}</a>.</p>
</div>
<div class="mb-5">
    <a class="btn btn-accent" href="/{data.lang}/login?{$page.url.searchParams.toString()}">{loc.submit}</a>
</div>