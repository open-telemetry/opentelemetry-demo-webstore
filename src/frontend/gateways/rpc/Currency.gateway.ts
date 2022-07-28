import { ChannelCredentials } from '@grpc/grpc-js';
import { GetSupportedCurrenciesResponse, CurrencyServiceClient, Money } from '../../protos/demo';

const { CURRENCY_SERVICE_ADDR = '' } = process.env;

const client = new CurrencyServiceClient(CURRENCY_SERVICE_ADDR, ChannelCredentials.createInsecure());

const CurrencyGateway = () => ({
  convert(from: Money, toCode: string) {
    return new Promise<Money>((resolve, reject) =>
      client.convert({ from, toCode }, (error, response) => (error ? reject(error) : resolve(response)))
    );
  },
  getSupportedCurrencies() {
    return new Promise<GetSupportedCurrenciesResponse>((resolve, reject) =>
      client.getSupportedCurrencies({}, (error, response) => (error ? reject(error) : resolve(response)))
    );
  },
});

export default CurrencyGateway();
