const fs = require("fs");

const getAbsolutePath = (pdfData) => {
  // Save the PDF data to a temporary file
  const tempFilePath = "/temp/file.pdf";
  fs.writeFileSync(tempFilePath, pdfData);
  return tempFilePath;
};

module.exports = getAbsolutePath;
