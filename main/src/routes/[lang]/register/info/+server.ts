import { resendToken } from '$lib/server/requests';
import { error, json } from '@sveltejs/kit';

export async function POST({request}) {
    const { email } = await request.json();
    try {
        await resendToken(email);
    }catch (err:any ){
        throw err;
    }
    return json(null);
}