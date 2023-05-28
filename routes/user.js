var express = require("express");
require("dotenv").config();
const fs = require("fs");
const getAbsolutePath = require("../helpers/getAbsolutePath");
const getDetailsFileContent = require("../helpers/ocr/getDetailsFileContent");
const getPayFileContent = require("../helpers/ocr/getPayFileContent");
const registerUser = require("../helpers/contract/registerUser");
const uploadFileToIpfs = require("../helpers/backup/uploadFileToIpfs");
const multer = require("multer");
const upload = multer({ dest: "./temp/images/" });

const cpUpload = upload.fields([
  { name: "detailsfile", maxCount: 1 },
  { name: "payslipfile", maxCount: 1 },
]);

var router = express.Router();

router.post("/register", cpUpload, async function (req, res) {
  const address = req.body.address;
  console.log(address);
  //console.dir(req);
  console.dir(req.body);
  console.dir(req.files);
  console.dir(req.files["detailsfile"]);
  const detailsFilePath = req.files["detailsfile"][0]["path"];
  const ocrRes = await getDetailsFileContent(detailsFilePath);
  if (!ocrRes) {
    return res.status(500).json({
      status: "error",
      error: "Could Not Recognize Information from uploaded Documents.",
    });
  }
  console.log(ocrRes);
  const paySlipFilePath = req.files["payslipfile"][0]["path"];
  const { employeeName, netPay } = await getPayFileContent(paySlipFilePath);
  //check user pay range and user details accordingly
  let claim;
  if (employeeName !== ocrRes.name) {
    res.send("Employee name does not match");
  } else {
    //generate claim string
    if (netPay < 1000) {
      claim = "Pay between 0 to 1000";
    } else if (netPay < 3000) {
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
    claim = claim + "$";
  }
  // store File in IPFS and get cid
  const detailsFileCid = await uploadFileToIpfs(detailsFilePath);
  const payslipFileCid = await uploadFileToIpfs(paySlipFilePath);
  // send File ocr and cid content to smart contract
  await registerUser(address, claim, detailsFileCid, payslipFileCid);
  // delete files from temp folder
  fs.unlinkSync(detailsFilePath);
  fs.unlinkSync(paySlipFilePath);
  return res.status(200).json({
    status: "success",
    data: {
      message: "Registration Successful.",
    },
  });
});

module.exports = router;
