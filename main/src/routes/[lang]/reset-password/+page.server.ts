import { fail, redirect, error } from '@sveltejs/kit';
import { resetPassword } from '$lib/server/requests.js'
import { formToObj } from '$lib/features.js'
import locs from './localisation.json'


let emailCheck = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

export const actions = {
	default: async ({ request, url, params}) => {
		const formData = await request.formData();
		try{
			if(!formData.get("email")?.match(emailCheck)) throw new Error(locs[params.lang].errors.email);
			await resetPassword(formData.get("email") || "");
		}catch (err){
			if(err.status && err.status != 409 && err.status != 401){
				throw err;
			}
			return fail(422,{
				error: err.message || err.body?.message,
				data: formToObj(formData)
			});
		}
		throw redirect(303, `/${params.lang}/reset-password/info?${url.searchParams.toString()}`);
	}
}