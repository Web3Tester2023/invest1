// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

interface ICoinvestNFT {
    function safeMint(address to, uint256 tokenId, string memory uri) external;
}