<script lang="ts">
    import { page } from '$app/stores';
    import locs from './localisation.json'
    export let form;
    export let data;

    let loc = locs[data.lang as keyof typeof locs];
    let passVisible = false;
</script>
<div class="mb-4">
    <h2 class="header">{loc.header}</h2>
</div>
<div class="mb-4">
    <div>
        <form action="" method="post" novalidate>
            <div class="mb-3">
                <label for="username" class="form-label">{loc.username}</label>
                <input type="text" name="username" class="form-control" id="username" value = {form?.data?.username || null} autocomplete="username">
            </div>
            <div class="mb-4">
                <label for="password" class="form-label">{loc.password}</label>
                <div class="input-group">
                    <input type={passVisible ? "text":"password"} class="form-control" id="password" name="password" value={form?.data?.password || null} autocomplete="current-password">
                    <button type="button" class="input-group-text" on:click={()=>{passVisible = !passVisible}} tabindex="-1">
                        <i class="bi-eye{passVisible ? '-slash': ''}"></i>
                    </button>
                </div>
            </div>
            {#if form?.error}
                <div class="form-error form-text mb-3">{form.error}</div>
            {/if}
            <div class="mb-5">
                <button type="submit" class="btn btn-accent">{loc.submit}</button>
            </div>
            <div class="mb-3">
                <span class="form-text">
                    {loc.no_account} <a class="nav-link reg-link" href="/{data.lang}/register?{$page.url.searchParams.toString()}">{loc.register}</a>
                </span>
            </div>
            <div class="mb-3">
                <span class="form-text">
                    {loc.password_forgot} <a class="nav-link reg-link" href="/{data.lang}/reset-password?{$page.url.searchParams.toString()}">{loc.restore}</a>
                </span>
            </div>
        </form>
    </div>
</div>