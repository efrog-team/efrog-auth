import { fail, redirect } from "@sveltejs/kit";
import { create } from "$lib/server/requests.js";
import { formToObj } from "$lib/features.js";
import locs from "./localisation.json";

const emailCheck = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
const usernameCheck = new RegExp(/^[A-Za-z][A-Za-z0-9_]{2,}$/);

function validateInput(data: Dictionary, lang: string){
	const loc = locs[lang as keyof typeof locs].errors;

	if(!data["username"]?.match(usernameCheck)) throw new Error(loc.username);
	if(data["name"]?.length == 0) throw new Error(loc.name);
	if(!data["email"]?.match(emailCheck)) throw new Error(loc.email);
	if(data["password"]?.length < 8) throw new Error(loc.password);
	if(data["passwordRepeat"] != data["password"]) throw new Error(loc.password_repeat);
	//if(!data.get("agree")) throw new Error(loc.agreement);
}

export const actions = {
	default: async ({ request, url, params}) => {
		const formData = formToObj(await request.formData());
		try{
			validateInput(formData, params.lang); 
			await create(formData["username"], formData["email"], formData["name"], formData["password"]);
		}catch (err: any){
			if(err.status && err.status != 409 && err.status != 401){
				throw err;
			}
			if(err.status == 401){
				throw redirect(303, `./info?${url.searchParams.toString()}`);
			}
			return fail(422,{
				error: err.message || err.body?.message,
				data: formData
			});
		}
		throw redirect(303, `/${params.lang}/register/info?${url.searchParams.toString()}&email=${formData["email"]}`);
	}
};