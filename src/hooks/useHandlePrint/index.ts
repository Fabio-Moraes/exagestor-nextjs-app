'use client';

import { useReactToPrint } from 'react-to-print';

type PropType = {
  title?: string;
  download?: boolean;
  elementRef: React.RefObject<HTMLDivElement>;
  onAfterPrint: () => void;
  onBeforePrint?: () => void | Promise<unknown>;
  jsPDF?: {
    unit?: 'pt' | 'mm' | 'cm' | 'in';
    format?: 'a3' | 'a4' | 'a5' | 'letter' | 'legal';
    orientation?: 'p' | 'l';
  };
};
export const useHandlePrint = (props: PropType) => {
  const {
    onBeforePrint,
    onAfterPrint,
    elementRef,
    download,
    title = 'This Document',
    jsPDF = { unit: 'mm', format: 'a5', orientation: 'p' }
  } = props;

  const reactToPrint = useReactToPrint({
    content: () => elementRef?.current,
    documentTitle: title,
    copyStyles: true,
    pageStyle: `
    @media print {
      @page { margin: 0; }
    }
    body {
      -webkit-print-color-adjust: exact;
    }
    `,
    onBeforePrint,
    onAfterPrint,
    print: download
      ? async () => {
          if (elementRef.current) {
            await import('html2pdf.js').then(({ default: html2pdf }) => {
              html2pdf(elementRef.current!, {
                margin: 10,
                filename: `${title}.pdf`,
                image: { type: 'png', quality: 1 },
                html2canvas: { scale: 2 },
                jsPDF: jsPDF
              });
            });
          }
        }
      : undefined
  });

  return [reactToPrint];
};
