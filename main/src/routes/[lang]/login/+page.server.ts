import { fail, redirect, error } from '@sveltejs/kit';
import { getToken } from '$lib/server/requests.js'
import { formToObj } from '$lib/features.js'
import locs from './localisation.json'

function validateInput(data: FormData, lang: string){
	let loc = locs[lang].errors; 

	if(!data.get("username")) throw new Error(loc.username);
	if(!data.get("password")) throw new Error(loc.password);
}

export const actions = {
	default: async ({ request, url, params}) => {
		const formData = await request.formData();
		let token;
		try{
			validateInput(formData, params.lang);
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