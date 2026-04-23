declare module "html2pdf.js" {
	interface Html2PdfOptions {
		margin?: number | [number, number, number, number];
		filename?: string;
		image?: { type?: "jpeg" | "png" | "webp"; quality?: number };
		html2canvas?: { scale: number; useCORS?: boolean };
		jsPDF?: {
			unit: string;
			format: string;
			orientation: "portrait" | "landscape" | undefined;
		};
	}

	interface Html2PdfWorker {
		from(element: HTMLElement | string): Html2PdfWorker;
		set(options: Html2PdfOptions): Html2PdfWorker;
		toContainer(): Html2PdfWorker;
		toCanvas(): Html2PdfWorker;
		toImg(): Html2PdfWorker;
		toPdf(): Html2PdfWorker;
		save(): Promise<void>;
		// output(type: string, options?: any): Promise<any>;
	}

	function html2pdf(): Html2PdfWorker;
	function html2pdf(
		element: HTMLElement | string,
		options?: Html2PdfOptions,
	): Promise<void>;

	export default html2pdf;
	export type { Html2PdfOptions };
}
