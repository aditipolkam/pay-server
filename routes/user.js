var express = require("express");
require("dotenv").config();
const getAbsolutePath = require("../helpers/getAbsolutePath");
const getDetailsFileContent = require("../helpers/ocr/getDetailsFileContent");
const getPayFileContent = require("../helpers/ocr/getPayFileContent");

const multer = require("multer");
const upload = multer({ dest: "./temp/images/" });

const cpUpload = upload.fields([
  { name: "detailsFile", maxCount: 1 },
  { name: "payslipFile", maxCount: 1 },
]);

var router = express.Router();

router.post("/register", cpUpload, async function (req, res) {
  console.dir(req.files["detailsFile"]);
  res.send("Hello World!");
  //console.dir(req.files["detailsFile"][0].path);
  //base64 strings
  // let detailsFile = req.body.detailsFile;
  // let payslipFile = req.body.payslipFile;
  // const detailsImageData = Buffer.from(detailsFile, "7bit");
  // const payslipImageData = Buffer.from(payslipFile, "7bit");
  // // Get absolute path of the Files
  // const detailsFilePath = getAbsolutePath(detailsImageData);
  // const payslipFilePath = getAbsolutePath(payslipImageData);
  // // get File ocr content in json
  const name = await getDetailsFileContent(req.files["detailsFile"]);
  console.log(name);
  //const { employeeName, netPay } = await getPayFileContent(payslipFilePath);
  // //check user pay range and user details accordingly
  // let claim;
  // if (employeeName !== name) {
  //   res.send("Employee name does not match");
  // } else {
  //   //generate claim string
  //   if (netPay < 1000) {
  //     claim = "Pay between 0 to 1000";
  //   } else if (netpay < 3000) {
  //     claim = "Pay between 1001 to 3000";
  //   } else if (netPay < 5000) {
  //     claim = "Pay between 3001 to 5000";
  //   } else if (netPay < 10000) {
  //     claim = "Pay between 5001 to 10000";
  //   } else if (netPay < 20000) {
  //     claim = "Pay between 10001 to 20000";
  //   } else if (netPay < 50000) {
  //     claim = "Pay between 20001 to 50000";
  //   } else if (netPay < 50000) {
  //     claim = "Pay between 50001 to 100000";
  //   } else {
  //     claim = "Pay more than 100000";
  //   }
  // }
  // // store File in IPFS and get cid
  // const detailsFileCid = await uploadFileToIpfs(detailsFilePath);
  // const payslipFileCid = await uploadFileToIpfs(payslipFilePath);
  // //send File ocr and cid content to smart contract
  // await registerUser(address, claim, detailsFileCid, payslipFileCid);
  // //delete files from temp folder
  // fs.unlinkSync(detailsFilePath);
  // fs.unlinkSync(payslipFilePath);
  // res.send("Hello World!");
});

module.exports = router;
