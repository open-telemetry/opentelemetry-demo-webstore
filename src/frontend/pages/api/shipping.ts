import type { NextApiRequest, NextApiResponse } from 'next';
import ShippingGateway from '../../gateways/rpc/Shipping.gateway';
import { CartItem, Empty, Money } from '../../protos/demo';

type TResponse = Money | Empty;

const handler = async ({ method, query }: NextApiRequest, res: NextApiResponse<TResponse>) => {
  switch (method) {
    case 'GET': {
      const { itemList = '' } = query;
      const { costUsd } = await ShippingGateway.getShippingCost(JSON.parse(itemList as string) as CartItem[]);

      return res.status(200).json(costUsd!);
    }

    default: {
      return res.status(405);
    }
  }
};

export default handler;
