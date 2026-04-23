import type { Html2PdfOptions } from "html2pdf.js";
//helper function to check if a string is a valid JSON string, return true if it is a valid JSON string, otherwise return false
export function isValidJSON(str: string) {
	try {
		JSON.parse(str);
		return true;
	} catch {
		return false;
	}
}

export const export2Pdf = async (
	refVar: React.RefObject<HTMLDivElement | null>,
	recipeName: string,
) => {
	if (!refVar.current) return;
	// Dynamic import to prevent SSR issues
	// this also ensures that html2pdf is only loaded when the user clicks the export button, improving initial load performance
	// also make it only accessible in client side, since html2pdf relies on browser APIs that are not available during server-side rendering
	const html2pdf = (await import("html2pdf.js")).default;
	const opt: Html2PdfOptions = {
		margin: 0.5,
		filename: `${recipeName}.pdf`,
		image: { type: "jpeg", quality: 0.98 },
		html2canvas: { scale: 2 },
		jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
	};

	await html2pdf().from(refVar.current).set(opt).save();
};
