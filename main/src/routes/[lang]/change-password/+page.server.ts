import { fail, redirect } from "@sveltejs/kit";
import { newPassword } from "$lib/server/requests.js";
import { formToObj } from "$lib/features.js";
import locs from "./localisation.json";

export function load({url}) {
	return {
		token: url.searchParams.get("token")
	};
}

function validateInput(data: Dictionary, lang: string) {
	const loc = locs[lang as keyof typeof locs].errors;

	if(data["password"]?.length < 8) throw new Error(loc.password);
	if(data["passwordRepeat"] != data["password"]) throw new Error(loc.password_repeat);
}

export const actions = {
	default: async ({ request, url, params}) => {
		const formData = formToObj(await request.formData());
		try{
			validateInput(formData, params.lang);
			await newPassword(formData["token"] || url.searchParams.get("token") || "", formData["password"] || "");
		}catch (err:  any){
			if(err.status && err.status != 409 && err.status != 401){
				throw err;
			}
			return fail(422,{
				error: err.message || err.body?.message,
				data: formData
			});
		}
		throw redirect(303, `/${params.lang}/change-password/success`);
	}
};