async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const Users = await ethers.getContractFactory("Users");
    const usersContract = await Users.deploy("0xAEBA1390B178B472f2200f05b1803556CF12CC2f");
  
    console.log("Users Contract Polygon address:", usersContract.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  