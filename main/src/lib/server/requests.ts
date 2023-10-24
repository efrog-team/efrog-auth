import { serverUrl } from "$lib/config";
import { error } from '@sveltejs/kit';

async function request(method:string, url: string , data: any){
    let options: RequestInit = {
        method, 
        headers: {
            "Content-Type": "application/json",
        },
    }
    if(data) options.body = JSON.stringify(data);
    const response = await fetch(serverUrl + url, options);

    // if there is an Internal Server Error
    if(response.status == 500){
        throw error(500, response.statusText+"*")
    }

    const json = await response.json();
    if(response.ok){
        return {status: response.status, body: json};
    }

    throw error(response.status, json.detail || "Undescribed error");
}

export async function create(username: string, email: string, name: string, password: string){
    await request("POST", "/users", {username, email, name, password});
}

export async function getToken(username: string, password: string): Promise<string> {
    let {body} = await request("POST", "/token", {username, password});
    return body.token;
}

export async function verify(token: string){
    await request("POST", "/users/email/verify", {token});
}

export async function resetPassword(email: string) {
    await request("GET", `/users/password/reset/token/email/${email}`, null);
}

export async function newPassword(token: string, password: string){
    await request("POST", `/users/password/reset`, {token, password});
}

export async function resendToken(email: string){
    await request("GET", `/users/email/${email}/resend-token`, null);
}