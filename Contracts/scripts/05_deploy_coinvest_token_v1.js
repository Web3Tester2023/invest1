const { ethers, upgrades } = require("hardhat");

async function main() {
  const CoinvestTokenV1 = await ethers.getContractFactory("CoinvestToken");
  const coinvest = await upgrades.deployProxy(CoinvestTokenV1, {
      initializer: "initialize",
  });
  await coinvest.deployed();
  console.log("Coinvest Token deployed to:", coinvest.address);
}

main();