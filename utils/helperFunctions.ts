export function isValidJSON(str: string) {
	try {
		JSON.parse(str);
		return true;
	} catch {
		return false;
	}
}
