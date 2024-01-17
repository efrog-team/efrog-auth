export function formToObj(formData: FormData): Dictionary{
	const data: { [key: string]: any } = {};
	formData.forEach((value, key) => (data[key] = value));
	return data;
}
