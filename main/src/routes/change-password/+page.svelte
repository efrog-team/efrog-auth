<script>
    export let data;
    export let form;

    let passVisible = false;
    let passRepeatVisible = false;
</script>
<div class="mb-4">
    <h2 class="header">Set new password</h2>
</div>
<div class="mb-4">
    <div>
        <form action="" method="post" novalidate>
            {#if !data.token}
            <div class="mb-4">
                <label for="token" class="form-label">Your activation token</label>
                <input type="text" name="token" class="form-control" id="token" value = {data.token || form?.data?.token || null} autocomplete="off">
            </div>
            {/if}
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <div class="input-group">
                    <input type={passVisible ? "text":"password"} class="form-control" id="password" name="password" value={form?.data?.password || null}>
                    <button class="input-group-text" on:click|preventDefault={()=>{passVisible = !passVisible}}>
                        <i class="bi-eye{passVisible ? '-slash': ''}"></i>
                    </button>
                </div>
            </div>
            <div class="mb-3">
                <label for="password-repeat" class="form-label">Repeat password</label>
                <div class="input-group">
                    <input type={passRepeatVisible ? "text":"password"} class="form-control" id="password-repeat" name="passwordRepeat" value={form?.data?.passwordRepeat || null}>
                    <button class="input-group-text" on:click|preventDefault={()=>{passRepeatVisible = !passRepeatVisible}}>
                        <i class="bi-eye{passRepeatVisible ? '-slash': ''}"></i>
                    </button>
                </div>
            </div>
            {#if form?.error}
                <div class="form-error form-text mb-3">{form.error}</div>
            {/if}
            <div class="mb-5">
                <button type="submit" class="btn btn-accent">Submit</button>
            </div>
        </form>
    </div>
</div>