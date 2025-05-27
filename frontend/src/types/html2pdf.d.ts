// declare module "html2pdf.js";

declare module "html2pdf.js" {
	interface PdfOptions {
		margin?: number;
		filename?: string;
		image?: { type?: string; quality?: number };
		html2canvas?: { scale?: number };
		jsPDF?: { unit?: string; format?: string; orientation?: string };
	}

	interface PdfGenerator {
		from: (source: HTMLElement) => PdfGenerator;
		set: (options: PdfOptions) => PdfGenerator;
		save: () => Promise<void>;
	}

	const html2pdf: () => PdfGenerator;

	export default html2pdf;
}
