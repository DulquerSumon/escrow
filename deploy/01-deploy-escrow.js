const { network } = require("hardhat");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const account1 = "0x46AC4E93DF816925Dc7F8c0d20ABc5e8EF567d7D";
  const account2 = "0xF2D436aF71c57B2eDA53395258508B172fC51cB6";
  //   deployer = (await getNamedAccounts()).deployer
  const arguments = [account1, account2, "10000"];

  const escrow = await deploy("Escrow", {
    from: deployer,
    log: true,
    args: arguments,
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  if (network.config.chainId == 5 && process.env.ETHERSCAN_API_KEY) {
    await verify(escrow.address, arguments);
  }
  console.log(`Contract deployed at : ${escrow.address}`);
};
