require("dotenv").config();
const ethers = require("ethers");
const CONTRACT_ADDRESS = "0xe215Df07fbE5EF9CBf9EF101821e487F8d991078";
const CONTRACT_ABI = require("../../utils/contractABI.json");

const registerUser = async (address, claim, detailsFileCid, payslipFileCid) => {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);
  const tx = await contract.setUserDetails(
    address,
    claim,
    detailsFileCid,
    payslipFileCid
  );
  await tx.wait();
  console.log("User registered successfully");
};

module.exports = registerUser;
