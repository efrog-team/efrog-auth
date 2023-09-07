<script lang="ts">
    import locs from './localisation.json'
    export let form;
    export let data;

    let loc = locs[data.lang as keyof typeof locs];
</script>
<div class="mb-4">
    <h2 class="header">{loc.header}</h2>
</div>
<div class="mb-4">
    <div>
        <form action="" method="post" novalidate>
            <div class="mb-4">
                <label for="email" class="form-label">{loc.email}</label>
                <input type="text" name="email" class="form-control" id="email" value = {form?.data?.email || null}>
                <div class="form-text">{loc.email_help}</div>
            </div>
            {#if form?.error}
                <div class="form-error form-text mb-3">{form.error}</div>
            {/if}
            <div class="mb-5">
                <button type="submit" class="btn btn-accent">{loc.submit}</button>
            </div>
        </form>
    </div>
</div>