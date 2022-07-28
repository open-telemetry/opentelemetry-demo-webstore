import type { NextApiRequest, NextApiResponse } from 'next';
import ProductCatalogGateway from '../../gateways/rpc/ProductCatalog.gateway';
import RecommendationsGateway from '../../gateways/rpc/Recommendations.gateway';
import { Empty, Product } from '../../protos/demo';

type TResponse = Product[] | Empty;

const handler = async ({ method, query }: NextApiRequest, res: NextApiResponse<TResponse>) => {
  switch (method) {
    case 'GET': {
      const { productIds = [], sessionId = '' } = query;
      const { productIds: productList } = await RecommendationsGateway.listRecommendations(
        sessionId as string,
        productIds as string[]
      );
      const recommendedProductList = await Promise.all(
        productList.slice(0, 4).map(id => ProductCatalogGateway.getProduct(id))
      );

      return res.status(200).json(recommendedProductList);
    }

    default: {
      return res.status(405).send('');
    }
  }
};

export default handler;
