require("dotenv").config();
const ethers = require("ethers");

const registerUser = async (address, detailsPdfCid, payslipPdfCid) => {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const contract = new ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    process.env.CONTRACT_ABI,
    wallet
  );
  const tx = await contract.registerUser(address, detailsPdfCid, payslipPdfCid);
  await tx.wait();
  console.log("User registered successfully");
};

module.exports = registerUser;
