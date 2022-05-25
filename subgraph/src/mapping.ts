import { BigInt } from "@graphprotocol/graph-ts"
import {
  Investment,
  BasketCreated,
  BasketSIPAdded,
  BasketTokenAdded,
  InvestmentMade,
  OwnershipTransferred,
  BasketTokenUpdated
} from "../generated/Investment/Investment"
import {
  UserAccountCreated
} from "../generated/Users/Users"
import { InvestmentBasket, BasketToken, InvestmentTransaction, InvestingAccount } from "../generated/schema"

export function handleBasketCreated(event: BasketCreated): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = InvestmentBasket.load(event.params.id.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new InvestmentBasket(event.params.id.toHex())
  }

  entity.basketId = event.params.id;
  entity.name = event.params.name;
  entity.metadata = event.params.metadata;
  entity.investmentToken = event.params.investingToken;
  entity.created_at = event.params.created_at;
  entity.updated_at = event.params.updated_at;
  entity.owner = event.params.owner;
  entity.investingAccount = event.params.owner;
  entity.investmentType = event.params.investmentType;
  entity.investmentAmount = event.params.investmentAmount;
  entity.total_investment = event.params.total_investment;
  entity.reinvest = event.params.reinvest;
  entity.tokens = new Array<string>(0);
  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.WMATIC(...)
  // - contract.calculateFee(...)
  // - contract.fee(...)
  // - contract.owner(...)
  // - contract.poolFee(...)
  // - contract.swapRouter(...)
}

export function handleBasketSIPAdded(event: BasketSIPAdded): void {
  let id = event.params.basketId.toHex();
  let Basket = InvestmentBasket.load(id);
  if (Basket == null) {
    Basket = new InvestmentBasket(id)
  }
  let entity = new BasketToken(event.params.id.toHex())
}

export function handleBasketTokenAdded(event: BasketTokenAdded): void {
  let id = event.params.basketId.toHex();
  let Basket = InvestmentBasket.load(id);
  if (Basket == null) {
    Basket = new InvestmentBasket(id)
  }
  let entity = new BasketToken(event.params._address.toHex())

  entity.basket = Basket.id;
  entity.amount = event.params.amount;
  entity.percentage = event.params.percentage;
  entity.priceFeedAddress = event.params.priceFeedAddress;
  entity.address = event.params._address;
  entity.investedAmount = event.params.investedAmount;
  entity.save()

  let tokens = Basket.tokens;
  tokens.push(entity.id);
  Basket.tokens = tokens;
  Basket.save();
}

export function handleInvestmentMade(event: InvestmentMade): void {
  let id = event.params.basketId.toHex();
  let Basket = InvestmentBasket.load(id);
  if (Basket == null) {
    Basket = new InvestmentBasket(id)
  }
  let entity = new InvestmentTransaction(event.transaction.from.toHex());

  entity.basket = Basket.id;
  entity.amount = event.params.amount;
  entity.token = Basket.investmentToken;
  entity.type = Basket.investmentType; 
  entity.timestamp = event.params.date;
  entity.save()

}

export function handleBasketTokenUpdated(event: BasketTokenUpdated): void {

  let entity = BasketToken.load(event.params._address.toHex());
  if (entity == null) {
    entity = new BasketToken(event.params._address.toHex())
  }
  entity.amount = entity.amount.plus(event.params.amount); 
  entity.investedAmount = entity.investedAmount.plus(event.params.investedAmount);
  entity.save()

}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleUserAccountCreated(event: UserAccountCreated): void {
  let entity = InvestingAccount.load(event.params.accountAddress.toHex());
  if (entity == null) {
    entity = new InvestingAccount(event.params.accountAddress.toHex())
  }
  entity.username = event.params.username;
  entity.accountAddress = event.params.accountAddress;
  entity.nftAddress = event.params.nftAddress;
  entity.nftId = event.params.nftId;
  entity.owner = event.params.owner;

  entity.save();
}
