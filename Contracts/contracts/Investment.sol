// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./Interfaces/IERC20.sol";
import "./Interfaces/IUniswapV2Router.sol";
// import { Swap } from "./Common/Swap.sol";

//Uniswap Imports
import "@uniswap/lib/contracts/libraries/TransferHelper.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";

// Chainlink Imports
import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";

error SwapFailed();

contract Investment is OwnableUpgradeable, KeeperCompatibleInterface {
    using CountersUpgradeable for CountersUpgradeable.Counter;

    CountersUpgradeable.Counter basketIds;
    CountersUpgradeable.Counter basketTokenIds;
    CountersUpgradeable.Counter basketSIPIds;
    uint256 public fee = 5; // amount * 5 / 1000
    
    // For this example, we will set the pool fee to 0.3%.
    uint24 public constant poolFee = 3000;

    ISwapRouter public immutable swapRouter = ISwapRouter(0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45);
    address public constant WMATIC = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;

    // Chainlink 
     /**
    * Public counter variable
    */
    uint public counter;

    /**
    * Use an interval in seconds and a timestamp to slow execution of Upkeep
    */
    uint public immutable interval;
    uint public lastTimeStamp;

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
        address payable owner;
        address payable investingAccount;
        InvestmentType investmentType;
        uint256 investmentAmount;
        uint256 total_investment;
        bool reinvest;
    }

    struct BasketSIP {
        uint256 id;
        uint256 sipAmount;
        uint256 approvedAmount;
        uint256 startDate;
        uint256 endDate;
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
        address investingAccount,
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

    event BasketTokenUpdated (
        uint256 id,
        uint256 basketId,
        address _address,
        uint256 percentage,
        address priceFeedAddress,
        uint256 amount,
        uint256 investedAmount
    );

    event BasketSIPAdded (
        uint256 id,
        uint256 basketId,
        uint256 sipAmount,
        uint256 approvedAmount,
        uint256 startDate,
        uint256 endDate
    );

    event InvestmentMade (
        uint256 basketId,
        uint256 amount,
        uint256 date
    );

    mapping(uint256 => Basket) baskets;
    mapping(uint256 => BasketToken[]) basketTokens;
    mapping (uint256 => BasketSIP) basketSIPs;
    
    constructor(uint updateInterval) {
      interval = updateInterval;
      lastTimeStamp = block.timestamp;

      counter = 0;
    }

    function calculateFee(uint256 amount) public view returns (uint256) {
        return (amount * fee) / 10000;
    }

    function createBasket(string memory name, string memory metadata, address[] memory tokens, uint256[] memory tokenPercentages,address[] memory priceFeedAddress, address investingToken, address investingAccount) external {
        basketIds.increment();
        uint currentId = basketIds.current();
        baskets[currentId] = Basket(currentId, name, metadata, investingToken, block.timestamp, block.timestamp, payable(msg.sender), payable(investingAccount), InvestmentType.LUMPSUM, 0, 0, false);
        emit BasketCreated(currentId, name, metadata, investingToken, block.timestamp, block.timestamp, msg.sender, investingAccount, InvestmentType.LUMPSUM, 0, 0, false);

        for(uint i = 0; i < tokens.length; i++){
            basketTokenIds.increment();
            uint256 tokenId = basketTokenIds.current();
            basketTokens[currentId].push(BasketToken(tokenId, tokens[i], tokenPercentages[i], priceFeedAddress[i], 0, 0));
            emit BasketTokenAdded(tokenId, currentId, tokens[i], tokenPercentages[i], priceFeedAddress[i], 0, 0);
        }
    }

    function investInBasket(uint256 basketId, uint256 amount) public {
        Basket storage basket = baskets[basketId];
        require(msg.sender == basket.owner, "Not Owner");
        for(uint i = 0; i < basketTokens[basketId].length; i++) {
            BasketToken storage basketToken = basketTokens[basketId][i];
            uint256 investingAmount = amount - (amount * basketToken.percentage) / 1000;
            // #************** Swap Token Here ************

            // Transfer the specified amount of DAI to this contract.
            TransferHelper.safeTransferFrom(basket.investingToken, msg.sender, address(this), amount);

            // Approve the router to spend DAI.
            TransferHelper.safeApprove(basket.investingToken, address(swapRouter), amount);
            ISwapRouter.ExactInputSingleParams memory params =
            ISwapRouter.ExactInputSingleParams({
                tokenIn: basket.investingToken,
                tokenOut: basketToken._address,
                fee: poolFee,
                recipient: basket.investingAccount,
                deadline: block.timestamp,
                amountIn: investingAmount,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });

            // The call to `exactInputSingle` executes the swap.
            uint256 amountOut = swapRouter.exactInputSingle(params);

            //swapExactInputMultihop(investingAmount, basket.investingToken, basketToken._address, basket.investingAccount);

            // #*******************************************

            basketToken.amount += amountOut;
            basketToken.investedAmount += investingAmount; 
            emit BasketTokenUpdated(basketToken.id, basketId, basketToken._address, basketToken.percentage, basketToken.priceFeedAddress, amountOut, investingAmount);
        }
        basket.total_investment += amount;
        emit InvestmentMade(basketId, amount, block.timestamp);
    }

    function createSIPforBasket(uint256 basketId, uint256 sipAmount, uint256 approvedAmount, uint256 startDate, uint256 endDate) external {
        Basket storage basket = baskets[basketId];
        require(msg.sender == basket.owner, "Not Owner");
        basket.investmentType = InvestmentType.SIP;
        basketSIPIds.increment();
        uint256 currentId = basketIds.current();
        basketSIPs[basketId] = BasketSIP(currentId, sipAmount, approvedAmount, startDate, endDate);
        emit BasketSIPAdded(currentId, basketId, sipAmount, approvedAmount, startDate, endDate);
    } 

    function executeSIPforBasket(uint256 basketId) internal {
        Basket storage basket = baskets[basketId];
        require(msg.sender == basket.owner, "Not Owner");
        BasketSIP memory sip = basketSIPs[basketId];
        require((sip.approvedAmount - basket.total_investment) > sip.sipAmount, "Limit Excied");
        investInBasket(basketId, sip.sipAmount);
    }

    // Chainlink Keeper functions
    function checkUpkeep(bytes calldata /* checkData */) external view override returns (bool upkeepNeeded, bytes memory /* performData */) {
        upkeepNeeded = (block.timestamp - lastTimeStamp) > interval;
        // We don't use the checkData in this example. The checkData is defined when the Upkeep was registered.
    }

    function performUpkeep(bytes calldata /* performData */) external override {
        //We highly recommend revalidating the upkeep in the performUpkeep function
        if ((block.timestamp - lastTimeStamp) > interval ) {
            lastTimeStamp = block.timestamp;
            // counter = counter + 1;
            for(uint i=0; i < basketIds.current(); i++){
                if(baskets[i+1].investmentType == InvestmentType.SIP){
                    executeSIPforBasket(i+1);
                }
            }
        }
        // We don't use the performData in this example. The performData is generated by the Keeper's call to your checkUpkeep function
    }

    receive() external payable {}
}