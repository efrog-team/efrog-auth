import { fail, redirect } from "@sveltejs/kit";
import { resetPassword } from "$lib/server/requests.js";
import { formToObj } from "$lib/features.js";
import locs from "./localisation.json";


const emailCheck = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);

export const actions = {
	default: async ({ request, url, params}) => {
		const formData = formToObj(await request.formData());
		try{
			if(!formData["email"]?.match(emailCheck)) throw new Error(locs[params.lang as keyof typeof locs].errors.email);
			await resetPassword(formData["email"] || "");
		}catch (err: any){
			if(err.status && err.status != 409 && err.status != 401){
				throw err;
			}
			return fail(422,{
				error: err.message || err.body?.message,
				data: formData
			});
		}
		throw redirect(303, `/${params.lang}/reset-password/info?${url.searchParams.toString()}`);
	}
};