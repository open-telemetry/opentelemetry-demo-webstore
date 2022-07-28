import type { NextApiRequest, NextApiResponse } from 'next';
import CheckoutGateway from '../../gateways/rpc/Checkout.gateway';
import ProductCatalogGateway from '../../gateways/rpc/ProductCatalog.gateway';
import { Empty, PlaceOrderRequest } from '../../protos/demo';
import { IProductCheckoutItem, IProductCheckout } from '../../types/Cart';

type TResponse = IProductCheckout | Empty;

const handler = async ({ method, body }: NextApiRequest, res: NextApiResponse<TResponse>) => {
  switch (method) {
    case 'POST': {
      const orderData = body as PlaceOrderRequest;
      const { order: { items = [], ...order } = {} } = await CheckoutGateway.placeOrder(orderData);

      const productList: IProductCheckoutItem[] = await Promise.all(
        items.map(async ({ item: { productId = '', quantity = 0 } = {}, cost }) => {
          const product = await ProductCatalogGateway.getProduct(productId);

          return {
            cost,
            item: {
              productId,
              quantity,
              product,
            },
          };
        })
      );

      return res.status(200).json({ ...order, items: productList });
    }

    default: {
      return res.status(405).send('');
    }
  }
};

export default handler;
