"use strict";

const path = require("path");
const createReport = require('docx-templates').default;
const fs = require('fs').promises

const libre = require("libreoffice-convert");
libre.convertAsync = require("util").promisify(libre.convert);

async function main() {

await generateBds()


  const ext = ".html";
  const inputPath = path.join(__dirname, "./bds.docx");
  const outputPath = path.join(__dirname, `/test${ext}`);

  // Read file
  const docxBuf = await fs.readFile(inputPath);

  // Convert it to pdf format with undefined filter (see Libreoffice docs about filter)
  let pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);

  // Here in done you have pdf file which you can save or transfer in another stream
  await fs.writeFile(outputPath, pdfBuf);





  const template = fs.readFile("test.docx");
 const filePath = "./test.html"; // Assuming the HTML file is named file.html
 const ss=await fetchHTMLFromFile(filePath);
 const html = ss.toString("utf-8");
  const buffer = await createReport({
    template,
    data: {
      subject_of_procurement: "procurement of procedure",
      procurement_reference_no: "procurement of procedure",
      project_name: "procurement of procedure",
      public_body: "procurement of procedure",
      date_of_issue_of_bidding: new Date(),
      bds: `${html}`,
    },
  });

  fs.writeFile("report.docx", buffer);
}
async function generateBds(){
    const template = fs.readFile("bds-template.docx");

const buffer = await createReport({
  template,
  data: {
    public_body: "procurement of procedure",
  },
});
await fs.writeFile("bds.docx", buffer);
}
 function fetchHTMLFromFile(FILE_PATH) {
   const filePath = path.join(__dirname, FILE_PATH);
  return fs.readFile(filePath);
 }

main().catch(function (err) {
  console.log(`Error converting file: ${err}`);
});
