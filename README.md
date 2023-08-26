# Authorization Instructions

## Step 1: Craft Authorization URL

To begin the authorization process, you need to craft a URL with specific parameters and direct the user's browser to it. The URL format is as follows:
```
http://localhost:4189/method?response_type=code&redirect_uri=https://your-app/callback&state=xcoivjuywkdkhvusuye3kch
```

- `method`: Replace this with either `login` or `register` to specify the action.
- `redirect_uri`: Provide the URL where your application server will receive the registration details.
- `state`: This parameter is used to store request-specific data and prevent CSRF attacks. Choose a secure random value.

## Step 2: User Authorization

 After completing the authorization process, the user's browser will be redirected to the URL that looks like the following:
```
https://your-app/callback?code=asd13kkjhjh&state=xcoivjuywkdkhvusuye3kch
```

- `code`: This represents the authorization token that should be stored on the client for future server access.
- `state`: This value matches the state parameter from the authorization request.
