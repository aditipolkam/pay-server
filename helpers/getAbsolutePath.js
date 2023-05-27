const fs = require("fs");
const uuid = require("uuid");

const getAbsolutePath = (data) => {
  // Save the PDF data to a temporary file
  const fileName = `${uuid.v4()}.jpg`;
  const savePath = "/temp/images/";
  const filePath = `${savePath}${fileName}`;
  fs.writeFile(filePath, data, "binary", (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log("Image saved successfully:", filePath);
    }
  });

  //fs.writeFileSync(filePath, data);
  return filePath;
};

module.exports = getAbsolutePath;
