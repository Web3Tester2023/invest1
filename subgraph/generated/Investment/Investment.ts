// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class BasketCreated extends ethereum.Event {
  get params(): BasketCreated__Params {
    return new BasketCreated__Params(this);
  }
}

export class BasketCreated__Params {
  _event: BasketCreated;

  constructor(event: BasketCreated) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get name(): string {
    return this._event.parameters[1].value.toString();
  }

  get metadata(): string {
    return this._event.parameters[2].value.toString();
  }

  get investingToken(): Address {
    return this._event.parameters[3].value.toAddress();
  }

  get created_at(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get updated_at(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }

  get owner(): Address {
    return this._event.parameters[6].value.toAddress();
  }

  get investingAccount(): Address {
    return this._event.parameters[7].value.toAddress();
  }

  get investmentType(): i32 {
    return this._event.parameters[8].value.toI32();
  }

  get investmentAmount(): BigInt {
    return this._event.parameters[9].value.toBigInt();
  }

  get total_investment(): BigInt {
    return this._event.parameters[10].value.toBigInt();
  }

  get reinvest(): boolean {
    return this._event.parameters[11].value.toBoolean();
  }
}

export class BasketSIPAdded extends ethereum.Event {
  get params(): BasketSIPAdded__Params {
    return new BasketSIPAdded__Params(this);
  }
}

export class BasketSIPAdded__Params {
  _event: BasketSIPAdded;

  constructor(event: BasketSIPAdded) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get basketId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get sipAmount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get approvedAmount(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get startDate(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get endDate(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }
}

export class BasketTokenAdded extends ethereum.Event {
  get params(): BasketTokenAdded__Params {
    return new BasketTokenAdded__Params(this);
  }
}

export class BasketTokenAdded__Params {
  _event: BasketTokenAdded;

  constructor(event: BasketTokenAdded) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get basketId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get _address(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get percentage(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get priceFeedAddress(): Address {
    return this._event.parameters[4].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }

  get investedAmount(): BigInt {
    return this._event.parameters[6].value.toBigInt();
  }
}

export class BasketTokenUpdated extends ethereum.Event {
  get params(): BasketTokenUpdated__Params {
    return new BasketTokenUpdated__Params(this);
  }
}

export class BasketTokenUpdated__Params {
  _event: BasketTokenUpdated;

  constructor(event: BasketTokenUpdated) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get basketId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get _address(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get percentage(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get priceFeedAddress(): Address {
    return this._event.parameters[4].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }

  get investedAmount(): BigInt {
    return this._event.parameters[6].value.toBigInt();
  }
}

export class InvestmentMade extends ethereum.Event {
  get params(): InvestmentMade__Params {
    return new InvestmentMade__Params(this);
  }
}

export class InvestmentMade__Params {
  _event: InvestmentMade;

  constructor(event: InvestmentMade) {
    this._event = event;
  }

  get basketId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get date(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Investment extends ethereum.SmartContract {
  static bind(address: Address): Investment {
    return new Investment("Investment", address);
  }

  WMATIC(): Address {
    let result = super.call("WMATIC", "WMATIC():(address)", []);

    return result[0].toAddress();
  }

  try_WMATIC(): ethereum.CallResult<Address> {
    let result = super.tryCall("WMATIC", "WMATIC():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  calculateFee(amount: BigInt): BigInt {
    let result = super.call("calculateFee", "calculateFee(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(amount)
    ]);

    return result[0].toBigInt();
  }

  try_calculateFee(amount: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "calculateFee",
      "calculateFee(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(amount)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  fee(): BigInt {
    let result = super.call("fee", "fee():(uint256)", []);

    return result[0].toBigInt();
  }

  try_fee(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("fee", "fee():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  poolFee(): i32 {
    let result = super.call("poolFee", "poolFee():(uint24)", []);

    return result[0].toI32();
  }

  try_poolFee(): ethereum.CallResult<i32> {
    let result = super.tryCall("poolFee", "poolFee():(uint24)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  swapRouter(): Address {
    let result = super.call("swapRouter", "swapRouter():(address)", []);

    return result[0].toAddress();
  }

  try_swapRouter(): ethereum.CallResult<Address> {
    let result = super.tryCall("swapRouter", "swapRouter():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class CreateBasketCall extends ethereum.Call {
  get inputs(): CreateBasketCall__Inputs {
    return new CreateBasketCall__Inputs(this);
  }

  get outputs(): CreateBasketCall__Outputs {
    return new CreateBasketCall__Outputs(this);
  }
}

export class CreateBasketCall__Inputs {
  _call: CreateBasketCall;

  constructor(call: CreateBasketCall) {
    this._call = call;
  }

  get name(): string {
    return this._call.inputValues[0].value.toString();
  }

  get metadata(): string {
    return this._call.inputValues[1].value.toString();
  }

  get tokens(): Array<Address> {
    return this._call.inputValues[2].value.toAddressArray();
  }

  get tokenPercentages(): Array<BigInt> {
    return this._call.inputValues[3].value.toBigIntArray();
  }

  get priceFeedAddress(): Array<Address> {
    return this._call.inputValues[4].value.toAddressArray();
  }

  get investingToken(): Address {
    return this._call.inputValues[5].value.toAddress();
  }

  get investingAccount(): Address {
    return this._call.inputValues[6].value.toAddress();
  }
}

export class CreateBasketCall__Outputs {
  _call: CreateBasketCall;

  constructor(call: CreateBasketCall) {
    this._call = call;
  }
}

export class CreateSIPforBasketCall extends ethereum.Call {
  get inputs(): CreateSIPforBasketCall__Inputs {
    return new CreateSIPforBasketCall__Inputs(this);
  }

  get outputs(): CreateSIPforBasketCall__Outputs {
    return new CreateSIPforBasketCall__Outputs(this);
  }
}

export class CreateSIPforBasketCall__Inputs {
  _call: CreateSIPforBasketCall;

  constructor(call: CreateSIPforBasketCall) {
    this._call = call;
  }

  get basketId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get sipAmount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get approvedAmount(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get startDate(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get endDate(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }
}

export class CreateSIPforBasketCall__Outputs {
  _call: CreateSIPforBasketCall;

  constructor(call: CreateSIPforBasketCall) {
    this._call = call;
  }
}

export class InvestInBasketCall extends ethereum.Call {
  get inputs(): InvestInBasketCall__Inputs {
    return new InvestInBasketCall__Inputs(this);
  }

  get outputs(): InvestInBasketCall__Outputs {
    return new InvestInBasketCall__Outputs(this);
  }
}

export class InvestInBasketCall__Inputs {
  _call: InvestInBasketCall;

  constructor(call: InvestInBasketCall) {
    this._call = call;
  }

  get basketId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class InvestInBasketCall__Outputs {
  _call: InvestInBasketCall;

  constructor(call: InvestInBasketCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}
