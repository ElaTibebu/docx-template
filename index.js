"use strict";

const path = require("path");
const createReport = require('docx-templates').default;
const fs = require('fs').promises

const libre = require("libreoffice-convert");
const chromiumly = require("chromiumly");
const ILovePDFApi = require("@ilovepdf/ilovepdf-nodejs");
const ILovePDFFile = require("@ilovepdf/ilovepdf-nodejs/ILovePDFFile");
const instance = new ILovePDFApi(
  "project_public_42a5e44ae63aeb530ef46d4ae61f7ce7_okCfD9d845b3e02af2e2464a2d04cfda8b329",
  "secret_key_36a8e80c27f0731d4be1903216e766df_dTemX7c910bf7b3cc0b314acf025645972ed1"
);
const util = require("util");
const word2pdf = require('./word2pdf.js');
const docxConverter = require("docx-pdf");

libre.convertAsync = require("util").promisify(libre.convert);

async function main() {
const bdsBuffer=await generateBds()
  const ext = ".html";
  let pdfBuf = await libre.convertAsync(bdsBuffer, ext, undefined);
  const template = fs.readFile("spd.docx");
 const html = pdfBuf.toString("utf-8");
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
  await fs.writeFile(
    "report.docx",
    buffer);


    // const pdfbuffer = await chromiumly.PDFEngine.convert({
    //   files: ["index.html"],
    // });

    // await fs.writeFile("report.pdf", pdfbuffer);
    // const task = instance.newTask("officepdf");
    // task
    //   .start()
    //   .then(() => {
    //     const file = new ILovePDFFile("./report.docx");
    //     return task.addFile(file);
    //   })
    //   .then(() => {
    //     return task.process();
    //   })
    //   .then(() => {
    //     return task.download();
    //   })
    //   .then((data) => {
    //     fs.writeFile("report.pdf", data);
    //   });
    //  const data = await word2pdf("report.docx");
    //  fs.writeFile("report.pdf", data);
    docxConverter("./report.docx", "./report.pdf", (err, result) => {
      if (err) console.log(err);
      else console.log(result); // writes to file for us
    });


}
async function generateBds(){
    const template = fs.readFile("bds-template.docx");

const buffer = await createReport({
  template,
  data: {
    public_body: "procurement of procedure",
  },
});
return buffer
}

main().catch(function (err) {   
  console.log(`Error converting file: ${err}`);
});
