// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
contract Account {
    address payable public owner;
    address nftAddress;
    uint256 nftId;

    modifier onlyOwner() {
        require(owner == msg.sender);
        _;
    }

    constructor(address _owner, address _nftAddress, uint256 _nftId) {
        owner = payable(_owner);
        nftAddress = _nftAddress;
        nftId = _nftId;
    }

    receive() external payable {}

    function withdraw(uint _amount) external onlyOwner {
        require(msg.sender == owner, "caller is not owner");
        payable(msg.sender).transfer(_amount);
    }

    function getBalance() external view returns (uint) {
        return address(this).balance;
    }

    function getERC20Balance(address token) external view {
        
    }
}