export function formToObj(formData: FormData): any{
	const data: { [key: string]: any } = {};
	formData.forEach((value, key) => (data[key] = value));
	return data;
}
