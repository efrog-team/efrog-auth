<script lang="ts">
    import locs from './localisation.json'
    export let data;
    export let form;

    let loc = locs[data.lang as keyof typeof locs];

    let passVisible = false;
    let passRepeatVisible = false;
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
                <input type="text" name="token" class="form-control" id="token" value = {data.token || form?.data?.token || null} autocomplete="off" aria-hidden="true" role="presentation">
            </div>
            {/if}
            <div class="mb-3">
                <label for="password" class="form-label">{loc.password}</label>
                <div class="input-group">
                    <input type={passVisible ? "text":"password"} class="form-control" id="password" name="password" value={form?.data?.password || null} autocomplete="new-password">
                    <button class="input-group-text" on:click|preventDefault={()=>{passVisible = !passVisible}}>
                        <i class="bi-eye{passVisible ? '-slash': ''}"></i>
                    </button>
                </div>
            </div>
            <div class="mb-3">
                <label for="password-repeat" class="form-label">{loc.password_repeat}</label>
                <div class="input-group">
                    <input type={passRepeatVisible ? "text":"password"} class="form-control" id="password-repeat" name="passwordRepeat" value={form?.data?.passwordRepeat || null} autocomplete="new-password">
                    <button class="input-group-text" on:click|preventDefault={()=>{passRepeatVisible = !passRepeatVisible}}>
                        <i class="bi-eye{passRepeatVisible ? '-slash': ''}"></i>
                    </button>
                </div>
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