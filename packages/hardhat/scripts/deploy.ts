import { ethers } from "hardhat";

async function main() {
  const PayGifty = await ethers.deployContract("PayGifty");

  await PayGifty.waitForDeployment();

  console.log("PayGifty address - " + (await PayGifty.getAddress()));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
