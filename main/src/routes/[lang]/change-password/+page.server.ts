import { fail, redirect, error } from '@sveltejs/kit';
import { newPassword } from '$lib/server/requests.js'
import { formToObj } from '$lib/features.js'
import locs from './localisation.json'

export function load({url}) {
	return {
		token: url.searchParams.get("token")
	}
}

function validateInput(data: FormData, lang: string) {
	let loc = locs[lang].errors;

	if(data.get("password")?.length < 8) throw new Error(loc.password);
	if(data.get("passwordRepeat") != data.get("password")) throw new Error(loc.password_repeat);
}

export const actions = {
	default: async ({ request, url, params}) => {
		const formData = await request.formData();
		try{
			validateInput(formData, params.lang);
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
		throw redirect(303, `/${params.lang}/change-password/success`);
	}
}