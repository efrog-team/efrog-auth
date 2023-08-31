<script>
    import { page } from '$app/stores';
    export let form;

    let passVisible = false;
</script>
<div class="mb-4">
    <h2 class="header">Login</h2>
</div>
<div class="mb-4">
    <div>
        <form action="" method="post" novalidate>
            <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" name="username" class="form-control" id="username" value = {form?.data?.username || null}>
            </div>
            <div class="mb-4">
                <label for="password" class="form-label">Password</label>
                <div class="input-group">
                    <input type={passVisible ? "text":"password"} class="form-control" id="password" name="password" value={form?.data?.password || null}>
                    <button class="input-group-text" on:click|preventDefault={()=>{passVisible = !passVisible}}>
                        <i class="bi-eye{passVisible ? '-slash': ''}"></i>
                    </button>
                </div>
            </div>
            {#if form?.error}
                <div class="form-error form-text mb-3">{form.error}</div>
            {/if}
            <div class="mb-5">
                <button type="submit" class="btn btn-accent">Submit</button>
            </div>
            <div class="mb-3">
                <p class="form-text">
                    Немає облікового запису? <a class="nav-link reg-link" href="/register?{$page.url.searchParams.toString()}">Зареєструватись</a>
                </p>
            </div>
            <div class="mb-3">
                <p class="form-text">
                    Забули пароль? <a class="nav-link reg-link" href="/reset-password?{$page.url.searchParams.toString()}">Відновити</a>
                </p>
            </div>
        </form>
    </div>
</div>