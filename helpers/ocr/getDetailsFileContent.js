const Tesseract = require("tesseract.js");

function getDetailsFileContent(filePath) {
  Tesseract.recognize(filePath, "eng", { logger: (m) => console.log(m) })

    .then(({ data: { text } }) => {
      // Split the text into lines
      const lines = text.split("\n");

      // Initialize variables to store the extracted data
      let dob = "";
      let aadhaarNumber = "";
      let address = "";
      let phoneNumber = "";
      let isCollectingAddress = false;
      let name = "";
      let gender = "";

      // Loop through each line
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes("To")) {
          isCollectingAddress = true;
          continue; // Skip the rest of this loop iteration
        }

        if (isCollectingAddress) {
          if (name === "") {
            name = lines[i].trim().replace(/\s/g, "").toLowerCase();
          } else if (/^\d{10}$/.test(lines[i])) {
            phoneNumber = lines[i].trim();
            isCollectingAddress = false;
          } else {
            address += lines[i].trim() + "\n";
          }
        }

        // Check if the line contains the string "Date of Birth/DOB:"
        if (lines[i].includes("Date of Birth/DOB:")) {
          // Extract the data after "Date of Birth/DOB:"
          dob = lines[i].split("Date of Birth/DOB:")[1].trim();
          // Extract gender from the next line
          gender = lines[i + 1].trim().replace("g ", "");
        }

        // Check if the line contains the string "Your Aadhaar No. :"
        if (lines[i].includes("Your Aadhaar No. :")) {
          // Extract the data from the next line
          aadhaarNumber = lines[i + 1].trim();
        }
      }

      // Log the extracted data
      console.log(`Name: ${name}`);
      console.log(`Date of Birth: ${dob}`);
      console.log(`Gender: ${gender}`);
      console.log(`Aadhaar Number: ${aadhaarNumber}`);
      console.log("Address: ", address);
      console.log("Phone Number: ", phoneNumber);
      console.log("Done");
      return name;
    })
    .catch((err) => {
      console.error(err);
    });
}
// const file = "./test/ashi_aadhaar.png";

module.exports = getDetailsFileContent;
