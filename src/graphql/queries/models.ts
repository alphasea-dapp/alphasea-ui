import { gql } from '@apollo/client';

export const QUERY_MODELS = gql`
  query queryModels {
      models {
        id
        tournament {
            id
        }
        owner
        predictionLicense
        createdAt
        
        totalEarnings
        predictionCount
        publishedPredictionCount
        purchaseCount
        shippedPurchaseCount
        refundedPurchaseCount
      }
  }
`;
