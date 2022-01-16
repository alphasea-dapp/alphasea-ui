import { gql } from '@apollo/client';

export const QUERY_PREDICTIONS = gql`
  query queryPredictions {
      predictions {
        id
        model {
            id
        }
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
  }
`;
