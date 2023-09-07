import { localisations } from '$lib/config.js';
import { error } from '@sveltejs/kit';

export function load({params}) {
    if(!localisations.includes(params.lang)) throw error(404, "Not Found");

    return {
        lang: params.lang
    }
}