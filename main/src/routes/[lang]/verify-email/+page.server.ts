import { fail, redirect, error } from '@sveltejs/kit';
import { verify } from '$lib/server/requests.js'
import { formToObj } from '$lib/features.js'

export function load({url}) {
	return {
		token: url.searchParams.get("token")
	}
}

export const actions = {
	default: async ({ request, url, params}) => {
		const formData = await request.formData();
		try{
			await verify(formData.get("token") || url.searchParams.get("token") || "");
		}catch (err){
			if(err.status && err.status != 409 && err.status != 401){
				throw err;
			}
			return fail(422,{
				error: err.message || err.body?.message,
				data: formToObj(formData)
			});
		}
		throw redirect(303, `/${params.lang}/verify-email/success`);
	}
}