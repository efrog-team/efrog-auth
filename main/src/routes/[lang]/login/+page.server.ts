import { fail, redirect } from "@sveltejs/kit";
import { getToken } from "$lib/server/requests.js";
import { formToObj } from "$lib/features.js";
import locs from "./localisation.json";

function validateInput(data: Dictionary, lang: string){
	const loc = locs[lang as keyof typeof locs].errors; 

	if(!data["username"]) throw new Error(loc.username);
	if(!data["password"]) throw new Error(loc.password);
}

export const actions = {
	default: async ({ request, url, params}) => {
		const formData = formToObj(await request.formData());
		let token;
		try{
			validateInput(formData, params.lang);
			token = await getToken(formData["username"], formData["password"]);
		}catch (err: any){
			if(err.status && err.status != 409 && err.status != 401){
				throw err;
			}
			return fail(422,{
				error: err.message || err.body?.message,
				data: formData
			});
		}
		throw redirect(303,`${url.searchParams.get("redirect_uri") || "" }?state=${url.searchParams.get("state")}&code=${token}`);
	}
};