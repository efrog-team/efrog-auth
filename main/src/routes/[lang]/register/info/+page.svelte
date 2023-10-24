<script lang="ts">
    import { page } from "$app/stores";
    import { json } from "@sveltejs/kit";
    import locs from './localisation.json'

    export let data;

    let loc = locs[data.lang as keyof typeof locs];

    async function resendToken(){
        if(!data.email) alert("Invalid email parameter");
        let response = await fetch("./info", {
            method:"POST",
            body: JSON.stringify({email: data.email})
        });
        if(!response.ok) alert(response.statusText);
    }
</script>
<div class="mb-3">
    <h2 class="header">{loc.header}</h2>
</div>
<div class="mb-4">
    <p>{loc.code_info}</p> 
    <p>{loc.open_problem}
        <a class="nav-link reg-link" target="_blank" href="/{data.lang}/verify-email">{loc.alternative_link}</a>.</p>
</div>
<div class="mb-4">
    <a class="btn btn-accent" href="/{data.lang}/login?{$page.url.searchParams.toString()}">{loc.submit}</a>
</div>
<div class="mb-5">
    <p class="form-text"><button class="nav-link reg-link" on:click={resendToken}>Resend token</button></p>
</div>
