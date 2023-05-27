require("dotenv").config();
const ethers = require("ethers");
const lighthouse = require("@lighthouse-web3/sdk");

const signAuthMessage = async (publicKey, privateKey) => {
  const provider = new ethers.JsonRpcProvider();
  const signer = new ethers.Wallet(privateKey, provider);
  const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data
    .message;
  const signedMessage = await signer.signMessage(messageRequested);
  return signedMessage;
};

const uploadFileToIpfs = async (path) => {
  // const path = "C:/Users/aditi/Pictures/space-wallpapers/lighthouse.jpg"; //Give absolute path
  const apiKey = process.env.LIGHTHOUSE_API_KEY;
  const publicKey = "0xd4c62eA11760C44C20c6cC48D4d5207BEF43c3Cb";
  const privateKey = process.env.PRIVATE_KEY;
  console.log(
    "Uploading encrypted file from ",
    path,
    " with apikey ",
    apiKey,
    " using private key ",
    privateKey,
    " and public key ",
    publicKey
  );
  const signedMessage = await signAuthMessage(publicKey, privateKey);

  const response = await lighthouse.uploadEncrypted(
    path,
    apiKey,
    publicKey,
    signedMessage
  );
  // Display response
  console.log(response);
  /*
    data: {
      Name: 'flow1.png',
      Hash: 'QmQqfuFH77vsau5xpVHUfJ6mJQgiG8kDmR62rF98iSPRes',
      Size: '31735'
    }
    Note: Hash in response is CID.
  */
  return response.data.Hash;
};

module.exports = uploadFileToIpfs;
