import { ChannelCredentials } from '@grpc/grpc-js';
import { CheckoutServiceClient, PlaceOrderRequest, PlaceOrderResponse } from '../../protos/demo';

const { CHECKOUT_SERVICE_ADDR = '' } = process.env;

const client = new CheckoutServiceClient(CHECKOUT_SERVICE_ADDR, ChannelCredentials.createInsecure());

const CheckoutGateway = () => ({
  placeOrder(order: PlaceOrderRequest) {
    return new Promise<PlaceOrderResponse>((resolve, reject) =>
      client.placeOrder(order, (error, response) => (error ? reject(error) : resolve(response)))
    );
  },
});

export default CheckoutGateway();
