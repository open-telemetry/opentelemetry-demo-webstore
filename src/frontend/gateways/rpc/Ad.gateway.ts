import { ChannelCredentials } from '@grpc/grpc-js';
import { AdResponse, AdServiceClient } from '../../protos/demo';

const { AD_SERVICE_ADDR = '' } = process.env;

const client = new AdServiceClient(AD_SERVICE_ADDR, ChannelCredentials.createInsecure());

const AdGateway = () => ({
  listAds(productIds: string[]) {
    return new Promise<AdResponse>((resolve, reject) =>
      client.getAds({ contextKeys: productIds }, (error, response) => (error ? reject(error) : resolve(response)))
    );
  },
});

export default AdGateway();
