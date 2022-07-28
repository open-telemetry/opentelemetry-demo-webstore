import { ChannelCredentials } from '@grpc/grpc-js';
import { ListRecommendationsResponse, RecommendationServiceClient } from '../../protos/demo';

const { RECOMMENDATION_SERVICE_ADDR = '' } = process.env;

const client = new RecommendationServiceClient(RECOMMENDATION_SERVICE_ADDR, ChannelCredentials.createInsecure());

const RecommendationsGateway = () => ({
  listRecommendations(userId: string, productIds: string[]) {
    return new Promise<ListRecommendationsResponse>((resolve, reject) =>
      client.listRecommendations({ userId, productIds }, (error, response) =>
        error ? reject(error) : resolve(response)
      )
    );
  },
});

export default RecommendationsGateway();
