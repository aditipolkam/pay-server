require("dotenv").config();
const ethers = require("ethers");
const lighthouse = require("@lighthouse-web3/sdk");

const signAuthMessage = async (publicKey, privateKey) => {
  const provider = new ethers.JsonRpcProvider();
  const signer = new ethers.Wallet(privateKey, provider);

  console.log((await lighthouse.getAuthMessage(publicKey)).data.message);
  const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data
    .message;
  const signedMessage = await signer.signMessage(messageRequested);
  return signedMessage;
};

const share = async (cid, publicKeyUserB) => {
  const publicKeyOfOwner = "0xd4c62eA11760C44C20c6cC48D4d5207BEF43c3Cb";
  const privateKey = process.env.PRIVATE_KEY;
  // const publicKeyUserB = "0x8F928dB08191fA1C22Fd306C4f1766F744A6BA52";

  // Get file encryption key
  const signedMessage = await signAuthMessage(publicKeyOfOwner, privateKey);

  // Decrypt File
  const response = await lighthouse.shareFile(
    publicKeyOfOwner,
    [publicKeyUserB],
    cid,
    signedMessage
  );

  console.log(response);
};

module.exports = share;

/*
Response: 
 {
   data: {
     shareTo: [ '0x487fc2fE07c593EAb555729c3DD6dF85020B5160' ],
     cid: 'QmUHDKv3NNL1mrg4NTW4WwJqetzwZbGNitdjr2G6Z5Xe6s',
     status: 'Success'
   }
 }
*/
