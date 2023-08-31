import { error, fail, redirect } from '@sveltejs/kit';
import { create, getToken } from '$lib/server/requests.js'
import { formToObj } from '$lib/features.js'

let emailCheck = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
let usernameCheck = new RegExp(/^[A-Za-z][A-Za-z0-9_]{2,}$/)

function validateInput(data: FormData){
	if(!data.get("username")?.match(usernameCheck)) throw new Error("Bad username");
	if(data.get("name")?.length == 0) throw new Error("Name is required");
	if(!data.get("email")?.match(emailCheck)) throw new Error("Not an email");
	if(data.get("password")?.length < 8) throw new Error("Password must have at least 8 symbol");
	if(data.get("passwordRepeat") != data.get("password")) throw new Error("Passwords must be equal");
	if(!data.get("agree")) throw new Error("You must agree");
}

export const actions = {
	default: async ({ request, url}) => {
		const formData = await request.formData();
		try{
			validateInput(formData); 
			await create(formData.get("username"), formData.get("email"), formData.get("name"), formData.get("password"));
		}catch (err){
			if(err.status && err.status != 409 && err.status != 401){
				throw err;
			}
			if(err.status == 401){
				throw redirect(303, `./info?${url.searchParams.toString()}`);
			}
			return fail(422,{
				error: err.message || err.body?.message,
				data: formToObj(formData)
			});
		}
		throw redirect(303, `/register/info?${url.searchParams.toString()}`);
	}
}