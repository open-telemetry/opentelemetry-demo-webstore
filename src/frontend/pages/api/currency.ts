import type { NextApiRequest, NextApiResponse } from 'next';
import CurrencyGateway from '../../gateways/rpc/Currency.gateway';
import { Empty } from '../../protos/demo';

type TResponse = string[] | Empty;

const handler = async ({ method }: NextApiRequest, res: NextApiResponse<TResponse>) => {
  switch (method) {
    case 'GET': {
      const { currencyCodes = [] } = await CurrencyGateway.getSupportedCurrencies();

      return res.status(200).json(currencyCodes);
    }

    default: {
      return res.status(405);
    }
  }
};

export default handler;
