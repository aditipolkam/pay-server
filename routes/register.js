var express = require("express");
require("dotenv").config();
const getAbsolutePath = require("../helpers/getAbsolutePath");

var router = express.Router();

router.get("/register", async function (req, res) {
  let detailsPdf = req.body.detailsPdf;
  let payslipPdf = req.body.payslipPdf;

  // Get absolute path of the PDFs
  const detailsPdfPath = getAbsolutePath(detailsPdf);
  const payslipPdfPath = getAbsolutePath(payslipPdf);

  // get pdf ocr content

  //check user pay range and pass accordingly

  // store pdf in IPFS and get cid
  const detailsPdfCid = await uploadFileToIpfs(detailsPdfPath);
  const payslipPdfCid = await uploadFileToIpfs(payslipPdfPath);

  //send pdf ocr and cid content to smart contract
  await registerUser(address, detailsPdfCid, payslipPdfCid);

  //delete files from temp folder
  fs.unlinkSync(detailsPdfPath);
  fs.unlinkSync(payslipPdfPath);

  res.send("Hello World!");
});

module.exports = router;
