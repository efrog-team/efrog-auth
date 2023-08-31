import { fail, redirect, error } from '@sveltejs/kit';
import { newPassword } from '$lib/server/requests.js'
import { formToObj } from '$lib/features.js'

export function load({url}) {
	return {
		token: url.searchParams.get("token")
	}
}

function validateInput(data: FormData) {
	if(data.get("password")?.length < 8) throw new Error("Password must have at least 8 symbol");
	if(data.get("passwordRepeat") != data.get("password")) throw new Error("Passwords must be equal");
}

export const actions = {
	default: async ({ request, url}) => {
		const formData = await request.formData();
		try{
			validateInput(formData);
			await newPassword(formData.get("token") || url.searchParams.get("token") || "", formData.get("password") || "");
		}catch (err){
			if(err.status && err.status != 409 && err.status != 401){
				throw err;
			}
			return fail(422,{
				error: err.message || err.body?.message,
				data: formToObj(formData)
			});
		}
		throw redirect(303, "/change-password/success");
	}
}