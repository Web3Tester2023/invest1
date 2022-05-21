// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
contract Account {
    address payable public owner;
    address nftAddress;
    uint256 nftId;

    modifier onlyOwner() {
        IERC721 nftContract = IERC721(nftAddress);
        address nftOwner = nftContract.ownerOf(nftId);
        require(msg.sender == owner);
        require(msg.sender == nftOwner);
        _;
    }

    constructor(address _owner, address _nftAddress, uint256 _nftId) {
        owner = payable(_owner);
        nftAddress = _nftAddress;
        nftId = _nftId;
    }

    function withdraw(uint _amount) external payable onlyOwner {
        require(msg.sender == owner, "caller is not owner");
        payable(msg.sender).transfer(_amount);
    }

    function getBalance() external view returns (uint) {
        return address(this).balance;
    }

    function getERC20Balance(address token) external view returns(uint256) {
        IERC20 erc20Token = IERC20(token);
        return erc20Token.balanceOf(address(this));
    }

    function erc20Withdraw(address token, uint256 amount) external onlyOwner {
        require(msg.sender == owner, "caller is not owner");
        IERC20 erc20Token = IERC20(token);
        erc20Token.transfer(owner, amount);
    }

    receive() external payable {}
}