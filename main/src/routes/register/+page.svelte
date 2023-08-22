<script >
    import { page } from '$app/stores';

    export let form;

    let passVisible = false;
    let passRepeatVisible = false;
</script>

<div class="mb-4">
    <h2 class="header">Register</h2>
</div>
<div class="mb-4">
    <div >
        <form action="" method="post" novalidate>
            <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" name="username" class="form-control" id="username" aria-describedby="usernameHelp" value={form?.data?.username || null}>
                <div id="usernameHelp" class="form-text">Your unique ...</div>
            </div>
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" name="name" class="form-control" id="name" aria-describedby="nameHelp" value={form?.data?.name || null}>
                <div id="nameHelp" class="form-text">Your real name ...</div>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" name = "email" class="form-control" id="email" value={form?.data?.email || null}>
            </div>
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
            <div class="my-4 form-check">
                <input type="checkbox" class="form-check-input" id="agree" name="agree" checked={!!form?.data?.agree}>
                <label class="form-check-label" for="agree">I agree ...</label>
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
<div class="mb-5">
    <p class="form-text">
        Вже є обліковий запис? <a class="nav-link reg-link" href="/login?{$page.url.searchParams.toString()}">Увійти</a>
    </p>
</div>
