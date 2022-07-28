import type { NextApiRequest, NextApiResponse } from 'next';
import CartGateway from '../../gateways/rpc/Cart.gateway';
import ProductCatalogGateway from '../../gateways/rpc/ProductCatalog.gateway';
import { AddItemRequest, Empty } from '../../protos/demo';
import { IProductCart, IProductCartItem } from '../../types/Cart';

type TResponse = IProductCart | Empty;

const handler = async ({ method, body, query }: NextApiRequest, res: NextApiResponse<TResponse>) => {
  switch (method) {
    case 'GET': {
      const {sessionId = ''} = query;
      const { userId, items } = await CartGateway.getCart(sessionId as string);

      const productList: IProductCartItem[] = await Promise.all(
        items.map(async ({ productId, quantity }) => {
          const product = await ProductCatalogGateway.getProduct(productId);

          return {
            productId,
            quantity,
            product,
          };
        })
      );

      return res.status(200).json({ userId, items: productList });
    }

    case 'POST': {
      const { userId, item } = body as AddItemRequest;

      await CartGateway.addItem(userId, item!);
      const cart = await CartGateway.getCart(userId);

      return res.status(200).json(cart);
    }

    case 'DELETE': {
      const { userId } = body as AddItemRequest;
      await CartGateway.emptyCart(userId);

      return res.status(204).send('');
    }

    default: {
      return res.status(405);
    }
  }
};

export default handler;
