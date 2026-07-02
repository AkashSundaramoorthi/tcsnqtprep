declare module "html2pdf.js" {
  const html2pdf: () => {
    set: (opt: Record<string, unknown>) => ReturnType<typeof html2pdf>;
    from: (el: HTMLElement) => ReturnType<typeof html2pdf>;
    save: () => Promise<void>;
  };
  export default html2pdf;
}
