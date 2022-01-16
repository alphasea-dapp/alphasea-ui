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

export const QUERY_MODEL = gql`
  query queryModel($id: ID!) {
    models(where: {id: $id}) {
        id
        tournament {
            id
        }
        owner
        predictionLicense
        createdAt
        predictions {  
            id
            executionStartAt
            price
            encryptedContent
            contentKey
            createdAt
            updatedAt
            
            purchaseCount
            shippedPurchaseCount
            refundedPurchaseCount
        }
        
        totalEarnings
        predictionCount
        publishedPredictionCount
        purchaseCount
        shippedPurchaseCount
        refundedPurchaseCount
    }
  }
`;
