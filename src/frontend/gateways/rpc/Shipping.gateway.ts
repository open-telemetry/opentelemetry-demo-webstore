import { ChannelCredentials } from '@grpc/grpc-js';
import { CartItem, GetQuoteResponse, ShippingServiceClient } from '../../protos/demo';

const { SHIPPING_SERVICE_ADDR = '' } = process.env;

const client = new ShippingServiceClient(SHIPPING_SERVICE_ADDR, ChannelCredentials.createInsecure());

const AdGateway = () => ({
  getShippingCost(itemList: CartItem[]) {
    return new Promise<GetQuoteResponse>((resolve, reject) =>
      client.getQuote({ items: itemList, address: undefined }, (error, response) =>
        error ? reject(error) : resolve(response)
      )
    );
  },
});

export default AdGateway();
