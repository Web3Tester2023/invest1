// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class BasketToken extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("basket", Value.fromString(""));
    this.set("address", Value.fromBytes(Bytes.empty()));
    this.set("percentage", Value.fromBigInt(BigInt.zero()));
    this.set("priceFeedAddress", Value.fromBytes(Bytes.empty()));
    this.set("amount", Value.fromBigInt(BigInt.zero()));
    this.set("investedAmount", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save BasketToken entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type BasketToken must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("BasketToken", id.toString(), this);
    }
  }

  static load(id: string): BasketToken | null {
    return changetype<BasketToken | null>(store.get("BasketToken", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get basket(): string {
    let value = this.get("basket");
    return value!.toString();
  }

  set basket(value: string) {
    this.set("basket", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value!.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get percentage(): BigInt {
    let value = this.get("percentage");
    return value!.toBigInt();
  }

  set percentage(value: BigInt) {
    this.set("percentage", Value.fromBigInt(value));
  }

  get priceFeedAddress(): Bytes {
    let value = this.get("priceFeedAddress");
    return value!.toBytes();
  }

  set priceFeedAddress(value: Bytes) {
    this.set("priceFeedAddress", Value.fromBytes(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get investedAmount(): BigInt {
    let value = this.get("investedAmount");
    return value!.toBigInt();
  }

  set investedAmount(value: BigInt) {
    this.set("investedAmount", Value.fromBigInt(value));
  }
}

export class BasketSIP extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("basket", Value.fromString(""));
    this.set("amount", Value.fromBigInt(BigInt.zero()));
    this.set("approvedAmount", Value.fromBigInt(BigInt.zero()));
    this.set("startDate", Value.fromBigInt(BigInt.zero()));
    this.set("endDate", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save BasketSIP entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type BasketSIP must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("BasketSIP", id.toString(), this);
    }
  }

  static load(id: string): BasketSIP | null {
    return changetype<BasketSIP | null>(store.get("BasketSIP", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get basket(): string {
    let value = this.get("basket");
    return value!.toString();
  }

  set basket(value: string) {
    this.set("basket", Value.fromString(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get approvedAmount(): BigInt {
    let value = this.get("approvedAmount");
    return value!.toBigInt();
  }

  set approvedAmount(value: BigInt) {
    this.set("approvedAmount", Value.fromBigInt(value));
  }

  get startDate(): BigInt {
    let value = this.get("startDate");
    return value!.toBigInt();
  }

  set startDate(value: BigInt) {
    this.set("startDate", Value.fromBigInt(value));
  }

  get endDate(): BigInt {
    let value = this.get("endDate");
    return value!.toBigInt();
  }

  set endDate(value: BigInt) {
    this.set("endDate", Value.fromBigInt(value));
  }
}

export class InvestmentBasket extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("basketId", Value.fromBigInt(BigInt.zero()));
    this.set("name", Value.fromString(""));
    this.set("metadata", Value.fromString(""));
    this.set("investmentToken", Value.fromBytes(Bytes.empty()));
    this.set("created_at", Value.fromBigInt(BigInt.zero()));
    this.set("updated_at", Value.fromBigInt(BigInt.zero()));
    this.set("owner", Value.fromBytes(Bytes.empty()));
    this.set("investingAccount", Value.fromBytes(Bytes.empty()));
    this.set("investmentType", Value.fromI32(0));
    this.set("investmentAmount", Value.fromBigInt(BigInt.zero()));
    this.set("total_investment", Value.fromBigInt(BigInt.zero()));
    this.set("reinvest", Value.fromBoolean(false));
    this.set("tokens", Value.fromStringArray(new Array(0)));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save InvestmentBasket entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type InvestmentBasket must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("InvestmentBasket", id.toString(), this);
    }
  }

  static load(id: string): InvestmentBasket | null {
    return changetype<InvestmentBasket | null>(
      store.get("InvestmentBasket", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get basketId(): BigInt {
    let value = this.get("basketId");
    return value!.toBigInt();
  }

  set basketId(value: BigInt) {
    this.set("basketId", Value.fromBigInt(value));
  }

  get name(): string {
    let value = this.get("name");
    return value!.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get metadata(): string {
    let value = this.get("metadata");
    return value!.toString();
  }

  set metadata(value: string) {
    this.set("metadata", Value.fromString(value));
  }

  get investmentToken(): Bytes {
    let value = this.get("investmentToken");
    return value!.toBytes();
  }

  set investmentToken(value: Bytes) {
    this.set("investmentToken", Value.fromBytes(value));
  }

  get created_at(): BigInt {
    let value = this.get("created_at");
    return value!.toBigInt();
  }

  set created_at(value: BigInt) {
    this.set("created_at", Value.fromBigInt(value));
  }

  get updated_at(): BigInt {
    let value = this.get("updated_at");
    return value!.toBigInt();
  }

  set updated_at(value: BigInt) {
    this.set("updated_at", Value.fromBigInt(value));
  }

  get owner(): Bytes {
    let value = this.get("owner");
    return value!.toBytes();
  }

  set owner(value: Bytes) {
    this.set("owner", Value.fromBytes(value));
  }

  get investingAccount(): Bytes {
    let value = this.get("investingAccount");
    return value!.toBytes();
  }

  set investingAccount(value: Bytes) {
    this.set("investingAccount", Value.fromBytes(value));
  }

  get investmentType(): i32 {
    let value = this.get("investmentType");
    return value!.toI32();
  }

  set investmentType(value: i32) {
    this.set("investmentType", Value.fromI32(value));
  }

  get investmentAmount(): BigInt {
    let value = this.get("investmentAmount");
    return value!.toBigInt();
  }

  set investmentAmount(value: BigInt) {
    this.set("investmentAmount", Value.fromBigInt(value));
  }

  get total_investment(): BigInt {
    let value = this.get("total_investment");
    return value!.toBigInt();
  }

  set total_investment(value: BigInt) {
    this.set("total_investment", Value.fromBigInt(value));
  }

  get reinvest(): boolean {
    let value = this.get("reinvest");
    return value!.toBoolean();
  }

  set reinvest(value: boolean) {
    this.set("reinvest", Value.fromBoolean(value));
  }

  get tokens(): Array<string> {
    let value = this.get("tokens");
    return value!.toStringArray();
  }

  set tokens(value: Array<string>) {
    this.set("tokens", Value.fromStringArray(value));
  }
}

export class InvestmentTransaction extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("basket", Value.fromString(""));
    this.set("amount", Value.fromBigInt(BigInt.zero()));
    this.set("token", Value.fromBytes(Bytes.empty()));
    this.set("type", Value.fromI32(0));
    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save InvestmentTransaction entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type InvestmentTransaction must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("InvestmentTransaction", id.toString(), this);
    }
  }

  static load(id: string): InvestmentTransaction | null {
    return changetype<InvestmentTransaction | null>(
      store.get("InvestmentTransaction", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get basket(): string {
    let value = this.get("basket");
    return value!.toString();
  }

  set basket(value: string) {
    this.set("basket", Value.fromString(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get token(): Bytes {
    let value = this.get("token");
    return value!.toBytes();
  }

  set token(value: Bytes) {
    this.set("token", Value.fromBytes(value));
  }

  get type(): i32 {
    let value = this.get("type");
    return value!.toI32();
  }

  set type(value: i32) {
    this.set("type", Value.fromI32(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }
}

export class InvestingAccount extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("username", Value.fromString(""));
    this.set("owner", Value.fromBytes(Bytes.empty()));
    this.set("accountAddress", Value.fromBytes(Bytes.empty()));
    this.set("nftAddress", Value.fromBytes(Bytes.empty()));
    this.set("nftId", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save InvestingAccount entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type InvestingAccount must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("InvestingAccount", id.toString(), this);
    }
  }

  static load(id: string): InvestingAccount | null {
    return changetype<InvestingAccount | null>(
      store.get("InvestingAccount", id)
    );
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get username(): string {
    let value = this.get("username");
    return value!.toString();
  }

  set username(value: string) {
    this.set("username", Value.fromString(value));
  }

  get owner(): Bytes {
    let value = this.get("owner");
    return value!.toBytes();
  }

  set owner(value: Bytes) {
    this.set("owner", Value.fromBytes(value));
  }

  get accountAddress(): Bytes {
    let value = this.get("accountAddress");
    return value!.toBytes();
  }

  set accountAddress(value: Bytes) {
    this.set("accountAddress", Value.fromBytes(value));
  }

  get nftAddress(): Bytes {
    let value = this.get("nftAddress");
    return value!.toBytes();
  }

  set nftAddress(value: Bytes) {
    this.set("nftAddress", Value.fromBytes(value));
  }

  get nftId(): BigInt {
    let value = this.get("nftId");
    return value!.toBigInt();
  }

  set nftId(value: BigInt) {
    this.set("nftId", Value.fromBigInt(value));
  }
}
