<script>
    export let form;
</script>
<div class="mb-4">
    <h2 class="header">Reset Password</h2>
</div>
<div class="mb-4">
    <div>
        <form action="" method="post" novalidate>
            <div class="mb-4">
                <label for="email" class="form-label">Your email</label>
                <input type="text" name="email" class="form-control" id="email" value = {form?.data?.email || null}>
                <div class="form-text">On this email you will recieve verification code.</div>
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