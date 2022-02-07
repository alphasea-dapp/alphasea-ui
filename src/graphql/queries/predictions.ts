import { gql } from '@apollo/client';

export const QUERY_PREDICTIONS = gql`
  query queryPredictions {
      predictions {
        id
        model {
            id
        }
        executionStartAt
        encryptedContent
        predictionKey {
            contentKey
            sentCount
        }
        createdAt
      }
  }
`;
