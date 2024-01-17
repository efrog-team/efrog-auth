import { fail, redirect } from "@sveltejs/kit";
import { verify } from "$lib/server/requests.js";
import { formToObj } from "$lib/features.js";

export function load({url}) {
	return {
		token: url.searchParams.get("token")
	};
}

export const actions = {
	default: async ({ request, url, params}) => {
		const formData = formToObj(await request.formData());
		try{
			await verify(formData["token"] || url.searchParams.get("token") || "");
		}catch (err: any){
			if(err.status && err.status != 409 && err.status != 401){
				throw err;
			}
			return fail(422,{
				error: err.message || err.body?.message,
				data: formData
			});
		}
		throw redirect(303, `/${params.lang}/verify-email/success`);
	}
};