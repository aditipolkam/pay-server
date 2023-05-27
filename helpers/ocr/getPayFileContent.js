const Tesseract = require("tesseract.js");
const fs = require("fs");

const getPayFileContent = async (filePath) => {
  Tesseract.recognize(filePath, "eng", { logger: (m) => console.log(m) })
    .then(({ data: { text } }) => {
      // Output the entire recognized text
      console.log(text);

      // Split the text into lines
      const lines = text.split("\n");

      // Initialize variables to store the extracted data
      let employeeName = "";
      let netPay = "";

      // Loop through each line
      for (let i = 0; i < lines.length; i++) {
        // Check if the line contains the employee name
        if (lines[i].includes("Employee Name :")) {
          // Extract the employee name and remove spaces
          employeeName = lines[i]
            .split("Employee Name :")[1]
            .replace(/\s/g, "")
            .toLowerCase();
        }

        // Check if the line contains the net pay
        if (lines[i].includes("Net Pay")) {
          // Extract the net pay
          netPay = lines[i].split("Net Pay")[1].trim();
        }
      }

      // Log the extracted data
      console.log(`Employee Name: ${employeeName}`);
      console.log(`Net Pay: ${netPay}`);

      return { employeeName, netPay };
    })
    .catch((err) => {
      // Log any errors
      console.error(err);
    });
};

module.exports = getPayFileContent;
