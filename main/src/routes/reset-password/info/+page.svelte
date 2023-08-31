<script>
    import { page } from "$app/stores";

</script>
<div class="mb-3">
    <h2 class="header">Reset Password</h2>
</div>
<div class="mb-4">
    <p>We have sent a verification code to your email. Please follow the attached link to change your password.</p> 
    <p>If you are unable to open the link directly from your email, please follow the 
        <a class="nav-link reg-link" target="_blank" href="/change-password">alternative link</a>.</p>
</div>
<div class="mb-5">
    <a class="btn btn-accent" href="/login?{$page.url.searchParams.toString()}">Done</a>
</div>