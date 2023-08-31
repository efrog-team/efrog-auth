<script>
    export let data;
    export let form;
</script>
<div class="mb-4">
    <h2 class="header">Verify email</h2>
</div>
<div class="mb-4">
    <div>
        <form action="" method="post" novalidate>
            {#if !data.token}
            <div class="mb-4">
                <label for="token" class="form-label">Your activation token</label>
                <input type="text" name="token" class="form-control" id="token" value = {data.token || form?.data?.token || null}>
            </div>
            {/if}
            
            {#if form?.error}
                <div class="form-error form-text mb-3">{form.error}</div>
            {/if}
            <div class="mb-5">
                <button type="submit" class="btn btn-accent">Verify</button>
            </div>
        </form>
    </div>
</div>