var express = require("express");
require("dotenv").config();
const getAbsolutePath = require("../helpers/getAbsolutePath");

var router = express.Router();

router.post("/register", async function (req, res) {
  //base64 strings
  let detailsFile = req.body.detailsFile;
  let payslipFile = req.body.payslipFile;

  const detailsImageData = Buffer.from(detailsFile, "base64");
  const payslipImageData = Buffer.from(payslipFile, "base64");

  // Get absolute path of the Files
  const detailsFilePath = getAbsolutePath(detailsImageData);
  const payslipFilePath = getAbsolutePath(payslipImageData);

  // get File ocr content in json
  const { name } = await getDetailsFileContent(detailsFilePath);
  const { employeeName, netPay } = await getPayFileContent(payslipFilePath);

  //check user pay range and user details accordingly
  let claim;
  if (employeeName !== name) {
    res.send("Employee name does not match");
  } else {
    //generate claim string
    if (netPay < 1000) {
      claim = "Pay between 0 to 1000";
    } else if (netpay < 3000) {
      claim = "Pay between 1001 to 3000";
    } else if (netPay < 5000) {
      claim = "Pay between 3001 to 5000";
    } else if (netPay < 10000) {
      claim = "Pay between 5001 to 10000";
    } else if (netPay < 20000) {
      claim = "Pay between 10001 to 20000";
    } else if (netPay < 50000) {
      claim = "Pay between 20001 to 50000";
    } else if (netPay < 50000) {
      claim = "Pay between 50001 to 100000";
    } else {
      claim = "Pay more than 100000";
    }
  }

  // store File in IPFS and get cid
  const detailsFileCid = await uploadFileToIpfs(detailsFilePath);
  const payslipFileCid = await uploadFileToIpfs(payslipFilePath);

  //send File ocr and cid content to smart contract
  await registerUser(address, claim, detailsFileCid, payslipFileCid);

  //delete files from temp folder
  fs.unlinkSync(detailsFilePath);
  fs.unlinkSync(payslipFilePath);

  res.send("Hello World!");
});

module.exports = router;
