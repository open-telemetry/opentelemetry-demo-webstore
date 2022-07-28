import type { NextApiRequest, NextApiResponse } from 'next';
import CurrencyGateway from '../../../gateways/rpc/Currency.gateway';
import { CurrencyConversionRequest, Money } from '../../../protos/demo';

type TResponse = Money;

const handler = async ({ method, body }: NextApiRequest, res: NextApiResponse<TResponse>) => {
  switch (method) {
    case 'POST': {
      const { from, toCode } = body as CurrencyConversionRequest;

      const result = await CurrencyGateway.convert(from!, toCode);

      return res.status(200).json(result);
    }

    default: {
      return res.status(405);
    }
  }
};

export default handler;
