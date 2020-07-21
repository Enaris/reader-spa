import pdfjsLib from 'pdfjs-dist/webpack';

pdfjsLib.disableTextLayer = true;
pdfjsLib.disableWorker = true; 

const getPageText = async (pdf, pageNo) => {
  const page = await pdf.getPage(pageNo);
  const tokenizedText = await page.getTextContent();
  const pageText = tokenizedText.items.map(token => token.str).join("");
  return pageText;
};

export const getPDFText = async (source) => {
  Object.assign(window, {pdfjsWorker: pdfjsLib.PDFJSWorker}); 
  const pdf = await pdfjsLib.getDocument(source).promise;
  const maxPages = pdf.numPages;
  const pageTextPromises = [];
  for (let pageNo = 1; pageNo <= maxPages; pageNo += 1) {
    pageTextPromises.push(getPageText(pdf, pageNo));
  }
  const pageTexts = await Promise.all(pageTextPromises);
  return pageTexts.join(" ");
};