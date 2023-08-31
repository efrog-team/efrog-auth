import { fail, redirect, error } from '@sveltejs/kit';
import { getToken } from '$lib/server/requests.js'
import { formToObj } from '$lib/features.js'

function validateInput(data: FormData){
	if(!data.get("username")) throw new Error("Username is required");
	if(!data.get("password")) throw new Error("Password is required");
}

export const actions = {
	default: async ({ request, url}) => {
		const formData = await request.formData();
		let token;
		try{
			validateInput(formData);
			token = await getToken(formData.get("username"), formData.get("password"));
		}catch (err){
			if(err.status && err.status != 409 && err.status != 401){
				throw err;
			}
			return fail(422,{
				error: err.message || err.body?.message,
				data: formToObj(formData)
			});
		}
		throw redirect(303,`${url.searchParams.get("redirect_uri") || "" }?state=${url.searchParams.get("state")}&code=${token}`);
	}
}