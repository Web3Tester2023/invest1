// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "./Interfaces/IERC20.sol";
import "./Interfaces/IUniswapV2Router.sol";

error SwapFailed();

contract Investment is OwnableUpgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;

    CountersUpgradeable.Counter basketIds;
    CountersUpgradeable.Counter basketTokenIds;
    uint256 public fee = 5; // amount * 5 / 1000

    address private constant UNISWAP_V2_ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;

    enum InvestmentType {
        SIP,
        LUMPSUM
    }
    struct BasketToken {
        uint256 id;
        address _address;
        uint256 percentage;
        address priceFeedAddress;
        uint256 amount;
        uint256 investedAmount;
    }

    struct Basket {
        uint256 id;
        string name;
        string metadata;
        address investingToken;
        uint256 created_at;
        uint256 updated_at;
        address owner;
        InvestmentType investmentType;
        uint256 investmentAmount;
        uint256 total_investment;
        bool reinvest;
    }

    /*******************
    ******* EVENTS******
    ********************/
    event BasketCreated(
        uint256 id,
        string name,
        string metadata,
        address investingToken,
        uint256 created_at,
        uint256 updated_at,
        address owner,
        InvestmentType investmentType,
        uint256 investmentAmount,
        uint256 total_investment,
        bool reinvest
    );

    event BasketTokenAdded (
        uint256 id,
        uint256 basketId,
        address _address,
        uint256 percentage,
        address priceFeedAddress,
        uint256 amount,
        uint256 investedAmount
    );

    mapping(uint => Basket) baskets;
    mapping(uint => BasketToken[]) basketTokens;

    /************************** 
    **********SWAP TOKEN*******
    **************************/
     function swap(
        address _tokenIn,
        address _tokenOut,
        uint _amountIn,
        uint _amountOutMin,
        address _to
    ) external {
        IERC20(_tokenIn).transferFrom(msg.sender, address(this), _amountIn);
        IERC20(_tokenIn).approve(UNISWAP_V2_ROUTER, _amountIn);

        address[] memory path;
        if (_tokenIn == WETH || _tokenOut == WETH) {
            path = new address[](2);
            path[0] = _tokenIn;
            path[1] = _tokenOut;
        } else {
            path = new address[](3);
            path[0] = _tokenIn;
            path[1] = WETH;
            path[2] = _tokenOut;
        }

        IUniswapV2Router(UNISWAP_V2_ROUTER).swapExactTokensForTokens(
            _amountIn,
            _amountOutMin,
            path,
            _to,
            block.timestamp
        );
    }

    function calculateFee(uint256 amount) public view returns (uint256) {
        return (amount * fee) / 10000;
    }

    function createBasket(string memory name, string memory metadata, address[] memory tokens, uint256[] memory tokenPercentages,address[] memory priceFeedAddress, address investingToken) external {
        basketIds.increment();
        uint currentId = basketIds.current();
        baskets[currentId] = Basket(currentId, name, metadata, investingToken, block.timestamp, block.timestamp, msg.sender, InvestmentType.LUMPSUM, 0, 0, false);
        emit BasketCreated(currentId, name, metadata, investingToken, block.timestamp, block.timestamp, msg.sender, InvestmentType.LUMPSUM, 0, 0, false);

        for(uint i = 0; i < tokens.length; i++){
            basketTokenIds.increment();
            uint256 tokenId = basketTokenIds.current();
            basketTokens[currentId].push(BasketToken(tokenId, tokens[i], tokenPercentages[i], priceFeedAddress[i], 0, 0));
            emit BasketTokenAdded(tokenId, currentId, tokens[i], tokenPercentages[i], priceFeedAddress[i], 0, 0);
        }
    }

    function investLumpsumInBasket(uint256 basketId, uint256 amount) external {
        Basket storage basket = baskets[basketId];
        for(uint i = 0; i < basketTokens[basketId].length; i++) {
            BasketToken storage basketToken = basketTokens[basketId][i];
            uint256 investingAmount = amount - (amount * basketToken.percentage) / 1000;
            // #************** Swap Token Here ************

            // #*******************************************
            basketToken.amount += amount;
            basketToken.investedAmount += investingAmount; 
        }
        basket.total_investment += amount;
    }
}