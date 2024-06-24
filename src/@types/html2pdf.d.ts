declare module 'html2pdf.js' {
  export default function html2pdf(element: HTMLElement, options?: Html2PdfOptions): void;

  interface Html2PdfOptions {
    margin?: number;
    filename?: string;
    image?: {
      type?: 'jpeg' | 'png';
      quality?: number;
    };
    html2canvas?: {
      scale?: number;
    };
    jsPDF?: {
      unit?: 'pt' | 'mm' | 'cm' | 'in';
      format?: 'a3' | 'a4' | 'a5' | 'letter' | 'legal';
      orientation?: 'p' | 'l';
    };
  }
}
