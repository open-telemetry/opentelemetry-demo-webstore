import { Ad, Cart, CartItem, Money, PlaceOrderRequest, Product } from '../protos/demo';
import { IProductCart, IProductCartItem, IProductCheckout } from '../types/Cart';
import request from '../utils/Request';
import SessionGateway from './Session.gateway';

const { userId } = SessionGateway.getSession();

const basePath = '/api';

const ApiGateway = () => ({
  getCart() {
    return request<IProductCart>({
      url: `${basePath}/cart`,
      queryParams: { sessionId: userId },
    });
  },
  addCartItem(item: CartItem) {
    return request<Cart>({
      url: `${basePath}/cart`,
      body: { item, userId },
      method: 'POST',
    });
  },
  emptyCart() {
    return request<undefined>({
      url: `${basePath}/cart`,
      method: 'DELETE',
      body: { userId },
    });
  },

  getSupportedCurrencyList() {
    return request<string[]>({
      url: `${basePath}/currency`,
    });
  },
  convertToCurrency({ from, toCode }: { from: Money; toCode: string }) {
    return request<Money>({
      url: `${basePath}/currency/convert`,
      method: 'POST',
      body: { from, toCode },
    });
  },

  getShippingCost(itemList: IProductCartItem[]) {
    return request<Money>({
      url: `${basePath}/shipping`,
      queryParams: {
        itemList: JSON.stringify(itemList.map(({ productId, quantity }) => ({ productId, quantity }))),
      },
    });
  },

  placeOrder(order: PlaceOrderRequest) {
    return request<IProductCheckout>({
      url: `${basePath}/checkout`,
      method: 'POST',
      body: order,
    });
  },

  listProducts() {
    return request<Product[]>({
      url: `${basePath}/products`,
    });
  },
  getProduct(productId: string) {
    return request<Product>({
      url: `${basePath}/products/${productId}`,
    });
  },
  listRecommendations(productIds: string[]) {
    return request<Product[]>({
      url: `${basePath}/recommendations`,
      queryParams: {
        productIds,
        sessionId: userId,
      },
    });
  },
  listAds(productIds: string[]) {
    return request<Ad[]>({
      url: `${basePath}/data`,
      queryParams: {
        productIds,
      },
    });
  },
});

export default ApiGateway();
