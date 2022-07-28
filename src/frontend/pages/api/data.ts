import type { NextApiRequest, NextApiResponse } from 'next';
import AdGateway from '../../gateways/rpc/Ad.gateway';
import { Ad, Empty } from '../../protos/demo';

type TResponse = Ad[] | Empty;

const handler = async ({ method, query }: NextApiRequest, res: NextApiResponse<TResponse>) => {
  switch (method) {
    case 'GET': {
      const { productIds = [] } = query;
      const { ads: adList } = await AdGateway.listAds(productIds as string[]);

      return res.status(200).json(adList);
    }

    default: {
      return res.status(405).send('');
    }
  }
};

export default handler;
