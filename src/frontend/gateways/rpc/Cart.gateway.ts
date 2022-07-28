import { ChannelCredentials } from '@grpc/grpc-js';
import { Cart, CartItem, CartServiceClient, Empty } from '../../protos/demo';

const { CART_SERVICE_ADDR = '' } = process.env;

const client = new CartServiceClient(CART_SERVICE_ADDR, ChannelCredentials.createInsecure());

const CartGateway = () => ({
  getCart(userId: string) {
    return new Promise<Cart>((resolve, reject) =>
      client.getCart({ userId }, (error, response) => (error ? reject(error) : resolve(response)))
    );
  },
  addItem(userId: string, item: CartItem) {
    return new Promise<Empty>((resolve, reject) =>
      client.addItem({ userId, item }, (error, response) => (error ? reject(error) : resolve(response)))
    );
  },
  emptyCart(userId: string) {
    return new Promise<Empty>((resolve, reject) =>
      client.emptyCart({ userId }, (error, response) => (error ? reject(error) : resolve(response)))
    );
  },
});

export default CartGateway();
