/* eslint-disable */
import {
  makeGenericClientConstructor,
  ChannelCredentials,
  ChannelOptions,
  UntypedServiceImplementation,
  handleUnaryCall,
  Client,
  ClientUnaryCall,
  Metadata,
  CallOptions,
  ServiceError,
} from '@grpc/grpc-js';
import { Timestamp } from './google/protobuf/timestamp';
import Long from 'long';
import _m0 from 'protobufjs/minimal';

export const protobufPackage = 'hipstershop';

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface AddItemRequest {
  userId: string;
  item: CartItem | undefined;
}

export interface EmptyCartRequest {
  userId: string;
}

export interface GetCartRequest {
  userId: string;
}

export interface Cart {
  userId: string;
  items: CartItem[];
}

export interface Empty {}

export interface ListRecommendationsRequest {
  userId: string;
  productIds: string[];
}

export interface ListRecommendationsResponse {
  productIds: string[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  picture: string;
  priceUsd: Money | undefined;
  /**
   * Categories such as "clothing" or "kitchen" that can be used to look up
   * other related products.
   */
  categories: string[];
}

export interface ListProductsResponse {
  products: Product[];
}

export interface GetProductRequest {
  id: string;
}

export interface SearchProductsRequest {
  query: string;
}

export interface SearchProductsResponse {
  results: Product[];
}

export interface GetQuoteRequest {
  address: Address | undefined;
  items: CartItem[];
}

export interface GetQuoteResponse {
  costUsd: Money | undefined;
}

export interface ShipOrderRequest {
  address: Address | undefined;
  items: CartItem[];
}

export interface ShipOrderResponse {
  trackingId: string;
}

export interface Address {
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  zipCode: number;
}

/** Represents an amount of money with its currency type. */
export interface Money {
  /** The 3-letter currency code defined in ISO 4217. */
  currencyCode: string;
  /**
   * The whole units of the amount.
   * For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar.
   */
  units: number;
  /**
   * Number of nano (10^-9) units of the amount.
   * The value must be between -999,999,999 and +999,999,999 inclusive.
   * If `units` is positive, `nanos` must be positive or zero.
   * If `units` is zero, `nanos` can be positive, zero, or negative.
   * If `units` is negative, `nanos` must be negative or zero.
   * For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000.
   */
  nanos: number;
}

export interface GetSupportedCurrenciesResponse {
  /** The 3-letter currency code defined in ISO 4217. */
  currencyCodes: string[];
}

export interface CurrencyConversionRequest {
  from: Money | undefined;
  /** The 3-letter currency code defined in ISO 4217. */
  toCode: string;
}

export interface CreditCardInfo {
  creditCardNumber: string;
  creditCardCvv: number;
  creditCardExpirationYear: number;
  creditCardExpirationMonth: number;
}

export interface ChargeRequest {
  amount: Money | undefined;
  creditCard: CreditCardInfo | undefined;
}

export interface ChargeResponse {
  transactionId: string;
}

export interface OrderItem {
  item: CartItem | undefined;
  cost: Money | undefined;
}

export interface OrderResult {
  orderId: string;
  shippingTrackingId: string;
  shippingCost: Money | undefined;
  shippingAddress: Address | undefined;
  items: OrderItem[];
}

export interface SendOrderConfirmationRequest {
  email: string;
  order: OrderResult | undefined;
}

export interface PlaceOrderRequest {
  userId: string;
  userCurrency: string;
  address: Address | undefined;
  email: string;
  creditCard: CreditCardInfo | undefined;
}

export interface PlaceOrderResponse {
  order: OrderResult | undefined;
}

export interface AdRequest {
  /** List of important key words from the current page describing the context. */
  contextKeys: string[];
}

export interface AdResponse {
  ads: Ad[];
}

export interface Ad {
  /** url to redirect to when an ad is clicked. */
  redirectUrl: string;
  /** short advertisement text to display. */
  text: string;
}

export interface Flag {
  name: string;
  description: string;
  enabled: boolean;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

export interface GetFlagRequest {
  name: string;
}

export interface GetFlagResponse {
  flag: Flag | undefined;
}

export interface CreateFlagRequest {
  name: string;
  description: string;
  enabled: boolean;
}

export interface CreateFlagResponse {
  flag: Flag | undefined;
}

export interface UpdateFlagRequest {
  name: string;
  enabled: boolean;
}

export interface UpdateFlagResponse {}

export interface ListFlagsRequest {}

export interface ListFlagsResponse {
  flag: Flag[];
}

export interface DeleteFlagRequest {
  name: string;
}

export interface DeleteFlagResponse {}

function createBaseCartItem(): CartItem {
  return { productId: '', quantity: 0 };
}

export const CartItem = {
  encode(message: CartItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.productId !== '') {
      writer.uint32(10).string(message.productId);
    }
    if (message.quantity !== 0) {
      writer.uint32(16).int32(message.quantity);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CartItem {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCartItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.productId = reader.string();
          break;
        case 2:
          message.quantity = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CartItem {
    return {
      productId: isSet(object.productId) ? String(object.productId) : '',
      quantity: isSet(object.quantity) ? Number(object.quantity) : 0,
    };
  },

  toJSON(message: CartItem): unknown {
    const obj: any = {};
    message.productId !== undefined && (obj.productId = message.productId);
    message.quantity !== undefined && (obj.quantity = Math.round(message.quantity));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CartItem>, I>>(object: I): CartItem {
    const message = createBaseCartItem();
    message.productId = object.productId ?? '';
    message.quantity = object.quantity ?? 0;
    return message;
  },
};

function createBaseAddItemRequest(): AddItemRequest {
  return { userId: '', item: undefined };
}

export const AddItemRequest = {
  encode(message: AddItemRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== '') {
      writer.uint32(10).string(message.userId);
    }
    if (message.item !== undefined) {
      CartItem.encode(message.item, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AddItemRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddItemRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = reader.string();
          break;
        case 2:
          message.item = CartItem.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AddItemRequest {
    return {
      userId: isSet(object.userId) ? String(object.userId) : '',
      item: isSet(object.item) ? CartItem.fromJSON(object.item) : undefined,
    };
  },

  toJSON(message: AddItemRequest): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = message.userId);
    message.item !== undefined && (obj.item = message.item ? CartItem.toJSON(message.item) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AddItemRequest>, I>>(object: I): AddItemRequest {
    const message = createBaseAddItemRequest();
    message.userId = object.userId ?? '';
    message.item = object.item !== undefined && object.item !== null ? CartItem.fromPartial(object.item) : undefined;
    return message;
  },
};

function createBaseEmptyCartRequest(): EmptyCartRequest {
  return { userId: '' };
}

export const EmptyCartRequest = {
  encode(message: EmptyCartRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== '') {
      writer.uint32(10).string(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EmptyCartRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmptyCartRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EmptyCartRequest {
    return {
      userId: isSet(object.userId) ? String(object.userId) : '',
    };
  },

  toJSON(message: EmptyCartRequest): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = message.userId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EmptyCartRequest>, I>>(object: I): EmptyCartRequest {
    const message = createBaseEmptyCartRequest();
    message.userId = object.userId ?? '';
    return message;
  },
};

function createBaseGetCartRequest(): GetCartRequest {
  return { userId: '' };
}

export const GetCartRequest = {
  encode(message: GetCartRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== '') {
      writer.uint32(10).string(message.userId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetCartRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetCartRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetCartRequest {
    return {
      userId: isSet(object.userId) ? String(object.userId) : '',
    };
  },

  toJSON(message: GetCartRequest): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = message.userId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetCartRequest>, I>>(object: I): GetCartRequest {
    const message = createBaseGetCartRequest();
    message.userId = object.userId ?? '';
    return message;
  },
};

function createBaseCart(): Cart {
  return { userId: '', items: [] };
}

export const Cart = {
  encode(message: Cart, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== '') {
      writer.uint32(10).string(message.userId);
    }
    for (const v of message.items) {
      CartItem.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Cart {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCart();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = reader.string();
          break;
        case 2:
          message.items.push(CartItem.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Cart {
    return {
      userId: isSet(object.userId) ? String(object.userId) : '',
      items: Array.isArray(object?.items) ? object.items.map((e: any) => CartItem.fromJSON(e)) : [],
    };
  },

  toJSON(message: Cart): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = message.userId);
    if (message.items) {
      obj.items = message.items.map(e => (e ? CartItem.toJSON(e) : undefined));
    } else {
      obj.items = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Cart>, I>>(object: I): Cart {
    const message = createBaseCart();
    message.userId = object.userId ?? '';
    message.items = object.items?.map(e => CartItem.fromPartial(e)) || [];
    return message;
  },
};

function createBaseEmpty(): Empty {
  return {};
}

export const Empty = {
  encode(_: Empty, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Empty {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmpty();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): Empty {
    return {};
  },

  toJSON(_: Empty): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Empty>, I>>(_: I): Empty {
    const message = createBaseEmpty();
    return message;
  },
};

function createBaseListRecommendationsRequest(): ListRecommendationsRequest {
  return { userId: '', productIds: [] };
}

export const ListRecommendationsRequest = {
  encode(message: ListRecommendationsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== '') {
      writer.uint32(10).string(message.userId);
    }
    for (const v of message.productIds) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListRecommendationsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListRecommendationsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = reader.string();
          break;
        case 2:
          message.productIds.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListRecommendationsRequest {
    return {
      userId: isSet(object.userId) ? String(object.userId) : '',
      productIds: Array.isArray(object?.productIds) ? object.productIds.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: ListRecommendationsRequest): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = message.userId);
    if (message.productIds) {
      obj.productIds = message.productIds.map(e => e);
    } else {
      obj.productIds = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListRecommendationsRequest>, I>>(object: I): ListRecommendationsRequest {
    const message = createBaseListRecommendationsRequest();
    message.userId = object.userId ?? '';
    message.productIds = object.productIds?.map(e => e) || [];
    return message;
  },
};

function createBaseListRecommendationsResponse(): ListRecommendationsResponse {
  return { productIds: [] };
}

export const ListRecommendationsResponse = {
  encode(message: ListRecommendationsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.productIds) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListRecommendationsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListRecommendationsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.productIds.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListRecommendationsResponse {
    return {
      productIds: Array.isArray(object?.productIds) ? object.productIds.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: ListRecommendationsResponse): unknown {
    const obj: any = {};
    if (message.productIds) {
      obj.productIds = message.productIds.map(e => e);
    } else {
      obj.productIds = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListRecommendationsResponse>, I>>(object: I): ListRecommendationsResponse {
    const message = createBaseListRecommendationsResponse();
    message.productIds = object.productIds?.map(e => e) || [];
    return message;
  },
};

function createBaseProduct(): Product {
  return { id: '', name: '', description: '', picture: '', priceUsd: undefined, categories: [] };
}

export const Product = {
  encode(message: Product, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== '') {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== '') {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== '') {
      writer.uint32(26).string(message.description);
    }
    if (message.picture !== '') {
      writer.uint32(34).string(message.picture);
    }
    if (message.priceUsd !== undefined) {
      Money.encode(message.priceUsd, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.categories) {
      writer.uint32(50).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Product {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProduct();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        case 4:
          message.picture = reader.string();
          break;
        case 5:
          message.priceUsd = Money.decode(reader, reader.uint32());
          break;
        case 6:
          message.categories.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Product {
    return {
      id: isSet(object.id) ? String(object.id) : '',
      name: isSet(object.name) ? String(object.name) : '',
      description: isSet(object.description) ? String(object.description) : '',
      picture: isSet(object.picture) ? String(object.picture) : '',
      priceUsd: isSet(object.priceUsd) ? Money.fromJSON(object.priceUsd) : undefined,
      categories: Array.isArray(object?.categories) ? object.categories.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: Product): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.picture !== undefined && (obj.picture = message.picture);
    message.priceUsd !== undefined && (obj.priceUsd = message.priceUsd ? Money.toJSON(message.priceUsd) : undefined);
    if (message.categories) {
      obj.categories = message.categories.map(e => e);
    } else {
      obj.categories = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Product>, I>>(object: I): Product {
    const message = createBaseProduct();
    message.id = object.id ?? '';
    message.name = object.name ?? '';
    message.description = object.description ?? '';
    message.picture = object.picture ?? '';
    message.priceUsd =
      object.priceUsd !== undefined && object.priceUsd !== null ? Money.fromPartial(object.priceUsd) : undefined;
    message.categories = object.categories?.map(e => e) || [];
    return message;
  },
};

function createBaseListProductsResponse(): ListProductsResponse {
  return { products: [] };
}

export const ListProductsResponse = {
  encode(message: ListProductsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.products) {
      Product.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListProductsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListProductsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.products.push(Product.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListProductsResponse {
    return {
      products: Array.isArray(object?.products) ? object.products.map((e: any) => Product.fromJSON(e)) : [],
    };
  },

  toJSON(message: ListProductsResponse): unknown {
    const obj: any = {};
    if (message.products) {
      obj.products = message.products.map(e => (e ? Product.toJSON(e) : undefined));
    } else {
      obj.products = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListProductsResponse>, I>>(object: I): ListProductsResponse {
    const message = createBaseListProductsResponse();
    message.products = object.products?.map(e => Product.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetProductRequest(): GetProductRequest {
  return { id: '' };
}

export const GetProductRequest = {
  encode(message: GetProductRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== '') {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetProductRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetProductRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetProductRequest {
    return {
      id: isSet(object.id) ? String(object.id) : '',
    };
  },

  toJSON(message: GetProductRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetProductRequest>, I>>(object: I): GetProductRequest {
    const message = createBaseGetProductRequest();
    message.id = object.id ?? '';
    return message;
  },
};

function createBaseSearchProductsRequest(): SearchProductsRequest {
  return { query: '' };
}

export const SearchProductsRequest = {
  encode(message: SearchProductsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.query !== '') {
      writer.uint32(10).string(message.query);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SearchProductsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSearchProductsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.query = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SearchProductsRequest {
    return {
      query: isSet(object.query) ? String(object.query) : '',
    };
  },

  toJSON(message: SearchProductsRequest): unknown {
    const obj: any = {};
    message.query !== undefined && (obj.query = message.query);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SearchProductsRequest>, I>>(object: I): SearchProductsRequest {
    const message = createBaseSearchProductsRequest();
    message.query = object.query ?? '';
    return message;
  },
};

function createBaseSearchProductsResponse(): SearchProductsResponse {
  return { results: [] };
}

export const SearchProductsResponse = {
  encode(message: SearchProductsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.results) {
      Product.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SearchProductsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSearchProductsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.results.push(Product.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SearchProductsResponse {
    return {
      results: Array.isArray(object?.results) ? object.results.map((e: any) => Product.fromJSON(e)) : [],
    };
  },

  toJSON(message: SearchProductsResponse): unknown {
    const obj: any = {};
    if (message.results) {
      obj.results = message.results.map(e => (e ? Product.toJSON(e) : undefined));
    } else {
      obj.results = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SearchProductsResponse>, I>>(object: I): SearchProductsResponse {
    const message = createBaseSearchProductsResponse();
    message.results = object.results?.map(e => Product.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetQuoteRequest(): GetQuoteRequest {
  return { address: undefined, items: [] };
}

export const GetQuoteRequest = {
  encode(message: GetQuoteRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== undefined) {
      Address.encode(message.address, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.items) {
      CartItem.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetQuoteRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetQuoteRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = Address.decode(reader, reader.uint32());
          break;
        case 2:
          message.items.push(CartItem.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetQuoteRequest {
    return {
      address: isSet(object.address) ? Address.fromJSON(object.address) : undefined,
      items: Array.isArray(object?.items) ? object.items.map((e: any) => CartItem.fromJSON(e)) : [],
    };
  },

  toJSON(message: GetQuoteRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address ? Address.toJSON(message.address) : undefined);
    if (message.items) {
      obj.items = message.items.map(e => (e ? CartItem.toJSON(e) : undefined));
    } else {
      obj.items = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetQuoteRequest>, I>>(object: I): GetQuoteRequest {
    const message = createBaseGetQuoteRequest();
    message.address =
      object.address !== undefined && object.address !== null ? Address.fromPartial(object.address) : undefined;
    message.items = object.items?.map(e => CartItem.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetQuoteResponse(): GetQuoteResponse {
  return { costUsd: undefined };
}

export const GetQuoteResponse = {
  encode(message: GetQuoteResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.costUsd !== undefined) {
      Money.encode(message.costUsd, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetQuoteResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetQuoteResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.costUsd = Money.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetQuoteResponse {
    return {
      costUsd: isSet(object.costUsd) ? Money.fromJSON(object.costUsd) : undefined,
    };
  },

  toJSON(message: GetQuoteResponse): unknown {
    const obj: any = {};
    message.costUsd !== undefined && (obj.costUsd = message.costUsd ? Money.toJSON(message.costUsd) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetQuoteResponse>, I>>(object: I): GetQuoteResponse {
    const message = createBaseGetQuoteResponse();
    message.costUsd =
      object.costUsd !== undefined && object.costUsd !== null ? Money.fromPartial(object.costUsd) : undefined;
    return message;
  },
};

function createBaseShipOrderRequest(): ShipOrderRequest {
  return { address: undefined, items: [] };
}

export const ShipOrderRequest = {
  encode(message: ShipOrderRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== undefined) {
      Address.encode(message.address, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.items) {
      CartItem.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ShipOrderRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseShipOrderRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = Address.decode(reader, reader.uint32());
          break;
        case 2:
          message.items.push(CartItem.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ShipOrderRequest {
    return {
      address: isSet(object.address) ? Address.fromJSON(object.address) : undefined,
      items: Array.isArray(object?.items) ? object.items.map((e: any) => CartItem.fromJSON(e)) : [],
    };
  },

  toJSON(message: ShipOrderRequest): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address ? Address.toJSON(message.address) : undefined);
    if (message.items) {
      obj.items = message.items.map(e => (e ? CartItem.toJSON(e) : undefined));
    } else {
      obj.items = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ShipOrderRequest>, I>>(object: I): ShipOrderRequest {
    const message = createBaseShipOrderRequest();
    message.address =
      object.address !== undefined && object.address !== null ? Address.fromPartial(object.address) : undefined;
    message.items = object.items?.map(e => CartItem.fromPartial(e)) || [];
    return message;
  },
};

function createBaseShipOrderResponse(): ShipOrderResponse {
  return { trackingId: '' };
}

export const ShipOrderResponse = {
  encode(message: ShipOrderResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.trackingId !== '') {
      writer.uint32(10).string(message.trackingId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ShipOrderResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseShipOrderResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.trackingId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ShipOrderResponse {
    return {
      trackingId: isSet(object.trackingId) ? String(object.trackingId) : '',
    };
  },

  toJSON(message: ShipOrderResponse): unknown {
    const obj: any = {};
    message.trackingId !== undefined && (obj.trackingId = message.trackingId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ShipOrderResponse>, I>>(object: I): ShipOrderResponse {
    const message = createBaseShipOrderResponse();
    message.trackingId = object.trackingId ?? '';
    return message;
  },
};

function createBaseAddress(): Address {
  return { streetAddress: '', city: '', state: '', country: '', zipCode: 0 };
}

export const Address = {
  encode(message: Address, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.streetAddress !== '') {
      writer.uint32(10).string(message.streetAddress);
    }
    if (message.city !== '') {
      writer.uint32(18).string(message.city);
    }
    if (message.state !== '') {
      writer.uint32(26).string(message.state);
    }
    if (message.country !== '') {
      writer.uint32(34).string(message.country);
    }
    if (message.zipCode !== 0) {
      writer.uint32(40).int32(message.zipCode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Address {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.streetAddress = reader.string();
          break;
        case 2:
          message.city = reader.string();
          break;
        case 3:
          message.state = reader.string();
          break;
        case 4:
          message.country = reader.string();
          break;
        case 5:
          message.zipCode = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Address {
    return {
      streetAddress: isSet(object.streetAddress) ? String(object.streetAddress) : '',
      city: isSet(object.city) ? String(object.city) : '',
      state: isSet(object.state) ? String(object.state) : '',
      country: isSet(object.country) ? String(object.country) : '',
      zipCode: isSet(object.zipCode) ? Number(object.zipCode) : 0,
    };
  },

  toJSON(message: Address): unknown {
    const obj: any = {};
    message.streetAddress !== undefined && (obj.streetAddress = message.streetAddress);
    message.city !== undefined && (obj.city = message.city);
    message.state !== undefined && (obj.state = message.state);
    message.country !== undefined && (obj.country = message.country);
    message.zipCode !== undefined && (obj.zipCode = Math.round(message.zipCode));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Address>, I>>(object: I): Address {
    const message = createBaseAddress();
    message.streetAddress = object.streetAddress ?? '';
    message.city = object.city ?? '';
    message.state = object.state ?? '';
    message.country = object.country ?? '';
    message.zipCode = object.zipCode ?? 0;
    return message;
  },
};

function createBaseMoney(): Money {
  return { currencyCode: '', units: 0, nanos: 0 };
}

export const Money = {
  encode(message: Money, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.currencyCode !== '') {
      writer.uint32(10).string(message.currencyCode);
    }
    if (message.units !== 0) {
      writer.uint32(16).int64(message.units);
    }
    if (message.nanos !== 0) {
      writer.uint32(24).int32(message.nanos);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Money {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMoney();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.currencyCode = reader.string();
          break;
        case 2:
          message.units = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.nanos = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Money {
    return {
      currencyCode: isSet(object.currencyCode) ? String(object.currencyCode) : '',
      units: isSet(object.units) ? Number(object.units) : 0,
      nanos: isSet(object.nanos) ? Number(object.nanos) : 0,
    };
  },

  toJSON(message: Money): unknown {
    const obj: any = {};
    message.currencyCode !== undefined && (obj.currencyCode = message.currencyCode);
    message.units !== undefined && (obj.units = Math.round(message.units));
    message.nanos !== undefined && (obj.nanos = Math.round(message.nanos));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Money>, I>>(object: I): Money {
    const message = createBaseMoney();
    message.currencyCode = object.currencyCode ?? '';
    message.units = object.units ?? 0;
    message.nanos = object.nanos ?? 0;
    return message;
  },
};

function createBaseGetSupportedCurrenciesResponse(): GetSupportedCurrenciesResponse {
  return { currencyCodes: [] };
}

export const GetSupportedCurrenciesResponse = {
  encode(message: GetSupportedCurrenciesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.currencyCodes) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSupportedCurrenciesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSupportedCurrenciesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.currencyCodes.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetSupportedCurrenciesResponse {
    return {
      currencyCodes: Array.isArray(object?.currencyCodes) ? object.currencyCodes.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: GetSupportedCurrenciesResponse): unknown {
    const obj: any = {};
    if (message.currencyCodes) {
      obj.currencyCodes = message.currencyCodes.map(e => e);
    } else {
      obj.currencyCodes = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetSupportedCurrenciesResponse>, I>>(
    object: I
  ): GetSupportedCurrenciesResponse {
    const message = createBaseGetSupportedCurrenciesResponse();
    message.currencyCodes = object.currencyCodes?.map(e => e) || [];
    return message;
  },
};

function createBaseCurrencyConversionRequest(): CurrencyConversionRequest {
  return { from: undefined, toCode: '' };
}

export const CurrencyConversionRequest = {
  encode(message: CurrencyConversionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.from !== undefined) {
      Money.encode(message.from, writer.uint32(10).fork()).ldelim();
    }
    if (message.toCode !== '') {
      writer.uint32(18).string(message.toCode);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CurrencyConversionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCurrencyConversionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.from = Money.decode(reader, reader.uint32());
          break;
        case 2:
          message.toCode = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CurrencyConversionRequest {
    return {
      from: isSet(object.from) ? Money.fromJSON(object.from) : undefined,
      toCode: isSet(object.toCode) ? String(object.toCode) : '',
    };
  },

  toJSON(message: CurrencyConversionRequest): unknown {
    const obj: any = {};
    message.from !== undefined && (obj.from = message.from ? Money.toJSON(message.from) : undefined);
    message.toCode !== undefined && (obj.toCode = message.toCode);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CurrencyConversionRequest>, I>>(object: I): CurrencyConversionRequest {
    const message = createBaseCurrencyConversionRequest();
    message.from = object.from !== undefined && object.from !== null ? Money.fromPartial(object.from) : undefined;
    message.toCode = object.toCode ?? '';
    return message;
  },
};

function createBaseCreditCardInfo(): CreditCardInfo {
  return { creditCardNumber: '', creditCardCvv: 0, creditCardExpirationYear: 0, creditCardExpirationMonth: 0 };
}

export const CreditCardInfo = {
  encode(message: CreditCardInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creditCardNumber !== '') {
      writer.uint32(10).string(message.creditCardNumber);
    }
    if (message.creditCardCvv !== 0) {
      writer.uint32(16).int32(message.creditCardCvv);
    }
    if (message.creditCardExpirationYear !== 0) {
      writer.uint32(24).int32(message.creditCardExpirationYear);
    }
    if (message.creditCardExpirationMonth !== 0) {
      writer.uint32(32).int32(message.creditCardExpirationMonth);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreditCardInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreditCardInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creditCardNumber = reader.string();
          break;
        case 2:
          message.creditCardCvv = reader.int32();
          break;
        case 3:
          message.creditCardExpirationYear = reader.int32();
          break;
        case 4:
          message.creditCardExpirationMonth = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreditCardInfo {
    return {
      creditCardNumber: isSet(object.creditCardNumber) ? String(object.creditCardNumber) : '',
      creditCardCvv: isSet(object.creditCardCvv) ? Number(object.creditCardCvv) : 0,
      creditCardExpirationYear: isSet(object.creditCardExpirationYear) ? Number(object.creditCardExpirationYear) : 0,
      creditCardExpirationMonth: isSet(object.creditCardExpirationMonth) ? Number(object.creditCardExpirationMonth) : 0,
    };
  },

  toJSON(message: CreditCardInfo): unknown {
    const obj: any = {};
    message.creditCardNumber !== undefined && (obj.creditCardNumber = message.creditCardNumber);
    message.creditCardCvv !== undefined && (obj.creditCardCvv = Math.round(message.creditCardCvv));
    message.creditCardExpirationYear !== undefined &&
      (obj.creditCardExpirationYear = Math.round(message.creditCardExpirationYear));
    message.creditCardExpirationMonth !== undefined &&
      (obj.creditCardExpirationMonth = Math.round(message.creditCardExpirationMonth));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreditCardInfo>, I>>(object: I): CreditCardInfo {
    const message = createBaseCreditCardInfo();
    message.creditCardNumber = object.creditCardNumber ?? '';
    message.creditCardCvv = object.creditCardCvv ?? 0;
    message.creditCardExpirationYear = object.creditCardExpirationYear ?? 0;
    message.creditCardExpirationMonth = object.creditCardExpirationMonth ?? 0;
    return message;
  },
};

function createBaseChargeRequest(): ChargeRequest {
  return { amount: undefined, creditCard: undefined };
}

export const ChargeRequest = {
  encode(message: ChargeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.amount !== undefined) {
      Money.encode(message.amount, writer.uint32(10).fork()).ldelim();
    }
    if (message.creditCard !== undefined) {
      CreditCardInfo.encode(message.creditCard, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChargeRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChargeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.amount = Money.decode(reader, reader.uint32());
          break;
        case 2:
          message.creditCard = CreditCardInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChargeRequest {
    return {
      amount: isSet(object.amount) ? Money.fromJSON(object.amount) : undefined,
      creditCard: isSet(object.creditCard) ? CreditCardInfo.fromJSON(object.creditCard) : undefined,
    };
  },

  toJSON(message: ChargeRequest): unknown {
    const obj: any = {};
    message.amount !== undefined && (obj.amount = message.amount ? Money.toJSON(message.amount) : undefined);
    message.creditCard !== undefined &&
      (obj.creditCard = message.creditCard ? CreditCardInfo.toJSON(message.creditCard) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ChargeRequest>, I>>(object: I): ChargeRequest {
    const message = createBaseChargeRequest();
    message.amount =
      object.amount !== undefined && object.amount !== null ? Money.fromPartial(object.amount) : undefined;
    message.creditCard =
      object.creditCard !== undefined && object.creditCard !== null
        ? CreditCardInfo.fromPartial(object.creditCard)
        : undefined;
    return message;
  },
};

function createBaseChargeResponse(): ChargeResponse {
  return { transactionId: '' };
}

export const ChargeResponse = {
  encode(message: ChargeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.transactionId !== '') {
      writer.uint32(10).string(message.transactionId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChargeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChargeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.transactionId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChargeResponse {
    return {
      transactionId: isSet(object.transactionId) ? String(object.transactionId) : '',
    };
  },

  toJSON(message: ChargeResponse): unknown {
    const obj: any = {};
    message.transactionId !== undefined && (obj.transactionId = message.transactionId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ChargeResponse>, I>>(object: I): ChargeResponse {
    const message = createBaseChargeResponse();
    message.transactionId = object.transactionId ?? '';
    return message;
  },
};

function createBaseOrderItem(): OrderItem {
  return { item: undefined, cost: undefined };
}

export const OrderItem = {
  encode(message: OrderItem, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.item !== undefined) {
      CartItem.encode(message.item, writer.uint32(10).fork()).ldelim();
    }
    if (message.cost !== undefined) {
      Money.encode(message.cost, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrderItem {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrderItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.item = CartItem.decode(reader, reader.uint32());
          break;
        case 2:
          message.cost = Money.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): OrderItem {
    return {
      item: isSet(object.item) ? CartItem.fromJSON(object.item) : undefined,
      cost: isSet(object.cost) ? Money.fromJSON(object.cost) : undefined,
    };
  },

  toJSON(message: OrderItem): unknown {
    const obj: any = {};
    message.item !== undefined && (obj.item = message.item ? CartItem.toJSON(message.item) : undefined);
    message.cost !== undefined && (obj.cost = message.cost ? Money.toJSON(message.cost) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<OrderItem>, I>>(object: I): OrderItem {
    const message = createBaseOrderItem();
    message.item = object.item !== undefined && object.item !== null ? CartItem.fromPartial(object.item) : undefined;
    message.cost = object.cost !== undefined && object.cost !== null ? Money.fromPartial(object.cost) : undefined;
    return message;
  },
};

function createBaseOrderResult(): OrderResult {
  return { orderId: '', shippingTrackingId: '', shippingCost: undefined, shippingAddress: undefined, items: [] };
}

export const OrderResult = {
  encode(message: OrderResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.orderId !== '') {
      writer.uint32(10).string(message.orderId);
    }
    if (message.shippingTrackingId !== '') {
      writer.uint32(18).string(message.shippingTrackingId);
    }
    if (message.shippingCost !== undefined) {
      Money.encode(message.shippingCost, writer.uint32(26).fork()).ldelim();
    }
    if (message.shippingAddress !== undefined) {
      Address.encode(message.shippingAddress, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.items) {
      OrderItem.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OrderResult {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOrderResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orderId = reader.string();
          break;
        case 2:
          message.shippingTrackingId = reader.string();
          break;
        case 3:
          message.shippingCost = Money.decode(reader, reader.uint32());
          break;
        case 4:
          message.shippingAddress = Address.decode(reader, reader.uint32());
          break;
        case 5:
          message.items.push(OrderItem.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): OrderResult {
    return {
      orderId: isSet(object.orderId) ? String(object.orderId) : '',
      shippingTrackingId: isSet(object.shippingTrackingId) ? String(object.shippingTrackingId) : '',
      shippingCost: isSet(object.shippingCost) ? Money.fromJSON(object.shippingCost) : undefined,
      shippingAddress: isSet(object.shippingAddress) ? Address.fromJSON(object.shippingAddress) : undefined,
      items: Array.isArray(object?.items) ? object.items.map((e: any) => OrderItem.fromJSON(e)) : [],
    };
  },

  toJSON(message: OrderResult): unknown {
    const obj: any = {};
    message.orderId !== undefined && (obj.orderId = message.orderId);
    message.shippingTrackingId !== undefined && (obj.shippingTrackingId = message.shippingTrackingId);
    message.shippingCost !== undefined &&
      (obj.shippingCost = message.shippingCost ? Money.toJSON(message.shippingCost) : undefined);
    message.shippingAddress !== undefined &&
      (obj.shippingAddress = message.shippingAddress ? Address.toJSON(message.shippingAddress) : undefined);
    if (message.items) {
      obj.items = message.items.map(e => (e ? OrderItem.toJSON(e) : undefined));
    } else {
      obj.items = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<OrderResult>, I>>(object: I): OrderResult {
    const message = createBaseOrderResult();
    message.orderId = object.orderId ?? '';
    message.shippingTrackingId = object.shippingTrackingId ?? '';
    message.shippingCost =
      object.shippingCost !== undefined && object.shippingCost !== null
        ? Money.fromPartial(object.shippingCost)
        : undefined;
    message.shippingAddress =
      object.shippingAddress !== undefined && object.shippingAddress !== null
        ? Address.fromPartial(object.shippingAddress)
        : undefined;
    message.items = object.items?.map(e => OrderItem.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSendOrderConfirmationRequest(): SendOrderConfirmationRequest {
  return { email: '', order: undefined };
}

export const SendOrderConfirmationRequest = {
  encode(message: SendOrderConfirmationRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.email !== '') {
      writer.uint32(10).string(message.email);
    }
    if (message.order !== undefined) {
      OrderResult.encode(message.order, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendOrderConfirmationRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendOrderConfirmationRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.email = reader.string();
          break;
        case 2:
          message.order = OrderResult.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SendOrderConfirmationRequest {
    return {
      email: isSet(object.email) ? String(object.email) : '',
      order: isSet(object.order) ? OrderResult.fromJSON(object.order) : undefined,
    };
  },

  toJSON(message: SendOrderConfirmationRequest): unknown {
    const obj: any = {};
    message.email !== undefined && (obj.email = message.email);
    message.order !== undefined && (obj.order = message.order ? OrderResult.toJSON(message.order) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SendOrderConfirmationRequest>, I>>(object: I): SendOrderConfirmationRequest {
    const message = createBaseSendOrderConfirmationRequest();
    message.email = object.email ?? '';
    message.order =
      object.order !== undefined && object.order !== null ? OrderResult.fromPartial(object.order) : undefined;
    return message;
  },
};

function createBasePlaceOrderRequest(): PlaceOrderRequest {
  return { userId: '', userCurrency: '', address: undefined, email: '', creditCard: undefined };
}

export const PlaceOrderRequest = {
  encode(message: PlaceOrderRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.userId !== '') {
      writer.uint32(10).string(message.userId);
    }
    if (message.userCurrency !== '') {
      writer.uint32(18).string(message.userCurrency);
    }
    if (message.address !== undefined) {
      Address.encode(message.address, writer.uint32(26).fork()).ldelim();
    }
    if (message.email !== '') {
      writer.uint32(42).string(message.email);
    }
    if (message.creditCard !== undefined) {
      CreditCardInfo.encode(message.creditCard, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PlaceOrderRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlaceOrderRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.userId = reader.string();
          break;
        case 2:
          message.userCurrency = reader.string();
          break;
        case 3:
          message.address = Address.decode(reader, reader.uint32());
          break;
        case 5:
          message.email = reader.string();
          break;
        case 6:
          message.creditCard = CreditCardInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PlaceOrderRequest {
    return {
      userId: isSet(object.userId) ? String(object.userId) : '',
      userCurrency: isSet(object.userCurrency) ? String(object.userCurrency) : '',
      address: isSet(object.address) ? Address.fromJSON(object.address) : undefined,
      email: isSet(object.email) ? String(object.email) : '',
      creditCard: isSet(object.creditCard) ? CreditCardInfo.fromJSON(object.creditCard) : undefined,
    };
  },

  toJSON(message: PlaceOrderRequest): unknown {
    const obj: any = {};
    message.userId !== undefined && (obj.userId = message.userId);
    message.userCurrency !== undefined && (obj.userCurrency = message.userCurrency);
    message.address !== undefined && (obj.address = message.address ? Address.toJSON(message.address) : undefined);
    message.email !== undefined && (obj.email = message.email);
    message.creditCard !== undefined &&
      (obj.creditCard = message.creditCard ? CreditCardInfo.toJSON(message.creditCard) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PlaceOrderRequest>, I>>(object: I): PlaceOrderRequest {
    const message = createBasePlaceOrderRequest();
    message.userId = object.userId ?? '';
    message.userCurrency = object.userCurrency ?? '';
    message.address =
      object.address !== undefined && object.address !== null ? Address.fromPartial(object.address) : undefined;
    message.email = object.email ?? '';
    message.creditCard =
      object.creditCard !== undefined && object.creditCard !== null
        ? CreditCardInfo.fromPartial(object.creditCard)
        : undefined;
    return message;
  },
};

function createBasePlaceOrderResponse(): PlaceOrderResponse {
  return { order: undefined };
}

export const PlaceOrderResponse = {
  encode(message: PlaceOrderResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.order !== undefined) {
      OrderResult.encode(message.order, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PlaceOrderResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePlaceOrderResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.order = OrderResult.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PlaceOrderResponse {
    return {
      order: isSet(object.order) ? OrderResult.fromJSON(object.order) : undefined,
    };
  },

  toJSON(message: PlaceOrderResponse): unknown {
    const obj: any = {};
    message.order !== undefined && (obj.order = message.order ? OrderResult.toJSON(message.order) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PlaceOrderResponse>, I>>(object: I): PlaceOrderResponse {
    const message = createBasePlaceOrderResponse();
    message.order =
      object.order !== undefined && object.order !== null ? OrderResult.fromPartial(object.order) : undefined;
    return message;
  },
};

function createBaseAdRequest(): AdRequest {
  return { contextKeys: [] };
}

export const AdRequest = {
  encode(message: AdRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.contextKeys) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AdRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAdRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contextKeys.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AdRequest {
    return {
      contextKeys: Array.isArray(object?.contextKeys) ? object.contextKeys.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: AdRequest): unknown {
    const obj: any = {};
    if (message.contextKeys) {
      obj.contextKeys = message.contextKeys.map(e => e);
    } else {
      obj.contextKeys = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AdRequest>, I>>(object: I): AdRequest {
    const message = createBaseAdRequest();
    message.contextKeys = object.contextKeys?.map(e => e) || [];
    return message;
  },
};

function createBaseAdResponse(): AdResponse {
  return { ads: [] };
}

export const AdResponse = {
  encode(message: AdResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.ads) {
      Ad.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AdResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ads.push(Ad.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AdResponse {
    return {
      ads: Array.isArray(object?.ads) ? object.ads.map((e: any) => Ad.fromJSON(e)) : [],
    };
  },

  toJSON(message: AdResponse): unknown {
    const obj: any = {};
    if (message.ads) {
      obj.ads = message.ads.map(e => (e ? Ad.toJSON(e) : undefined));
    } else {
      obj.ads = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AdResponse>, I>>(object: I): AdResponse {
    const message = createBaseAdResponse();
    message.ads = object.ads?.map(e => Ad.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAd(): Ad {
  return { redirectUrl: '', text: '' };
}

export const Ad = {
  encode(message: Ad, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.redirectUrl !== '') {
      writer.uint32(10).string(message.redirectUrl);
    }
    if (message.text !== '') {
      writer.uint32(18).string(message.text);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Ad {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAd();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.redirectUrl = reader.string();
          break;
        case 2:
          message.text = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Ad {
    return {
      redirectUrl: isSet(object.redirectUrl) ? String(object.redirectUrl) : '',
      text: isSet(object.text) ? String(object.text) : '',
    };
  },

  toJSON(message: Ad): unknown {
    const obj: any = {};
    message.redirectUrl !== undefined && (obj.redirectUrl = message.redirectUrl);
    message.text !== undefined && (obj.text = message.text);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Ad>, I>>(object: I): Ad {
    const message = createBaseAd();
    message.redirectUrl = object.redirectUrl ?? '';
    message.text = object.text ?? '';
    return message;
  },
};

function createBaseFlag(): Flag {
  return { name: '', description: '', enabled: false, createdAt: undefined, updatedAt: undefined };
}

export const Flag = {
  encode(message: Flag, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.description !== '') {
      writer.uint32(18).string(message.description);
    }
    if (message.enabled === true) {
      writer.uint32(24).bool(message.enabled);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(34).fork()).ldelim();
    }
    if (message.updatedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.updatedAt), writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Flag {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFlag();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.enabled = reader.bool();
          break;
        case 4:
          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 5:
          message.updatedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Flag {
    return {
      name: isSet(object.name) ? String(object.name) : '',
      description: isSet(object.description) ? String(object.description) : '',
      enabled: isSet(object.enabled) ? Boolean(object.enabled) : false,
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      updatedAt: isSet(object.updatedAt) ? fromJsonTimestamp(object.updatedAt) : undefined,
    };
  },

  toJSON(message: Flag): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.enabled !== undefined && (obj.enabled = message.enabled);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.updatedAt !== undefined && (obj.updatedAt = message.updatedAt.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Flag>, I>>(object: I): Flag {
    const message = createBaseFlag();
    message.name = object.name ?? '';
    message.description = object.description ?? '';
    message.enabled = object.enabled ?? false;
    message.createdAt = object.createdAt ?? undefined;
    message.updatedAt = object.updatedAt ?? undefined;
    return message;
  },
};

function createBaseGetFlagRequest(): GetFlagRequest {
  return { name: '' };
}

export const GetFlagRequest = {
  encode(message: GetFlagRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetFlagRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetFlagRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetFlagRequest {
    return {
      name: isSet(object.name) ? String(object.name) : '',
    };
  },

  toJSON(message: GetFlagRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetFlagRequest>, I>>(object: I): GetFlagRequest {
    const message = createBaseGetFlagRequest();
    message.name = object.name ?? '';
    return message;
  },
};

function createBaseGetFlagResponse(): GetFlagResponse {
  return { flag: undefined };
}

export const GetFlagResponse = {
  encode(message: GetFlagResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.flag !== undefined) {
      Flag.encode(message.flag, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetFlagResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetFlagResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.flag = Flag.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetFlagResponse {
    return {
      flag: isSet(object.flag) ? Flag.fromJSON(object.flag) : undefined,
    };
  },

  toJSON(message: GetFlagResponse): unknown {
    const obj: any = {};
    message.flag !== undefined && (obj.flag = message.flag ? Flag.toJSON(message.flag) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetFlagResponse>, I>>(object: I): GetFlagResponse {
    const message = createBaseGetFlagResponse();
    message.flag = object.flag !== undefined && object.flag !== null ? Flag.fromPartial(object.flag) : undefined;
    return message;
  },
};

function createBaseCreateFlagRequest(): CreateFlagRequest {
  return { name: '', description: '', enabled: false };
}

export const CreateFlagRequest = {
  encode(message: CreateFlagRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.description !== '') {
      writer.uint32(18).string(message.description);
    }
    if (message.enabled === true) {
      writer.uint32(24).bool(message.enabled);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateFlagRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateFlagRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.enabled = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateFlagRequest {
    return {
      name: isSet(object.name) ? String(object.name) : '',
      description: isSet(object.description) ? String(object.description) : '',
      enabled: isSet(object.enabled) ? Boolean(object.enabled) : false,
    };
  },

  toJSON(message: CreateFlagRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.enabled !== undefined && (obj.enabled = message.enabled);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateFlagRequest>, I>>(object: I): CreateFlagRequest {
    const message = createBaseCreateFlagRequest();
    message.name = object.name ?? '';
    message.description = object.description ?? '';
    message.enabled = object.enabled ?? false;
    return message;
  },
};

function createBaseCreateFlagResponse(): CreateFlagResponse {
  return { flag: undefined };
}

export const CreateFlagResponse = {
  encode(message: CreateFlagResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.flag !== undefined) {
      Flag.encode(message.flag, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateFlagResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateFlagResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.flag = Flag.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateFlagResponse {
    return {
      flag: isSet(object.flag) ? Flag.fromJSON(object.flag) : undefined,
    };
  },

  toJSON(message: CreateFlagResponse): unknown {
    const obj: any = {};
    message.flag !== undefined && (obj.flag = message.flag ? Flag.toJSON(message.flag) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreateFlagResponse>, I>>(object: I): CreateFlagResponse {
    const message = createBaseCreateFlagResponse();
    message.flag = object.flag !== undefined && object.flag !== null ? Flag.fromPartial(object.flag) : undefined;
    return message;
  },
};

function createBaseUpdateFlagRequest(): UpdateFlagRequest {
  return { name: '', enabled: false };
}

export const UpdateFlagRequest = {
  encode(message: UpdateFlagRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.enabled === true) {
      writer.uint32(16).bool(message.enabled);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateFlagRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateFlagRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.enabled = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateFlagRequest {
    return {
      name: isSet(object.name) ? String(object.name) : '',
      enabled: isSet(object.enabled) ? Boolean(object.enabled) : false,
    };
  },

  toJSON(message: UpdateFlagRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.enabled !== undefined && (obj.enabled = message.enabled);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpdateFlagRequest>, I>>(object: I): UpdateFlagRequest {
    const message = createBaseUpdateFlagRequest();
    message.name = object.name ?? '';
    message.enabled = object.enabled ?? false;
    return message;
  },
};

function createBaseUpdateFlagResponse(): UpdateFlagResponse {
  return {};
}

export const UpdateFlagResponse = {
  encode(_: UpdateFlagResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateFlagResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateFlagResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): UpdateFlagResponse {
    return {};
  },

  toJSON(_: UpdateFlagResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpdateFlagResponse>, I>>(_: I): UpdateFlagResponse {
    const message = createBaseUpdateFlagResponse();
    return message;
  },
};

function createBaseListFlagsRequest(): ListFlagsRequest {
  return {};
}

export const ListFlagsRequest = {
  encode(_: ListFlagsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListFlagsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListFlagsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): ListFlagsRequest {
    return {};
  },

  toJSON(_: ListFlagsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListFlagsRequest>, I>>(_: I): ListFlagsRequest {
    const message = createBaseListFlagsRequest();
    return message;
  },
};

function createBaseListFlagsResponse(): ListFlagsResponse {
  return { flag: [] };
}

export const ListFlagsResponse = {
  encode(message: ListFlagsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.flag) {
      Flag.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ListFlagsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListFlagsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.flag.push(Flag.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListFlagsResponse {
    return {
      flag: Array.isArray(object?.flag) ? object.flag.map((e: any) => Flag.fromJSON(e)) : [],
    };
  },

  toJSON(message: ListFlagsResponse): unknown {
    const obj: any = {};
    if (message.flag) {
      obj.flag = message.flag.map(e => (e ? Flag.toJSON(e) : undefined));
    } else {
      obj.flag = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListFlagsResponse>, I>>(object: I): ListFlagsResponse {
    const message = createBaseListFlagsResponse();
    message.flag = object.flag?.map(e => Flag.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDeleteFlagRequest(): DeleteFlagRequest {
  return { name: '' };
}

export const DeleteFlagRequest = {
  encode(message: DeleteFlagRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteFlagRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteFlagRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DeleteFlagRequest {
    return {
      name: isSet(object.name) ? String(object.name) : '',
    };
  },

  toJSON(message: DeleteFlagRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DeleteFlagRequest>, I>>(object: I): DeleteFlagRequest {
    const message = createBaseDeleteFlagRequest();
    message.name = object.name ?? '';
    return message;
  },
};

function createBaseDeleteFlagResponse(): DeleteFlagResponse {
  return {};
}

export const DeleteFlagResponse = {
  encode(_: DeleteFlagResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DeleteFlagResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteFlagResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): DeleteFlagResponse {
    return {};
  },

  toJSON(_: DeleteFlagResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DeleteFlagResponse>, I>>(_: I): DeleteFlagResponse {
    const message = createBaseDeleteFlagResponse();
    return message;
  },
};

export type CartServiceService = typeof CartServiceService;
export const CartServiceService = {
  addItem: {
    path: '/hipstershop.CartService/AddItem',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: AddItemRequest) => Buffer.from(AddItemRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => AddItemRequest.decode(value),
    responseSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Empty.decode(value),
  },
  getCart: {
    path: '/hipstershop.CartService/GetCart',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetCartRequest) => Buffer.from(GetCartRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetCartRequest.decode(value),
    responseSerialize: (value: Cart) => Buffer.from(Cart.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Cart.decode(value),
  },
  emptyCart: {
    path: '/hipstershop.CartService/EmptyCart',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: EmptyCartRequest) => Buffer.from(EmptyCartRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => EmptyCartRequest.decode(value),
    responseSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Empty.decode(value),
  },
} as const;

export interface CartServiceServer extends UntypedServiceImplementation {
  addItem: handleUnaryCall<AddItemRequest, Empty>;
  getCart: handleUnaryCall<GetCartRequest, Cart>;
  emptyCart: handleUnaryCall<EmptyCartRequest, Empty>;
}

export interface CartServiceClient extends Client {
  addItem(request: AddItemRequest, callback: (error: ServiceError | null, response: Empty) => void): ClientUnaryCall;
  addItem(
    request: AddItemRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Empty) => void
  ): ClientUnaryCall;
  addItem(
    request: AddItemRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Empty) => void
  ): ClientUnaryCall;
  getCart(request: GetCartRequest, callback: (error: ServiceError | null, response: Cart) => void): ClientUnaryCall;
  getCart(
    request: GetCartRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Cart) => void
  ): ClientUnaryCall;
  getCart(
    request: GetCartRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Cart) => void
  ): ClientUnaryCall;
  emptyCart(
    request: EmptyCartRequest,
    callback: (error: ServiceError | null, response: Empty) => void
  ): ClientUnaryCall;
  emptyCart(
    request: EmptyCartRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Empty) => void
  ): ClientUnaryCall;
  emptyCart(
    request: EmptyCartRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Empty) => void
  ): ClientUnaryCall;
}

export const CartServiceClient = makeGenericClientConstructor(
  CartServiceService,
  'hipstershop.CartService'
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ChannelOptions>): CartServiceClient;
  service: typeof CartServiceService;
};

export type RecommendationServiceService = typeof RecommendationServiceService;
export const RecommendationServiceService = {
  listRecommendations: {
    path: '/hipstershop.RecommendationService/ListRecommendations',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ListRecommendationsRequest) =>
      Buffer.from(ListRecommendationsRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ListRecommendationsRequest.decode(value),
    responseSerialize: (value: ListRecommendationsResponse) =>
      Buffer.from(ListRecommendationsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListRecommendationsResponse.decode(value),
  },
} as const;

export interface RecommendationServiceServer extends UntypedServiceImplementation {
  listRecommendations: handleUnaryCall<ListRecommendationsRequest, ListRecommendationsResponse>;
}

export interface RecommendationServiceClient extends Client {
  listRecommendations(
    request: ListRecommendationsRequest,
    callback: (error: ServiceError | null, response: ListRecommendationsResponse) => void
  ): ClientUnaryCall;
  listRecommendations(
    request: ListRecommendationsRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ListRecommendationsResponse) => void
  ): ClientUnaryCall;
  listRecommendations(
    request: ListRecommendationsRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ListRecommendationsResponse) => void
  ): ClientUnaryCall;
}

export const RecommendationServiceClient = makeGenericClientConstructor(
  RecommendationServiceService,
  'hipstershop.RecommendationService'
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>
  ): RecommendationServiceClient;
  service: typeof RecommendationServiceService;
};

export type ProductCatalogServiceService = typeof ProductCatalogServiceService;
export const ProductCatalogServiceService = {
  listProducts: {
    path: '/hipstershop.ProductCatalogService/ListProducts',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Empty.decode(value),
    responseSerialize: (value: ListProductsResponse) => Buffer.from(ListProductsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListProductsResponse.decode(value),
  },
  getProduct: {
    path: '/hipstershop.ProductCatalogService/GetProduct',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetProductRequest) => Buffer.from(GetProductRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetProductRequest.decode(value),
    responseSerialize: (value: Product) => Buffer.from(Product.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Product.decode(value),
  },
  searchProducts: {
    path: '/hipstershop.ProductCatalogService/SearchProducts',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: SearchProductsRequest) => Buffer.from(SearchProductsRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => SearchProductsRequest.decode(value),
    responseSerialize: (value: SearchProductsResponse) => Buffer.from(SearchProductsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SearchProductsResponse.decode(value),
  },
} as const;

export interface ProductCatalogServiceServer extends UntypedServiceImplementation {
  listProducts: handleUnaryCall<Empty, ListProductsResponse>;
  getProduct: handleUnaryCall<GetProductRequest, Product>;
  searchProducts: handleUnaryCall<SearchProductsRequest, SearchProductsResponse>;
}

export interface ProductCatalogServiceClient extends Client {
  listProducts(
    request: Empty,
    callback: (error: ServiceError | null, response: ListProductsResponse) => void
  ): ClientUnaryCall;
  listProducts(
    request: Empty,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ListProductsResponse) => void
  ): ClientUnaryCall;
  listProducts(
    request: Empty,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ListProductsResponse) => void
  ): ClientUnaryCall;
  getProduct(
    request: GetProductRequest,
    callback: (error: ServiceError | null, response: Product) => void
  ): ClientUnaryCall;
  getProduct(
    request: GetProductRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Product) => void
  ): ClientUnaryCall;
  getProduct(
    request: GetProductRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Product) => void
  ): ClientUnaryCall;
  searchProducts(
    request: SearchProductsRequest,
    callback: (error: ServiceError | null, response: SearchProductsResponse) => void
  ): ClientUnaryCall;
  searchProducts(
    request: SearchProductsRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SearchProductsResponse) => void
  ): ClientUnaryCall;
  searchProducts(
    request: SearchProductsRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SearchProductsResponse) => void
  ): ClientUnaryCall;
}

export const ProductCatalogServiceClient = makeGenericClientConstructor(
  ProductCatalogServiceService,
  'hipstershop.ProductCatalogService'
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ChannelOptions>
  ): ProductCatalogServiceClient;
  service: typeof ProductCatalogServiceService;
};

export type ShippingServiceService = typeof ShippingServiceService;
export const ShippingServiceService = {
  getQuote: {
    path: '/hipstershop.ShippingService/GetQuote',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetQuoteRequest) => Buffer.from(GetQuoteRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetQuoteRequest.decode(value),
    responseSerialize: (value: GetQuoteResponse) => Buffer.from(GetQuoteResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetQuoteResponse.decode(value),
  },
  shipOrder: {
    path: '/hipstershop.ShippingService/ShipOrder',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ShipOrderRequest) => Buffer.from(ShipOrderRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ShipOrderRequest.decode(value),
    responseSerialize: (value: ShipOrderResponse) => Buffer.from(ShipOrderResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ShipOrderResponse.decode(value),
  },
} as const;

export interface ShippingServiceServer extends UntypedServiceImplementation {
  getQuote: handleUnaryCall<GetQuoteRequest, GetQuoteResponse>;
  shipOrder: handleUnaryCall<ShipOrderRequest, ShipOrderResponse>;
}

export interface ShippingServiceClient extends Client {
  getQuote(
    request: GetQuoteRequest,
    callback: (error: ServiceError | null, response: GetQuoteResponse) => void
  ): ClientUnaryCall;
  getQuote(
    request: GetQuoteRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetQuoteResponse) => void
  ): ClientUnaryCall;
  getQuote(
    request: GetQuoteRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetQuoteResponse) => void
  ): ClientUnaryCall;
  shipOrder(
    request: ShipOrderRequest,
    callback: (error: ServiceError | null, response: ShipOrderResponse) => void
  ): ClientUnaryCall;
  shipOrder(
    request: ShipOrderRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ShipOrderResponse) => void
  ): ClientUnaryCall;
  shipOrder(
    request: ShipOrderRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ShipOrderResponse) => void
  ): ClientUnaryCall;
}

export const ShippingServiceClient = makeGenericClientConstructor(
  ShippingServiceService,
  'hipstershop.ShippingService'
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ChannelOptions>): ShippingServiceClient;
  service: typeof ShippingServiceService;
};

export type CurrencyServiceService = typeof CurrencyServiceService;
export const CurrencyServiceService = {
  getSupportedCurrencies: {
    path: '/hipstershop.CurrencyService/GetSupportedCurrencies',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Empty.decode(value),
    responseSerialize: (value: GetSupportedCurrenciesResponse) =>
      Buffer.from(GetSupportedCurrenciesResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetSupportedCurrenciesResponse.decode(value),
  },
  convert: {
    path: '/hipstershop.CurrencyService/Convert',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CurrencyConversionRequest) =>
      Buffer.from(CurrencyConversionRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CurrencyConversionRequest.decode(value),
    responseSerialize: (value: Money) => Buffer.from(Money.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Money.decode(value),
  },
} as const;

export interface CurrencyServiceServer extends UntypedServiceImplementation {
  getSupportedCurrencies: handleUnaryCall<Empty, GetSupportedCurrenciesResponse>;
  convert: handleUnaryCall<CurrencyConversionRequest, Money>;
}

export interface CurrencyServiceClient extends Client {
  getSupportedCurrencies(
    request: Empty,
    callback: (error: ServiceError | null, response: GetSupportedCurrenciesResponse) => void
  ): ClientUnaryCall;
  getSupportedCurrencies(
    request: Empty,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetSupportedCurrenciesResponse) => void
  ): ClientUnaryCall;
  getSupportedCurrencies(
    request: Empty,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetSupportedCurrenciesResponse) => void
  ): ClientUnaryCall;
  convert(
    request: CurrencyConversionRequest,
    callback: (error: ServiceError | null, response: Money) => void
  ): ClientUnaryCall;
  convert(
    request: CurrencyConversionRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Money) => void
  ): ClientUnaryCall;
  convert(
    request: CurrencyConversionRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Money) => void
  ): ClientUnaryCall;
}

export const CurrencyServiceClient = makeGenericClientConstructor(
  CurrencyServiceService,
  'hipstershop.CurrencyService'
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ChannelOptions>): CurrencyServiceClient;
  service: typeof CurrencyServiceService;
};

export type PaymentServiceService = typeof PaymentServiceService;
export const PaymentServiceService = {
  charge: {
    path: '/hipstershop.PaymentService/Charge',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ChargeRequest) => Buffer.from(ChargeRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ChargeRequest.decode(value),
    responseSerialize: (value: ChargeResponse) => Buffer.from(ChargeResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ChargeResponse.decode(value),
  },
} as const;

export interface PaymentServiceServer extends UntypedServiceImplementation {
  charge: handleUnaryCall<ChargeRequest, ChargeResponse>;
}

export interface PaymentServiceClient extends Client {
  charge(
    request: ChargeRequest,
    callback: (error: ServiceError | null, response: ChargeResponse) => void
  ): ClientUnaryCall;
  charge(
    request: ChargeRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ChargeResponse) => void
  ): ClientUnaryCall;
  charge(
    request: ChargeRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ChargeResponse) => void
  ): ClientUnaryCall;
}

export const PaymentServiceClient = makeGenericClientConstructor(
  PaymentServiceService,
  'hipstershop.PaymentService'
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ChannelOptions>): PaymentServiceClient;
  service: typeof PaymentServiceService;
};

export type EmailServiceService = typeof EmailServiceService;
export const EmailServiceService = {
  sendOrderConfirmation: {
    path: '/hipstershop.EmailService/SendOrderConfirmation',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: SendOrderConfirmationRequest) =>
      Buffer.from(SendOrderConfirmationRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => SendOrderConfirmationRequest.decode(value),
    responseSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Empty.decode(value),
  },
} as const;

export interface EmailServiceServer extends UntypedServiceImplementation {
  sendOrderConfirmation: handleUnaryCall<SendOrderConfirmationRequest, Empty>;
}

export interface EmailServiceClient extends Client {
  sendOrderConfirmation(
    request: SendOrderConfirmationRequest,
    callback: (error: ServiceError | null, response: Empty) => void
  ): ClientUnaryCall;
  sendOrderConfirmation(
    request: SendOrderConfirmationRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Empty) => void
  ): ClientUnaryCall;
  sendOrderConfirmation(
    request: SendOrderConfirmationRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Empty) => void
  ): ClientUnaryCall;
}

export const EmailServiceClient = makeGenericClientConstructor(
  EmailServiceService,
  'hipstershop.EmailService'
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ChannelOptions>): EmailServiceClient;
  service: typeof EmailServiceService;
};

export type CheckoutServiceService = typeof CheckoutServiceService;
export const CheckoutServiceService = {
  placeOrder: {
    path: '/hipstershop.CheckoutService/PlaceOrder',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: PlaceOrderRequest) => Buffer.from(PlaceOrderRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => PlaceOrderRequest.decode(value),
    responseSerialize: (value: PlaceOrderResponse) => Buffer.from(PlaceOrderResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => PlaceOrderResponse.decode(value),
  },
} as const;

export interface CheckoutServiceServer extends UntypedServiceImplementation {
  placeOrder: handleUnaryCall<PlaceOrderRequest, PlaceOrderResponse>;
}

export interface CheckoutServiceClient extends Client {
  placeOrder(
    request: PlaceOrderRequest,
    callback: (error: ServiceError | null, response: PlaceOrderResponse) => void
  ): ClientUnaryCall;
  placeOrder(
    request: PlaceOrderRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: PlaceOrderResponse) => void
  ): ClientUnaryCall;
  placeOrder(
    request: PlaceOrderRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: PlaceOrderResponse) => void
  ): ClientUnaryCall;
}

export const CheckoutServiceClient = makeGenericClientConstructor(
  CheckoutServiceService,
  'hipstershop.CheckoutService'
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ChannelOptions>): CheckoutServiceClient;
  service: typeof CheckoutServiceService;
};

export type AdServiceService = typeof AdServiceService;
export const AdServiceService = {
  getAds: {
    path: '/hipstershop.AdService/GetAds',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: AdRequest) => Buffer.from(AdRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => AdRequest.decode(value),
    responseSerialize: (value: AdResponse) => Buffer.from(AdResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => AdResponse.decode(value),
  },
} as const;

export interface AdServiceServer extends UntypedServiceImplementation {
  getAds: handleUnaryCall<AdRequest, AdResponse>;
}

export interface AdServiceClient extends Client {
  getAds(request: AdRequest, callback: (error: ServiceError | null, response: AdResponse) => void): ClientUnaryCall;
  getAds(
    request: AdRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: AdResponse) => void
  ): ClientUnaryCall;
  getAds(
    request: AdRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: AdResponse) => void
  ): ClientUnaryCall;
}

export const AdServiceClient = makeGenericClientConstructor(AdServiceService, 'hipstershop.AdService') as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ChannelOptions>): AdServiceClient;
  service: typeof AdServiceService;
};

export type FeatureFlagServiceService = typeof FeatureFlagServiceService;
export const FeatureFlagServiceService = {
  getFlag: {
    path: '/hipstershop.FeatureFlagService/GetFlag',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetFlagRequest) => Buffer.from(GetFlagRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetFlagRequest.decode(value),
    responseSerialize: (value: GetFlagResponse) => Buffer.from(GetFlagResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => GetFlagResponse.decode(value),
  },
  createFlag: {
    path: '/hipstershop.FeatureFlagService/CreateFlag',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateFlagRequest) => Buffer.from(CreateFlagRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateFlagRequest.decode(value),
    responseSerialize: (value: CreateFlagResponse) => Buffer.from(CreateFlagResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => CreateFlagResponse.decode(value),
  },
  updateFlag: {
    path: '/hipstershop.FeatureFlagService/UpdateFlag',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: UpdateFlagRequest) => Buffer.from(UpdateFlagRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => UpdateFlagRequest.decode(value),
    responseSerialize: (value: UpdateFlagResponse) => Buffer.from(UpdateFlagResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => UpdateFlagResponse.decode(value),
  },
  listFlags: {
    path: '/hipstershop.FeatureFlagService/ListFlags',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ListFlagsRequest) => Buffer.from(ListFlagsRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ListFlagsRequest.decode(value),
    responseSerialize: (value: ListFlagsResponse) => Buffer.from(ListFlagsResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ListFlagsResponse.decode(value),
  },
  deleteFlag: {
    path: '/hipstershop.FeatureFlagService/DeleteFlag',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: DeleteFlagRequest) => Buffer.from(DeleteFlagRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => DeleteFlagRequest.decode(value),
    responseSerialize: (value: DeleteFlagResponse) => Buffer.from(DeleteFlagResponse.encode(value).finish()),
    responseDeserialize: (value: Buffer) => DeleteFlagResponse.decode(value),
  },
} as const;

export interface FeatureFlagServiceServer extends UntypedServiceImplementation {
  getFlag: handleUnaryCall<GetFlagRequest, GetFlagResponse>;
  createFlag: handleUnaryCall<CreateFlagRequest, CreateFlagResponse>;
  updateFlag: handleUnaryCall<UpdateFlagRequest, UpdateFlagResponse>;
  listFlags: handleUnaryCall<ListFlagsRequest, ListFlagsResponse>;
  deleteFlag: handleUnaryCall<DeleteFlagRequest, DeleteFlagResponse>;
}

export interface FeatureFlagServiceClient extends Client {
  getFlag(
    request: GetFlagRequest,
    callback: (error: ServiceError | null, response: GetFlagResponse) => void
  ): ClientUnaryCall;
  getFlag(
    request: GetFlagRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: GetFlagResponse) => void
  ): ClientUnaryCall;
  getFlag(
    request: GetFlagRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: GetFlagResponse) => void
  ): ClientUnaryCall;
  createFlag(
    request: CreateFlagRequest,
    callback: (error: ServiceError | null, response: CreateFlagResponse) => void
  ): ClientUnaryCall;
  createFlag(
    request: CreateFlagRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: CreateFlagResponse) => void
  ): ClientUnaryCall;
  createFlag(
    request: CreateFlagRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: CreateFlagResponse) => void
  ): ClientUnaryCall;
  updateFlag(
    request: UpdateFlagRequest,
    callback: (error: ServiceError | null, response: UpdateFlagResponse) => void
  ): ClientUnaryCall;
  updateFlag(
    request: UpdateFlagRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: UpdateFlagResponse) => void
  ): ClientUnaryCall;
  updateFlag(
    request: UpdateFlagRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: UpdateFlagResponse) => void
  ): ClientUnaryCall;
  listFlags(
    request: ListFlagsRequest,
    callback: (error: ServiceError | null, response: ListFlagsResponse) => void
  ): ClientUnaryCall;
  listFlags(
    request: ListFlagsRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ListFlagsResponse) => void
  ): ClientUnaryCall;
  listFlags(
    request: ListFlagsRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ListFlagsResponse) => void
  ): ClientUnaryCall;
  deleteFlag(
    request: DeleteFlagRequest,
    callback: (error: ServiceError | null, response: DeleteFlagResponse) => void
  ): ClientUnaryCall;
  deleteFlag(
    request: DeleteFlagRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: DeleteFlagResponse) => void
  ): ClientUnaryCall;
  deleteFlag(
    request: DeleteFlagRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: DeleteFlagResponse) => void
  ): ClientUnaryCall;
}

export const FeatureFlagServiceClient = makeGenericClientConstructor(
  FeatureFlagServiceService,
  'hipstershop.FeatureFlagService'
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ChannelOptions>): FeatureFlagServiceClient;
  service: typeof FeatureFlagServiceService;
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  throw 'Unable to locate global object';
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<Exclude<keyof I, KeysOfUnion<P>>, never>;

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === 'string') {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER');
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
