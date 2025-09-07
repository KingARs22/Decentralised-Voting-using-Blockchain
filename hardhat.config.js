require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.28",
  defaultNetwork: "volta",
  networks: {
    hardhat: {},
    volta: {
      url: API_URL || "https://volta-rpc.energyweb.org", // use the same RPC you tested
      chainId: 73799, // important! matches the curl response
      accounts: [`0x${PRIVATE_KEY}`], // private key from .env (without 0x in env)
      gas: 210000000,  // safe block gas limit
      gasPrice: 800000000000, // 25 gwei
    },
  },
};
