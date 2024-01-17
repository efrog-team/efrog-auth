import { resendToken } from "$lib/server/requests";
import { json } from "@sveltejs/kit";

export async function POST({request}) {
	const { email } = await request.json();
	await resendToken(email);

	return json(null);
}