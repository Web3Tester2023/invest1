async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const CoinvestNFT = await ethers.getContractFactory("CoinvestNFT");
    const coinvestNft = await CoinvestNFT.deploy();
  
    console.log("CoinvestNFT Contract Polygon address:", coinvestNft.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
