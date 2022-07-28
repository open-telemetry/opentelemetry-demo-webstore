import type { NextApiRequest, NextApiResponse } from 'next';
import ProductCatalogGateway from '../../../gateways/rpc/ProductCatalog.gateway';
import { Empty, Product } from '../../../protos/demo';

type TResponse = Product[] | Empty;

const handler = async ({ method }: NextApiRequest, res: NextApiResponse<TResponse>) => {
  switch (method) {
    case 'GET': {
      const { products: productList } = await ProductCatalogGateway.listProducts();

      return res.status(200).json(productList);
    }

    default: {
      return res.status(405).send('');
    }
  }
};

export default handler;
