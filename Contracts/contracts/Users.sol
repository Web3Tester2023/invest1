// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./Account.sol";
import "./Interfaces/ICoinvestNFT.sol";

contract Users is VRFConsumerBase {
    bytes32 internal keyHash;
    uint256 internal fee;
    address nftContract;
    uint256 public randomResult;
    
    /**
     * Constructor inherits VRFConsumerBase
     * 
     * Network: Polygon (Matic) Mumbai Testnet
     * Chainlink VRF Coordinator address: 0x8C7382F9D8f56b33781fE506E897a4F1e2d17255
     * LINK token address:                0x326C977E6efc84E512bB9C30f76E30c160eD06FB
     * Key Hash: 0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4
     */
    constructor(address nftAddress) VRFConsumerBase(
            0x8C7382F9D8f56b33781fE506E897a4F1e2d17255, // VRF Coordinator
            0x326C977E6efc84E512bB9C30f76E30c160eD06FB  // LINK Token
        ) public
    {
        keyHash = 0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4;
        fee = 0.0001 * 10 ** 18; // 0.0001 LINK
        nftContract = nftAddress;
    }

    mapping(address => address) userAccounts; 

    // EVENTS
    event UserAccountCreated(
        string username,
        address owner,
        address accountAddress,
        address nftAddress,
        uint256 nftId
    );

    function createAccount(string memory metadata, string memory _username) external {
        uint256 randomId = uint256(getRandomNumber());
        ICoinvestNFT nft = ICoinvestNFT(nftContract);
        nft.safeMint(msg.sender, randomId, metadata);
        address newAccount = address(new Account(msg.sender, nftContract, randomId));
        userAccounts[msg.sender] = newAccount;
        emit UserAccountCreated(_username, msg.sender, newAccount, nftContract, randomId);
    }

     /** 
     * Requests randomness 
     */
    function getRandomNumber() internal returns (bytes32 requestId)  {
        require(LINK.balanceOf(address(this)) > fee, "Not enough LINK - fill contract with faucet");
        return requestRandomness(keyHash, fee);
    }

    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        randomResult = randomness;
    }
}