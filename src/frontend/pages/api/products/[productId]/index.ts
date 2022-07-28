import type { NextApiRequest, NextApiResponse } from 'next';
import ProductCatalogGateway from '../../../../gateways/rpc/ProductCatalog.gateway';
import { Empty, Product } from '../../../../protos/demo';

type TResponse = Product | Empty;

const handler = async ({ method, query }: NextApiRequest, res: NextApiResponse<TResponse>) => {
  switch (method) {
    case 'GET': {
      const product = await ProductCatalogGateway.getProduct(query.productId as string);

      return res.status(200).json(product);
    }

    default: {
      return res.status(405).send('');
    }
  }
};

export default handler;
